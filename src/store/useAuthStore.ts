import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postLogin, LoginPayload, LoginResponse } from "@/api/auth/postLogin";

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
          if (data.success && data.token && data.user) {
            set({
              user: data.user as unknown as User,
              token: data.token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            return data;
          } else {
            set({
              error: data.message || "Login failed. Please try again.",
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
            const errResp = (error as { response?: { status?: number; data?: { message?: string } } }).response;
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
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false, error: null }),
    }),
    {
      name: "auth-storage", // unique name for localStorage
    }
  )
);
