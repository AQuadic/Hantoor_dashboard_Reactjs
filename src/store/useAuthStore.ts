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
  rememberMe: boolean;
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
      rememberMe: false,
      login: async (payload: LoginPayload) => {
        set({ loading: true, error: null });
        try {
          const data = await postLogin(payload);

          // Extract token from response - handle both 'token' and 'access_token' fields
          const token = data.token || data.access_token;

          if (token && data.user) {
            // Store token: persistent cookie when rememberMe is true,
            // otherwise keep token in sessionStorage so it is cleared when the tab is closed.
            if (payload.rememberMe) {
              Cookies.set("hantoor_token", token, { expires: 30 });
            } else {
              try {
                sessionStorage.setItem("hantoor_token", token);
              } catch {
                // ignore sessionStorage errors
              }
            }

            set({
              user: data.user as unknown as User,
              token: token,
              isAuthenticated: true,
              loading: false,
              error: null,
              rememberMe: !!payload.rememberMe,
            });
            // If user did NOT select rememberMe, ensure we don't persist auth to localStorage
            if (!payload.rememberMe) {
              try {
                localStorage.removeItem("auth-storage");
              } catch {
                // ignore localStorage errors
              }
            }
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
        try {
          sessionStorage.removeItem("hantoor_token");
        } catch {
          // ignore
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          rememberMe: false,
        });
      },
      initialize: () => {
        // First check sessionStorage (tab-scoped) for a non-remembered token
        try {
          const sessionToken = sessionStorage.getItem("hantoor_token");
          if (sessionToken) {
            set({ token: sessionToken, isAuthenticated: true });
            return;
          }
        } catch {
          // ignore sessionStorage errors
        }

        // Fallback to cookie (rememberMe persistent token)
        const token = Cookies.get("hantoor_token");
        if (token) {
          set({ token, isAuthenticated: true });
          return;
        }

        // Also attempt to restore persisted state only if rememberMe was true
        try {
          const raw = localStorage.getItem("auth-storage");
          if (raw) {
            const parsed = JSON.parse(raw) as Partial<AuthState> | null;
            if (parsed && parsed.rememberMe && parsed.token) {
              set({
                user: (parsed.user as User) ?? null,
                token: parsed.token ?? null,
                isAuthenticated: !!parsed.token,
              });
            } else if (parsed && !parsed.rememberMe) {
              // cleanup any stale persisted auth
              localStorage.removeItem("auth-storage");
            }
          }
        } catch {
          // ignore localStorage parse errors
        }
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage
      // Only persist auth data when rememberMe is true. When not remembering, do not keep token/user in storage.
      partialize: (state: AuthState) => {
        // state may include rememberMe flag; only persist token and user when rememberMe is true
        // Persist rememberMe flag itself so UI can reflect user's last choice
        if (state.rememberMe) {
          return {
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            rememberMe: state.rememberMe,
          };
        }
        return { rememberMe: false };
      },
    }
  )
);
