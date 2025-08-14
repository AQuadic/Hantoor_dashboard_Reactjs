import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Email from "../icons/login/Email";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "@heroui/react";
import ReCAPTCHA from "react-google-recaptcha";
import DashboardButton from "../general/dashboard/DashboardButton";
import { useAuthStore } from "@/store/useAuthStore";

// You'll need to import or define your API instance
import { LoginPayload } from "@/api/auth/postLogin";

const Login = () => {
  const loginToStore = useAuthStore((state) => state.login);
  const storeLoading = useAuthStore((state) => state.loading);
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // UI state
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = t("emailRequired") || "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("emailInvalid") || "Email is invalid";
    }

    if (!password) {
      newErrors.password = t("passwordRequired") || "Password is required";
    } else if (password.length < 6) {
      newErrors.password =
        t("passwordTooShort") || "Password must be at least 6 characters";
    }

    if (!recaptchaToken) {
      newErrors.recaptcha =
        t("recaptchaRequired") || "Please complete the reCAPTCHA";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      recaptchaToken,
    };

    try {
      const result = await loginToStore(payload);
      console.log("Login result:", result);

      if (result) {
        // Login successful - navigate to dashboard
        navigate("/", { replace: true });
      } else {
        // Login failed - error should be in store
        setErrors({
          general: "Invalid email or password",
        });
        resetCaptcha();
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        general: "Invalid email or password",
      });
      resetCaptcha();
    }
  };

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (errors.recaptcha) {
      setErrors((prev) => ({ ...prev, recaptcha: null }));
    }
  };

  const onRecaptchaErrored = () => {
    setRecaptchaToken(null);
    setErrors((prev) => ({
      ...prev,
      recaptcha: t("recaptchaError") || "reCAPTCHA error. Please try again.",
    }));
  };

  const onRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setErrors((prev) => ({
      ...prev,
      recaptcha:
        t("recaptchaExpired") || "reCAPTCHA expired. Please try again.",
    }));
  };

  const resetCaptcha = () => {
    recaptchaRef.current?.reset();
    setRecaptchaToken(null);
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
          {errors.general && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.general}
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
            <div
              className="absolute top-9 rtl:left-5 ltr:right-5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
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

          {/* reCAPTCHA */}
          <div className="mt-4 flex items-center justify-center">
            {/*
              Google reCAPTCHA test key is used for localhost development only.
              This will show a "for testing only" message and is not valid for production.
              For production, replace with your own site key from Google reCAPTCHA admin.
            */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onRecaptchaChange}
              onErrored={onRecaptchaErrored}
              onExpired={onRecaptchaExpired}
            />
          </div>
          {errors.recaptcha && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {errors.recaptcha}
            </p>
          )}

          {/* Login button */}
          <div className="flex items-center justify-center mt-[17px]">
            <DashboardButton
              titleEn={storeLoading ? t("loading") || "Loading..." : t("enter")}
              titleAr={storeLoading ? "جاري التحميل..." : "دخول"}
              type="submit"
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
