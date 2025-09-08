import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import PasswordInput from "@/components/general/PasswordInput";
import { useTranslation } from "react-i18next";
import { updateAdmin } from "@/api/admins/editAdmin";
import toast from "react-hot-toast";

const SubordinatesChangePassword = () => {
  const { t } = useTranslation("subordinates");
  const { id } = useParams<{ id: string }>();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate ()
  const adminId = id ? Number(id) : null;

  const handleSave = async () => {
    if (!adminId) {
      toast.error("Invalid admin ID");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error(t("passwordRequired") || "Password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t("passwordsDoNotMatch") || "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await updateAdmin(adminId, {
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      toast.success(t("passwordChangedSuccess") || "Password changed successfully!");
      navigate("/subordinates")
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        t("passwordChangeFailed") ||
        "Failed to change password"
      );
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <DashboardHeader
        titleAr={"تغيير كلمة المرور"}
        titleEn={"Change Password"}
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          {
            titleAr: "المسؤولين الفرعيين",
            titleEn: "Subordinates",
            link: "/subordinates",
          },
          {
            titleAr: "تغيير كلمة المرور",
            titleEn: "Change Password",
            link: "/dashboard/change-password",
          },
        ]}
      />

      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px]">
          <PasswordInput
            value={newPassword}
            setValue={setNewPassword}
            label={t("newPassword")}
          />
          <PasswordInput
            value={confirmPassword}
            setValue={setConfirmPassword}
            label={t("confirmNewPassword")}
          />
        </div>

        <div className="mt-4">
          <DashboardButton
            titleEn={loading ? "Saving..." : "Save"}
            titleAr={loading ? "جاري الحفظ..." : "حفظ"}
            onClick={handleSave}
          />
        </div>
      </div>
    </section>
  );
};

export default SubordinatesChangePassword;
