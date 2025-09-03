import ImageInput from "@/components/general/ImageInput";
import VideoInput from "@/components/general/VideoInput";
import Delete from "@/components/icons/advertise/Delete";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getSliders, Slider } from "@/api/slider/getSlider";
import { createSlider } from "@/api/slider/addSlider";
import { deleteSlider } from "@/api/slider/deleteSlider";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AdvertisingImages = () => {
    const { t } = useTranslation("setting");
    const [, setUploading] = useState(false);
    const [, setUploadError] = useState<string | null>(null);

    const { data, refetch } = useQuery({
        queryKey: ["sliders"],
        queryFn: async () => {
        const response = await getSliders();
        return response.data;
        },
    });

    const [, setPreview] = useState<string | null>(null);

    const handleUpload = async (file: File) => {
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setUploadError(null);

    try {
        await createSlider({ title: "New Slider", imageAr: file, imageEn: file });
        toast.success(t('imageAdded'));
        setPreview(null);
        refetch();
    } catch {
        setUploadError("Failed to upload image");
    } finally {
        setUploading(false);
    }
    };

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
        <div className='px-2 md:px-8'>
            <div className="w-full">
                <Select>
                <SelectTrigger
                    className="w-[160px] !h-[53px] rounded-[12px] mt-4 bg-white"
                    dir="rtl"
                >
                    <SelectValue placeholder={t('country')} />
                </SelectTrigger>
                <SelectContent dir="rtl">
                    <SelectItem value="1">الجميع</SelectItem>
                    <SelectItem value="2">الجميع</SelectItem>
                    <SelectItem value="3">الجميع</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
                <h1 className="text-[17px] text-[#2A32F8] font-bold">{t('advertisingImages')}</h1>
                <div className="mt-[14px] flex flex-wrap items-center gap-[14px]">
                <ImageInput
                    image={null}
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
                    {data?.map((slider: Slider) => (
                        <div key={slider.id} className="relative">
                        <img
                            src={slider.ar_image || "/images/placeholder.png"}
                            className="w-[378px] h-[169px]"
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

                <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
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
            </div>
        </div>
    )
}

export default AdvertisingImages