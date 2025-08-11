import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postLogin, LoginPayload, LoginResponse } from "@/api/auth/postLogin";
import Cookies from "js-cookie";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<LoginResponse | null>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      login: async (payload: LoginPayload) => {
        set({ loading: true, error: null });
        try {
          const data = await postLogin(payload);

          // Extract token from response - handle both 'token' and 'access_token' fields
          const token = data.token || data.access_token;

          if (token && data.user) {
            // Store token in cookies for route guards and axios interceptor
            Cookies.set("hantoor_token", token, {
              expires: payload.rememberMe ? 30 : 1, // 30 days if remember me, 1 day otherwise
            });

            set({
              user: data.user as unknown as User,
              token: token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            return data;
          } else {
            set({
              error:
                data.message || "Login failed. Invalid response from server.",
              loading: false,
            });
            return null;
          }
        } catch (error: unknown) {
          let errorMsg = "Login failed. Please try again.";
          // Axios error type guard
          if (
            typeof error === "object" &&
            error !== null &&
            "response" in error &&
            typeof (error as { response?: unknown }).response === "object"
          ) {
            const errResp = (
              error as {
                response?: { status?: number; data?: { message?: string } };
              }
            ).response;
            if (errResp?.status === 401) {
              errorMsg = "Invalid email or password";
            } else if (errResp?.status === 429) {
              errorMsg = "Too many login attempts. Please try again later.";
            } else if (errResp?.data?.message) {
              errorMsg = errResp.data.message;
            } else if (errResp?.status) {
              errorMsg = `Network or server error (${errResp.status})`;
            }
          } else if (error instanceof Error) {
            errorMsg = error.message;
          }
          set({ error: errorMsg, loading: false });
          return null;
        }
      },
      logout: () => {
        // Clear cookie and Zustand state
        Cookies.remove("hantoor_token");
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },
      initialize: () => {
        // Check for existing token in cookies on app start
        const token = Cookies.get("hantoor_token");
        if (token) {
          set({ token, isAuthenticated: true });
        }
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage
    }
  )
);
