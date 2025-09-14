"use client";
import Facebook from "@/components/icons/socailmedia/Facebook";
import Instagram from "@/components/icons/socailmedia/Instagram";
import Linkedin from "@/components/icons/socailmedia/Linkedin";
import Snapchat from "@/components/icons/socailmedia/Snapchat";
import Tiktok from "@/components/icons/socailmedia/Tiktok";
import Whatsapp from "@/components/icons/socailmedia/Whatsapp";
import X from "@/components/icons/socailmedia/X";
import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSocials } from "@/api/setting/social/getSocial";
import {
  updateSocials,
  UpdateSocialsPayload,
} from "@/api/setting/social/editSocial";
import Loading from "@/components/general/Loading";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import toast from "react-hot-toast";

const SocialMediaPage = () => {
  const { t } = useTranslation("setting");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["socials"],
    queryFn: () => getSocials(1),
  });

  const [socialValues, setSocialValues] = useState<UpdateSocialsPayload>({
    facebook: "",
    instagram: "",
    whatsapp: "",
    tiktok: "",
    snapchat: "",
    twitter: "",
    linkedin: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setSocialValues({
        facebook: data.data.facebook || "",
        instagram: data.data.instagram || "",
        whatsapp: data.data.whatsapp || "",
        tiktok: data.data.tiktok || "",
        snapchat: data.data.snapchat || "",
        twitter: data.data.twitter || "",
        linkedin: data.data.linkedin || "",
      });
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  const SocialData = [
    {
      key: "facebook",
      icon: Facebook,
      label: t("facebookLink"),
    },
    {
      key: "instagram",
      icon: Instagram,
      label: t("instagramLink"),
    },
    {
      key: "whatsapp",
      icon: Whatsapp,
      label: t("whatsappLink"),
    },
    {
      key: "tiktok",
      icon: Tiktok,
      label: t("tiktokLink"),
    },
    {
      key: "snapchat",
      icon: Snapchat,
      label: t("snapchatLink"),
    },
    {
      key: "twitter",
      icon: X,
      label: t("xLink"),
    },
    { key: "linkedin", icon: Linkedin, label: t("linkedinLink") },
  ];

  const handleChange = (key: string, value: string) => {
    setSocialValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const normalizeUrl = (url: string) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  const handleViewLink = (key: keyof UpdateSocialsPayload) => {
    const url = socialValues[key] || "";
    const normalized = normalizeUrl(url);
    if (!normalized) return;
    window.open(normalized, "_blank", "noopener,noreferrer");
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateSocials(socialValues);
      toast.success(t("socialUpdatedSuccessfully"));
      queryClient.invalidateQueries({ queryKey: ["socials"] });
    } catch {
      toast.error(t("errorUpdateLink"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
      <h2 className="text-[#2A32F8] text-[17px] font-bold">
        {t("socialMediaLinks")}
      </h2>
      <div className="mt-[14px] grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
        {SocialData.map((item) => (
          <div
            key={item.key}
            className="w-full h-[57px] border border-[#E2E2E2] rounded-[12px] flex items-center gap-4 px-2.5"
          >
            <div>
              <item.icon />
            </div>
            <div className="flex flex-col w-full pr-2">
              <p className="text-[#000000] text-[15px] font-normal">
                {item.label}
              </p>
              <input
                type="text"
                value={
                  socialValues[item.key as keyof UpdateSocialsPayload] || ""
                }
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="focus:outline-none text-[#636270] text-sm py-1 w-full"
                placeholder={t("enterLink")}
              />
            </div>
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={() =>
                  handleViewLink(item.key as keyof UpdateSocialsPayload)
                }
                disabled={
                  !socialValues[item.key as keyof UpdateSocialsPayload]?.trim()
                }
                className={`p-2 rounded-md border flex items-center justify-center ${
                  socialValues[item.key as keyof UpdateSocialsPayload]?.trim()
                    ? "text-[#2A32F8] border-[#2A32F8]"
                    : "text-gray-300 border-gray-200"
                }`}
                aria-label={`view-${item.key}-link`}
              >
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <DashboardButton
        titleAr={isSaving ? "جارٍ الحفظ..." : "حفظ"}
        titleEn={isSaving ? "Saving..." : "Save"}
        onClick={handleSave}
      />
    </div>
  );
};

export default SocialMediaPage;
