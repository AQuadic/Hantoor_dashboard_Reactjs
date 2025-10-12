import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Email from "../icons/login/Email";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "@heroui/react";
import DashboardButton from "../general/dashboard/DashboardButton";
import { useAuthStore } from "@/store/useAuthStore";

// You'll need to import or define your API instance
import { LoginPayload } from "@/api/auth/postLogin";

const Login = () => {
  const loginToStore = useAuthStore((state) => state.login);
  const storeLoading = useAuthStore((state) => state.loading);
  const storeError = useAuthStore((state) => state.error); // إضافة رسالة الخطأ من الـ store
  const { t } = useTranslation("login");
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      const saved = localStorage.getItem("hantoor_remember_me");
      return saved === "true";
    } catch {
      return false; // Default to false if there's an error
    }
  });

  // UI state
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = t("emailRequired", {
        defaultValue: "Email is required",
      });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("emailInvalid", { defaultValue: "Email is invalid" });
    }

    if (!password) {
      newErrors.password = t("passwordRequired", {
        defaultValue: "Password is required",
      });
    } else if (password.length < 6) {
      newErrors.password = t("passwordTooShort", {
        defaultValue: "Password must be at least 6 characters",
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getTranslatedError = (error: string | null): string | null => {
    if (!error) return null;
    
    const errorMap: Record<string, string> = {
      "Invalid email or password": t("invalidCredentials", {
        defaultValue: "Invalid email or password",
      }),
      "Too many login attempts. Please try again later.": t("tooManyAttempts", {
        defaultValue: "Too many login attempts. Please try again later.",
      }),
      "Login failed. Please try again.": t("loginFailed", {
        defaultValue: "Login failed. Please try again.",
      }),
    };

    for (const [key, value] of Object.entries(errorMap)) {
      if (error.includes(key)) {
        return value;
      }
    }
    return error;
  };

  const handleLogin = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!validateForm()) return;

    setErrors({});
    const payload: LoginPayload = {
      email,
      password,
      rememberMe,
    };

    try {
      const result = await loginToStore(payload);
      console.log("Login result:", result);

      if (result) {
        // Login successful - navigate to dashboard
        // Persist the rememberMe choice so the checkbox reflects user's preference next time
        try {
          localStorage.setItem(
            "hantoor_remember_me",
            rememberMe ? "true" : "false"
          );
        } catch {
          // ignore localStorage errors
        }
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <section className="flex md:flex-row flex-col items-center justify-between gap-4 !bg-white">
      <div className="md:w-1/2 w-full md:h-screen bg-[#F4F4FE] flex items-center justify-center">
        <img src="/images/login/loginLogo.gif" alt="logo" />
      </div>

      <div className="px-8 mx-auto lg:mt-0 mt-10 ov">
        <h1 className="text-[#1E1B1B] text-[30px] font-bold text-center">
          {t("welcome")}
        </h1>
        <p className="text-[#7D7D7D] text-[17px] text-center">{t("loginTo")}</p>

        <form onSubmit={handleLogin} noValidate>
          {/* General error message */}
          {(errors.general || storeError) && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.general || getTranslatedError(storeError)}
            </div>
          )}

          {/* Email input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: null }));
                }
              }}
              className={`md:w-[404px] w-[300px] h-[57px] border rounded-[12px] mt-[15px] px-4 pt-4 ${
                errors.email ? "border-red-500" : "border-[#E2E2E2]"
              }`}
              placeholder="username@mail.com"
              disabled={storeLoading}
              autoComplete="email"
            />
            <h2 className="text-[#000000] text-[15px] absolute top-5 rtl:right-4 ltr:left-4">
              {t("email")}
            </h2>
            <div className="absolute top-9 rtl:left-5 ltr:right-5">
              <Email />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: null }));
                }
              }}
              className={`md:w-[404px] w-[300px] h-[57px] border rounded-[12px] mt-[18px] px-4 pt-4 ${
                errors.password ? "border-red-500" : "border-[#E2E2E2]"
              }`}
              placeholder="******************************"
              disabled={storeLoading}
              autoComplete="current-password"
            />
            <h2 className="text-[#000000] text-[15px] absolute top-5 rtl:right-4 ltr:left-4">
              {t("password")}
            </h2>
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-9 rtl:left-5 ltr:right-5 cursor-pointer text-gray-500"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember me checkbox */}
          <div className="mt-4 flex items-center">
            <Checkbox
              isSelected={rememberMe}
              onValueChange={setRememberMe}
              size="md"
            />
            <p className="text-[#2A32F8] text-[14px] font-normal">
              {t("rememberMe")}
            </p>
          </div>

          {/* Login button */}
          <div className="flex items-center justify-center mt-[17px]">
            <DashboardButton
              titleEn={storeLoading ? t("loading") || "Loading..." : t("enter")}
              titleAr={storeLoading ? "جاري التحميل..." : "دخول"}
              type="submit"
              isLoading={storeLoading}
            />
          </div>

          {/* Forget password link */}
          <div className="mt-3 text-center">
            <Link
              to="/forget-password"
              className="text-[#000000] text-[19px] font-normal hover:underline"
            >
              {t("forgetPassword")}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;