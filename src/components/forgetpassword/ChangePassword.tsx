import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DashboardButton from "../general/dashboard/DashboardButton";
import PasswordInput from "../general/PasswordInput";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { changePassword, ChangePasswordRequest } from "@/api/password/changePassword";

const ChangePassword = () => {
  const { t } = useTranslation("login");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [, setLoading] = useState(false);

  const [resetToken, setResetToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneCountry, setPhoneCountry] = useState<string>("EG");

  useEffect(() => {
    const token = localStorage.getItem("resetToken");
    const savedEmail = localStorage.getItem("resetEmail");
    const savedPhone = localStorage.getItem("resetPhone");
    const savedPhoneCountry = localStorage.getItem("resetPhoneCountry");

    if (!token) {
      toast.error(
        "Reset token is missing. Please retry the password reset flow."
      );
      navigate("/forget-password");
      return;
    }

    setResetToken(token);
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
    if (savedPhoneCountry) setPhoneCountry(savedPhoneCountry);
  }, [navigate]);

  const handleSavePassword = async () => {
    if (!password || !passwordConfirm) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (!resetToken) return;

    const data: ChangePasswordRequest = {
      password,
      password_confirmation: passwordConfirm,
      reset_token: resetToken,
      email: email || undefined,
      phone: phone || undefined,
      phone_country: phone ? phoneCountry : undefined,
    };

    setLoading(true);
    try {
      const response = await changePassword(data);
      toast.success(response.message || "Password changed successfully");

      localStorage.removeItem("resetToken");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetPhone");
      localStorage.removeItem("resetPhoneCountry");

      navigate("/login");
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : "Failed to change password";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex md:flex-row flex-col items-center justify-between gap-4 !bg-white">
      <div className="md:w-1/2 w-full md:h-screen bg-[#F4F4FE] flex items-center justify-center">
        <img src="/images/login/loginLogo.gif" alt="logo" />
      </div>
      <div className="px-8 mx-auto lg:mt-0 mt-10">
        <h1 className="text-[#1E1B1B] text-[30px] font-bold text-center">
          {t("forgetPassword")}
        </h1>
        <p className="text-[#7D7D7D] text-[17px] text-center">
          {t("newPassword")}
        </p>

        <div className="relative md:w-[404px] mt-[18px]">
          <PasswordInput
            label={"كلمة المرور"}
            value={password}
            setValue={setPassword}
          />
        </div>

        <div className="relative md:w-[404px] mt-4">
          <PasswordInput
            label={"تأكيد كلمة المرور"}
            value={passwordConfirm}
            setValue={setPasswordConfirm}
          />
        </div>
        <div className="flex items-center justify-center mt-[17px]">
          <DashboardButton
            titleAr={"حفظ ودخول"}
            titleEn={"Save and enter"}
            onClick={handleSavePassword}
          />
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;