import { Input } from "@heroui/react";
import React, { useEffect } from "react";
import DashboardButton from "../general/dashboard/DashboardButton";
import ImageInput from "../general/ImageInput";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import {
  updateSettings,
  UpdateSettingsPayload,
} from "@/api/setting/updateSetting";
import { GeneralSettingsResponse, getSettings } from "@/api/setting/getSetting";
import { uploadLangCountryImage } from "@/api/setting/uploadLangCountryImage";
import { chooseLangCountryImage } from "@/api/setting/chooseLangCountryImage";

const GeneralSettings = () => {
  const { t } = useTranslation("setting");
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [existingProfileImageUrl, setExistingProfileImageUrl] = React.useState<
    string | null
  >(null);
  // Separate loading states for each section
  const [loadingStates, setLoadingStates] = React.useState({
    no_videos: false,
    profile_image: false,
    text_features: false,
    advanced_search: false,
    financing_text: false,
    app_links: false,
  });
  const [fields, setFields] = React.useState({
    no_videos: "",
    text_features_ar: "",
    text_features_en: "",
    advanced_search_ar: "",
    advanced_search_en: "",
    financing_text_ar: "",
    financing_text_en: "",
    android_link: "",
    android_version: "",
    publish_date: "",
    iphone_link: "",
    iphone_version: "",
    iphone_date: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data: GeneralSettingsResponse = await getSettings();

        // Map API response to local fields used by the UI
        setFields({
          no_videos: data.ads_per_search?.toString() ?? "",
          text_features_ar: data.featuresText?.ar ?? "",
          text_features_en: data.featuresText?.en ?? "",
          advanced_search_ar: data.AdvancedSearchText?.ar ?? "",
          advanced_search_en: data.AdvancedSearchText?.en ?? "",
          financing_text_ar: data.financeTextForCarDetails?.ar ?? "",
          financing_text_en: data.financeTextForCarDetails?.en ?? "",
          android_link: data.appLinks?.android?.link ?? "",
          android_version: data.appLinks?.android?.version ?? "",
          publish_date: data.appLinks?.android?.release_date ?? "",
          iphone_link: data.appLinks?.ios?.link ?? "",
          iphone_version: data.appLinks?.ios?.version ?? "",
          iphone_date: data.appLinks?.ios?.release_date ?? "",
        });

        // Try to fetch chosen image from dedicated endpoint and prefer it if present
        try {
          const chosen = await chooseLangCountryImage();
          // backend may return just { image_url: '...' } or { data: { image_url: '...' } }
          const chosenUrl =
            chosen?.image_url ??
            chosen?.data?.image ??
            chosen?.data?.profile_image ??
            chosen?.data?.image_url;
          if (chosenUrl) {
            setExistingProfileImageUrl(chosenUrl);
            setProfileImage(null);
          } else if (data.profile_image) {
            setExistingProfileImageUrl(data.profile_image);
            setProfileImage(null);
          }
        } catch (e) {
          console.warn("chooseLangCountryImage failed:", e);
          // fallback to settings.profile_image if choose endpoint fails
          if (data.profile_image) {
            setExistingProfileImageUrl(data.profile_image);
            setProfileImage(null);
          }
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        toast.error(message || "Failed to load settings");
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (
    keys: string[],
    sectionKey: keyof typeof loadingStates
  ) => {
    const emptyFields = keys.filter((key) => {
      if (key === "profile_image") {
        // allow saving if there's an existing image URL or a newly picked file
        return !profileImage && !existingProfileImageUrl;
      }
      return !fields[key as keyof typeof fields]?.trim();
    });

    if (emptyFields.length > 0) {
      toast.error(t("pleaseFillTheField"));
      return;
    }

    const payload: UpdateSettingsPayload = {};

    // Only include the specific fields being saved based on the keys array
    if (keys.includes("no_videos")) {
      payload.ads_per_search = Number(fields.no_videos);
    }

    if (
      keys.includes("text_features_ar") ||
      keys.includes("text_features_en")
    ) {
      payload.featuresText = {
        ar: fields.text_features_ar,
        en: fields.text_features_en,
      };
    }

    if (
      keys.includes("advanced_search_ar") ||
      keys.includes("advanced_search_en")
    ) {
      payload.AdvancedSearchText = {
        ar: fields.advanced_search_ar,
        en: fields.advanced_search_en,
      };
    }

    if (
      keys.includes("financing_text_ar") ||
      keys.includes("financing_text_en")
    ) {
      payload.financeTextForCarDetails = {
        ar: fields.financing_text_ar,
        en: fields.financing_text_en,
      };
    }

    if (
      keys.some((key) =>
        [
          "android_link",
          "android_version",
          "publish_date",
          "iphone_link",
          "iphone_version",
          "iphone_date",
        ].includes(key)
      )
    ) {
      payload.appLinks = {};

      if (
        keys.some((key) =>
          ["android_link", "android_version", "publish_date"].includes(key)
        )
      ) {
        payload.appLinks.android = {
          link: fields.android_link,
          version: fields.android_version,
          release_date: fields.publish_date,
        };
      }

      if (
        keys.some((key) =>
          ["iphone_link", "iphone_version", "iphone_date"].includes(key)
        )
      ) {
        payload.appLinks.ios = {
          link: fields.iphone_link,
          version: fields.iphone_version,
          release_date: fields.iphone_date,
        };
      }
    }

    if (keys.includes("profile_image")) {
      // For profile image: either upload a new file or send remove flag
      // If no file and no existing URL, it's invalid (handled above).
    }

    try {
      setLoadingStates((prev) => ({ ...prev, [sectionKey]: true }));
      // If updating profile image, build payload accordingly
      if (keys.includes("profile_image")) {
        // If there's a new file, upload it to the dedicated endpoint then refresh
        if (profileImage) {
          const uploadResp = await uploadLangCountryImage(profileImage);
          toast.success(uploadResp.message || t("savedSuccessfully"));
          // After uploading, try the choose endpoint first (it may return image_url directly)
          const chosenAfter = await chooseLangCountryImage();
          const newUrl =
            chosenAfter?.image_url ??
            chosenAfter?.data?.image ??
            chosenAfter?.data?.profile_image ??
            chosenAfter?.data?.image_url;
          if (newUrl) {
            setExistingProfileImageUrl(newUrl);
            setProfileImage(null);
          } else {
            // fallback to getSettings
            const data: GeneralSettingsResponse = await getSettings();
            setExistingProfileImageUrl(data.profile_image ?? null);
            setProfileImage(null);
          }
          return;
        }

        // No file -> user removed existing image, call updateSettings with remove flag
        const response = await updateSettings({ remove_image: true });
        toast.success(response.message || t("savedSuccessfully"));
        // After removal, try choose endpoint to see if it returns a replacement image_url
        const chosenAfterRemove = await chooseLangCountryImage();
        const afterRemoveUrl =
          chosenAfterRemove?.image_url ??
          chosenAfterRemove?.data?.image ??
          chosenAfterRemove?.data?.profile_image ??
          chosenAfterRemove?.data?.image_url;
        if (afterRemoveUrl) {
          setExistingProfileImageUrl(afterRemoveUrl);
        } else {
          const data: GeneralSettingsResponse = await getSettings();
          setExistingProfileImageUrl(data.profile_image ?? null);
        }
        setProfileImage(null);
        return;
      }

      const response = await updateSettings(payload);
      toast.success(response.message || t("savedSuccessfully"));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || t("somethingWentWrong"));
    } finally {
      setLoadingStates((prev) => ({ ...prev, [sectionKey]: false }));
    }
  };

  const handleRemoveImage = async () => {
  setExistingProfileImageUrl(null);
  setProfileImage(null);

  try {
    setLoadingStates((prev) => ({ ...prev, profile_image: true }));
    const response = await updateSettings({ remove_image: true });
    toast.success(response.message || t("savedSuccessfully"));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    toast.error(message || t("somethingWentWrong"));
  } finally {
    setLoadingStates((prev) => ({ ...prev, profile_image: false }));
  }
};

  return (
    <section>
      {/* 1 */}
      <form
        className="h-full bg-[#FFFFFF] rounded-[15px] flex items-center mx-8 px-[29px] py-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(["no_videos"], "no_videos");
        }}
      >
        <div className="lg:w-1/2">
          <Input
            label={t("noVideos")}
            variant="bordered"
            placeholder={t("writeHere")}
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
            value={fields.no_videos}
            onChange={(e) => handleInputChange("no_videos", e.target.value)}
          />
          <div className="mt-4">
            <DashboardButton
              titleAr="حفظ"
              titleEn="Save"
              isLoading={loadingStates.no_videos}
              type="submit"
            />
          </div>
        </div>
      </form>

      {/* 2 */}
      <form
        className="h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(["profile_image"], "profile_image");
        }}
      >
        <h2 className="text-[#2A32F8] text-[17px] font-bold mb-3">
          {t("chooseImage")}
        </h2>
        <ImageInput
          image={profileImage ?? existingProfileImageUrl}
          existingImageUrl={existingProfileImageUrl ?? undefined}
          setImage={setProfileImage}
          onRemoveImage={handleRemoveImage} 
        />
        <div className="mt-4">
          <DashboardButton
            titleAr="حفظ"
            titleEn="Save"
            isLoading={loadingStates.profile_image}
            type="submit"
          />
        </div>
      </form>

      {/* 3 */}
      <div className="h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]">
        <h2 className="text-[#2A32F8] text-[17px] font-bold mb-3">
          {t("textFeatures")}
        </h2>
        <div className="flex md:flex-row flex-col items-center gap-[15px]">
          <div className="w-full relative">
            <h2 className="absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal">
              {t("arText")}
            </h2>
            <textarea
              className="w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8"
              placeholder={t("writeHere")}
              value={fields.text_features_ar}
              onChange={(e) =>
                handleInputChange("text_features_ar", e.target.value)
              }
            ></textarea>
          </div>
          <div className="w-full relative">
            <h2 className="absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal">
              {t("enText")}
            </h2>
            <textarea
              className="w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8"
              placeholder={t("writeHere")}
              value={fields.text_features_en}
              onChange={(e) =>
                handleInputChange("text_features_en", e.target.value)
              }
            ></textarea>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(
              ["text_features_ar", "text_features_en"],
              "text_features"
            );
          }}
        >
          <div className="mt-4">
            <DashboardButton
              titleAr="حفظ"
              titleEn="Save"
              isLoading={loadingStates.text_features}
              type="submit"
            />
          </div>
        </form>
      </div>

      {/* 4 */}
      <div className="h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]">
        <h2 className="text-[#2A32F8] text-[17px] font-bold mb-3">
          {t("advancedSearch")}
        </h2>
        <div className="flex md:flex-row flex-col items-center gap-[15px]">
          <div className="w-full relative">
            <h2 className="absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal">
              {t("arText")}
            </h2>
            <textarea
              className="w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8"
              placeholder={t("writeHere")}
              value={fields.advanced_search_ar}
              onChange={(e) =>
                handleInputChange("advanced_search_ar", e.target.value)
              }
            ></textarea>
          </div>
          <div className="w-full relative">
            <h2 className="absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal">
              {t("enText")}
            </h2>
            <textarea
              className="w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8"
              placeholder={t("writeHere")}
              value={fields.advanced_search_en}
              onChange={(e) =>
                handleInputChange("advanced_search_en", e.target.value)
              }
            ></textarea>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(
              ["advanced_search_ar", "advanced_search_en"],
              "advanced_search"
            );
          }}
        >
          <div className="mt-4">
            <DashboardButton
              titleAr="حفظ"
              titleEn="Save"
              isLoading={loadingStates.advanced_search}
              type="submit"
            />
          </div>
        </form>
      </div>

      {/* 5 */}
      <div className="h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]">
        <h2 className="text-[#2A32F8] text-[17px] font-bold mb-3">
          {t("financingText")}
        </h2>
        <div className="flex md:flex-row flex-col items-center gap-[15px]">
          <div className="w-full relative">
            <h2 className="absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal">
              {t("arText")}
            </h2>
            <textarea
              className="w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8"
              placeholder={t("writeHere")}
              value={fields.financing_text_ar}
              onChange={(e) =>
                handleInputChange("financing_text_ar", e.target.value)
              }
            ></textarea>
          </div>
          <div className="w-full relative">
            <h2 className="absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal">
              {t("enText")}
            </h2>
            <textarea
              className="w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8"
              placeholder={t("writeHere")}
              value={fields.financing_text_en}
              onChange={(e) =>
                handleInputChange("financing_text_en", e.target.value)
              }
            ></textarea>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(
              ["financing_text_ar", "financing_text_en"],
              "financing_text"
            );
          }}
        >
          <div className="mt-4">
            <DashboardButton
              titleAr="حفظ"
              titleEn="Save"
              isLoading={loadingStates.financing_text}
              type="submit"
            />
          </div>
        </form>
      </div>

      {/* 6 */}
      <div className="h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]">
        <h2 className="text-[#2A32F8] text-[17px] font-bold mb-3">
          {t("appLinks")}
        </h2>
        <div className="mt-2.5 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <Input
            label={t("androidLink")}
            variant="bordered"
            placeholder={t("writeHere")}
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
            value={fields.android_link}
            onChange={(e) => handleInputChange("android_link", e.target.value)}
          />
          <Input
            label={t("androidVersion")}
            variant="bordered"
            placeholder={t("writeHere")}
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
            value={fields.android_version}
            onChange={(e) =>
              handleInputChange("android_version", e.target.value)
            }
          />
          <Input
            type="date"
            label={t("publishDate")}
            variant="bordered"
            placeholder={t("writeHere")}
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
            value={fields.publish_date}
            onChange={(e) => handleInputChange("publish_date", e.target.value)}
          />
          <Input
            label={t("iphoneLink")}
            variant="bordered"
            placeholder={t("writeHere")}
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
            value={fields.iphone_link}
            onChange={(e) => handleInputChange("iphone_link", e.target.value)}
          />
          <Input
            label={t("iphoneVersion")}
            variant="bordered"
            placeholder={t("writeHere")}
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
            value={fields.iphone_version}
            onChange={(e) =>
              handleInputChange("iphone_version", e.target.value)
            }
          />
          <Input
            type="date"
            label={t("iphoneDate")}
            variant="bordered"
            placeholder={t("writeHere")}
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
            value={fields.iphone_date}
            onChange={(e) => handleInputChange("iphone_date", e.target.value)}
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(
              [
                "android_link",
                "android_version",
                "publish_date",
                "iphone_link",
                "iphone_version",
                "iphone_date",
              ],
              "app_links"
            );
          }}
        >
          <div className="mt-4">
            <DashboardButton
              titleAr="حفظ"
              titleEn="Save"
              isLoading={loadingStates.app_links}
              type="submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default GeneralSettings;
