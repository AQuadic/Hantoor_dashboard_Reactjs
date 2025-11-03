import ImageInput from "@/components/general/ImageInput";
import Delete from "@/components/icons/advertise/Delete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSliders, Slider, GetSlidersParams } from "@/api/slider/getSlider";
import { createSlider } from "@/api/slider/addSlider";
import { deleteSlider } from "@/api/slider/deleteSlider";
import { getAllCountries, Country } from "@/api/countries/getCountry";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AdvertisingImages = () => {
  const { t, i18n } = useTranslation("setting");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [countries, setCountries] = useState<Country[] | null>(null);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
    null
  );

  const { data, refetch } = useQuery({
    queryKey: ["sliders", selectedCountryId],
    queryFn: async () => {
      const params: GetSlidersParams = {};
      if (selectedCountryId) params.country_id = selectedCountryId;
      const response = await getSliders(params);
      return response.data;
    },
    enabled: selectedCountryId !== null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  // Clear preview when country changes to allow new uploads
  useEffect(() => {
    setPreview(null);
  }, [selectedCountryId]);

  const handleUpload = async (file: File) => {
    const loadingToast = toast.loading(t("imageUploading"));
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setUploadError(null);

    try {
      await createSlider({
        name: "slider",
        title: "New Slider",
        imageAr: file,
        imageEn: file,
        country_id: selectedCountryId ?? undefined,
      });
      toast.dismiss(loadingToast);
      toast.success(t("imageAdded"));
      setPreview(null);
      refetch();
    } catch {
      toast.dismiss(loadingToast);
      setUploadError("Failed to upload image");
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // Fetch countries on mount and default to first country
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const all = await getAllCountries();
        if (!mounted) return;
        setCountries(all);
        if (all && all.length > 0) {
          setSelectedCountryId(all[0].id);
        } else {
          setSelectedCountryId(null);
        }
      } catch (err) {
        // Log so lint/typecheck doesn't complain about unused catch var
        console.error("Failed to fetch countries", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteSlider(id);
      toast.success(t("imageDeleted"));
      refetch();
    } catch {
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="px-2 md:px-8">
      <div className="w-full">
        <Select
          value={String(selectedCountryId ?? "")}
          onValueChange={(val) => {
            const id = val ? Number(val) : null;
            setSelectedCountryId(id);
          }}
        >
          <SelectTrigger
            className="w-[160px] !h-[53px] rounded-[12px] mt-4 bg-white"
            dir="rtl"
          >
            <SelectValue placeholder={t("country")} />
          </SelectTrigger>
          <SelectContent dir="rtl">
            {countries?.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {/* Show English name when app language starts with "en", otherwise show Arabic first */}
                {i18n.language &&
                String(i18n.language).toLowerCase().startsWith("en")
                  ? c.name.en || c.name.ar
                  : c.name.ar || c.name.en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
        <h1 className="text-[17px] text-[#2A32F8] font-bold">
          {t("advertisingImages")}
        </h1>
        <div className="mt-[14px] flex flex-wrap items-center gap-[14px]">
          <ImageInput
            image={preview}
            setImage={(fileOrCallback) => {
              let file: File | null = null;
              if (typeof fileOrCallback === "function") {
                file = fileOrCallback(null);
              } else {
                file = fileOrCallback;
              }
              if (file) handleUpload(file);
            }}
            placeholderText={t("addPhoto")}
          />
          <div className="sr-only" aria-hidden>
            Uploading: {uploading ? "yes" : "no"}. Error: {uploadError}
          </div>
          {data?.map((slider: Slider) => (
            <div key={slider.id} className="relative">
              <img
                src={slider.ar_image?.url || "/images/placeholder.png"}
                className="w-[378px] h-[169px] object-cover object-center"
                alt={slider.name || `Slider ${slider.id}`}
              />

              <button
                type="button"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                onClick={() => handleDelete(slider.id)}
              >
                <Delete />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
                <h1 className="text-[17px] text-[#2A32F8] font-bold">{t("videoBeforeChat")}</h1>
                <div className="mt-[14px] flex flex-wrap items-center gap-[14px]">
                    <VideoInput video={null} setVideo={() => {}} />

                    <div className="relative">
                        <img src="/images/advertiseIMG.png" className="w-[378px] h-[169px]" alt="Video placeholder" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Delete />
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export default AdvertisingImages;
