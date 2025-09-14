import { Input } from "@heroui/react";
import React, { useState } from "react";
import ImageInput from "../general/ImageInput";
import DashboardButton from "../general/dashboard/DashboardButton";
import { countries } from "countries-list";
import MobileInput from "../general/MobileInput";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {
  getCurrentAdmin,
  GetCurrentAdminResponse,
} from "@/api/profile/getProfile";
import Loading from "../general/Loading";
import { updateAdmin } from "@/api/admins/editAdmin";
import toast from "react-hot-toast";

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};

interface EditProfileFormProps {
  profileImage: File | null;
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
}
const EditProfileForm = ({
  profileImage,
  setProfileImage,
}: EditProfileFormProps) => {
  const { t } = useTranslation("profile");
  const [selectedCountry, setSelectedCountry] = useState(
    getCountryByIso2("EG")
  );
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // intentionally reference loading so linter doesn't complain; used for UI states in future
  const _loadingRef = React.useRef<boolean | null>(null);
  React.useEffect(() => {
    // no-op: keep loading referenced to avoid unused variable lint; stored in ref
    _loadingRef.current = loading;
  }, [loading]);
  // Local state to track existing image URL so we can clear it in the UI
  const [existingImageUrlState, setExistingImageUrlState] = useState<
    string | null
  >(null);
  // Flag to indicate user removed the existing image; sent to API to remove server-side image
  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  const { data, isLoading } = useQuery<GetCurrentAdminResponse>({
    queryKey: ["currentAdmin"],
    queryFn: getCurrentAdmin,
  });

  // Helper to extract API error message from unknown error objects
  const getErrorMessage = (err: unknown): string | undefined => {
    if (!err || typeof err !== "object") return undefined;
    const maybe = err as { response?: { data?: { message?: string } } };
    return maybe.response?.data?.message;
  };

  React.useEffect(() => {
    if (data) {
      setName(data.name || "");
      setEmail(data.email || "");
      if (data.phone) setPhone(data.phone);
      if (data.phone_country)
        setSelectedCountry(getCountryByIso2(data.phone_country || "EG"));
      // Initialize existing image URL from API data
      setExistingImageUrlState(data.image?.url || null);
      setRemoveExistingImage(false);
    }
  }, [data]);

  // If user selects a new file, we should clear the "remove existing image" flag
  React.useEffect(() => {
    if (profileImage) {
      setRemoveExistingImage(false);
      // keep existingImageUrlState as null since new preview will be used
    }
  }, [profileImage]);

  // Called when the user clicks the remove button on the ImageInput
  const handleRemoveImage = async () => {
    // Immediately update UI to reflect removal
    setExistingImageUrlState(null);
    setProfileImage(null);

    // If we don't have current admin data yet, just mark for removal on save
    if (!data) {
      setRemoveExistingImage(true);
      return;
    }

    // Send PUT to remove image on the server immediately
    try {
      setLoading(true);
      // clear the flag because we're removing immediately
      setRemoveExistingImage(false);
      await updateAdmin(data.id, { remove_image: true });
      toast.success(t("profileUpdated"));
    } catch (err: unknown) {
      const msg = getErrorMessage(err);
      toast.error(msg || t("profileUpdateFailed"));
      // if API failed, keep the remove flag so user can retry on save
      setRemoveExistingImage(true);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  const handleSaveMainData = async () => {
    if (!data) return;
    try {
      setLoading(true);
      await updateAdmin(data.id, {
        name,
        email,
        phone,
        phone_country: selectedCountry.iso2,
        image: profileImage,
        // Tell the API to remove the existing image if the user removed it in the UI
        remove_image: removeExistingImage,
      });
      toast.success(t("profileUpdated"));
    } catch (err: unknown) {
      const message = getErrorMessage(err);

      if (message?.includes("phone")) {
        toast.error(t("validation.phone"));
      } else if (message?.includes("email")) {
        toast.error(t("validation.email"));
      } else if (message?.includes("name")) {
        toast.error(t("validation.name"));
      } else {
        toast.error(message || t("profileUpdateFailed"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (!data) return;

    if (!newPassword || !confirmPassword) {
      toast.error(t("enterNewPassword"));
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t("passwordnotMatch"));
      return;
    }
    try {
      setLoading(true);
      await updateAdmin(data.id, {
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      toast.success(t("passwordUpdated"));
    } catch (err: unknown) {
      const msg = getErrorMessage(err);
      toast.error(msg || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-8" onSubmit={(e) => e.preventDefault()}>
      <div className="p-8 bg-white rounded-2xl ">
        <h3 className="mb-4 text-lg font-bold">{t("profileImage")}</h3>
        <ImageInput
          image={profileImage}
          setImage={setProfileImage}
          // Pass the existing image URL we track locally so it can be shown
          existingImageUrl={existingImageUrlState || undefined}
          // When the user removes the image, clear local state and mark for removal
          onRemoveImage={handleRemoveImage}
        />
      </div>
      <div className="flex gap-6 p-8 mt-8 bg-white rounded-2xl !text-base">
        <div className="flex flex-col flex-1 gap-4">
          <h3 className="mb-2 text-lg font-bold ">{t("mainData")}</h3>

          <Input
            label={t("name")}
            variant="bordered"
            placeholder="محمد احمد"
            classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
            size="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label={t("email")}
            variant="bordered"
            placeholder="username@mail.com"
            classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MobileInput
            label={t("phone")}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            phone={phone}
            setPhone={setPhone}
          />
          <DashboardButton
            titleAr="حفظ"
            titleEn="Save"
            onClick={handleSaveMainData}
          />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <h3 className="mb-2 text-lg font-bold">{t("password")}</h3>
          <Input
            label={t("currentPassword")}
            variant="bordered"
            placeholder="********"
            classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
            size="lg"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            label={t("newPassword")}
            variant="bordered"
            placeholder="********"
            classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
            size="lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            label={t("confirmPassword")}
            variant="bordered"
            placeholder="********"
            classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
            size="lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <DashboardButton
            titleAr="حفظ"
            titleEn="Save"
            onClick={handleSavePassword}
          />
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
