import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import ImageInput from "@/components/general/ImageInput";
import MobileInput from "@/components/general/MobileInput";
import { Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { countries } from "countries-list";
import { useTranslation } from "react-i18next";
import { createAdmin } from "@/api/admins/addAdmin";
import { getAdmin } from "@/api/admins/getAdminById";
import toast from "react-hot-toast";
import { updateAdmin } from "@/api/admins/editAdmin";
import { getRoles, type Role } from "@/api/roles/getRoles";

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};

const AddSubordinatePage = () => {
  const extractErrorMessage = (err: unknown) => {
    if (!err) return "";
    if (typeof err === "string") return err;

    const e = err as any;

    // axios-style response with structured data
    if (e.response && e.response.data) {
      const data = e.response.data;

      // data may be a simple string
      if (typeof data === "string") return data;

      // common API shape: { message: string | string[], errors: { field: string[] } }
      if (data.message) {
        if (typeof data.message === "string") return data.message;
        if (Array.isArray(data.message)) return data.message.join(" - ");
      }

      if (data.errors && typeof data.errors === "object") {
        const messages: string[] = [];
        Object.values(data.errors).forEach((val: any) => {
          if (Array.isArray(val)) messages.push(...val.map(String));
          else if (typeof val === "string") messages.push(val);
        });
        if (messages.length) return messages.join(" - ");
      }
    }

    // fallback to error.message (e.g. axios's 'Request failed with status code 422')
    if (typeof e.message === "string") return e.message;

    return "";
  };

  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(
    undefined
  );

  const params = useParams();
  const managerId = params.id;
  const isEdit = Boolean(managerId);
  const [selectedCountry, setSelectedCountry] = useState(
    getCountryByIso2("EG")
  );
  const { t } = useTranslation("subordinates");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [loadingRoles, setLoadingRoles] = useState(false);
  const navigate = useNavigate();

  // Fetch roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingRoles(true);
        const rolesData = await getRoles({ pagination: "all" });
        setRoles(rolesData.data);
      } catch (err: unknown) {
        const message = extractErrorMessage(err) || "Failed to load roles";
        toast.error(message);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!isEdit) return;
      try {
        const data = await getAdmin(managerId as string);

        setName(data.name || "");
        setEmail(data.email || "");
        // Prefill phone number and country for edit mode.
        const phoneVal =
          data.phone ||
          data.phone_national?.replace(/\s/g, "") ||
          data.phone_e164 ||
          data.phone_normalized ||
          data.mobile ||
          "";
        setPhone(phoneVal);
        if (data.phone_country) {
          setSelectedCountry(getCountryByIso2(data.phone_country));
        }

        if (data.image?.url) {
          setExistingImageUrl(data.image.url);
        }

        // Set role if available - roles is an array of objects with name property
        if (data.roles && data.roles.length > 0) {
          setSelectedRole(data.roles[0].name);
        }
        if (data.phone_country) {
          setSelectedCountry(getCountryByIso2(data.phone_country));
        }
      } catch (err: unknown) {
        const message = extractErrorMessage(err) || "Failed to load admin data";
        toast.error(message);
      }
    };

    fetchAdmin();
  }, [isEdit, managerId]);

  const handleRemoveImage = () => {
    setProfileImage(null);
    setExistingImageUrl(undefined);
  };

  const handleSubmit = async () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      (!isEdit && (!password || !confirmPassword))
    ) {
      toast.error(t("fillAllFieldes"));
      return;
    }

    if (!isEdit && password !== confirmPassword) {
      toast.error(t('passwordsDoNotMatch'));
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEdit) {
        await updateAdmin(managerId as string, {
          name,
          email,
          phone,
          phone_country: selectedCountry.iso2,
          ...(password
            ? { password, password_confirmation: confirmPassword }
            : {}),
          ...(selectedRole ? { role: selectedRole } : {}),
          image: profileImage,
        });
      } else {
        await createAdmin({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
          phone,
          phone_country: selectedCountry.iso2,
          ...(selectedRole ? { role: selectedRole } : {}),
          image: profileImage,
        });
      }

      toast.success(
        isEdit ? t("adminUpdatedSuccessfully") : t("adminAddedSuccessfully")
      );
      navigate("/subordinates");
    } catch (err: unknown) {
      console.error(err);
      const message = extractErrorMessage(err) || "Something went wrong";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        titleAr={isEdit ? "تعديل مسؤول فرعي" : "إضافة مسؤول فرعي جديد"}
        titleEn={isEdit ? "Edit Branch Manager" : "Add New Branch Manager"}
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "لوحة التحكم",
            titleEn: "Dashboard",
            link: "/dashboard",
          },
          {
            titleAr: "المسؤولين الفرعيين",
            titleEn: "Branch Managers",
            link: "/branch-managers",
          },
          {
            titleAr: isEdit ? "تعديل مسؤول فرعي" : "إضافة مسؤول فرعي جديد",
            titleEn: isEdit ? "Edit Branch Manager" : "Add New Branch Manager",
            link: isEdit
              ? `/branch-managers/${managerId}`
              : "/branch-managers/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="p-8 bg-white rounded-2xl">
          <h3 className="mb-4 text-lg font-bold">{t("personalImage")}</h3>
          <ImageInput
            image={profileImage}
            setImage={setProfileImage}
            existingImageUrl={existingImageUrl}
            onRemoveImage={handleRemoveImage}
          />
        </div>

        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <h3 className="mb-2 text-lg font-bold">{t("mainData")}</h3>

          <div className="flex md:flex-row flex-col gap-4">
            <div className="w-full">
              <DashboardInput
                label={`${t("name")} *`}
                value={name}
                onChange={setName}
                placeholder="محمد احمد"
              />
            </div>
            <div className="w-full">
              <MobileInput
                label={`${t("phoneNumber")} *`}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                phone={phone}
                setPhone={setPhone}
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-4">
            <div className="w-full">
              <DashboardInput
                label={`${t("email")} *`}
                value={email}
                onChange={setEmail}
                placeholder="username@mail.com"
              />
            </div>
            <div className="w-full">
              <Select
                label={t("permissions")}
                variant="bordered"
                placeholder={t("choosePermission")}
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
                selectedKeys={selectedRole ? [selectedRole] : []}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  setSelectedRole(selectedKey || "");
                }}
                isLoading={loadingRoles}
              >
                {roles.map((role) => (
                  <SelectItem key={role.name} textValue={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Password only shown when adding new admin */}
          {!isEdit && (
            <div className="flex md:flex-row flex-col gap-4">
              <DashboardInput
                label={`${t("password")} *`}
                value={password}
                onChange={setPassword}
                placeholder="••••••••••••••••"
              />
              <DashboardInput
                label={`${t("confirmPassword")} *`}
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="••••••••••••••••"
              />
            </div>
          )}

          <DashboardButton
            titleEn={isEdit ? "Save" : "Add"}
            titleAr={isEdit ? "حفظ" : "اضافة"}
            onClick={handleSubmit}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default AddSubordinatePage;
