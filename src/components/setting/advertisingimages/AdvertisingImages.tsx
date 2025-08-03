import ImageInput from "@/components/general/ImageInput";
import VideoInput from "@/components/general/VideoInput";
import Delete from "@/components/icons/advertise/Delete";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const AdvertisingImages = () => {
    const { t } = useTranslation("setting");
    const [profileImage, setProfileImage] = React.useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);

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
            <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
                <h1 className="text-[17px] text-[#2A32F8] font-bold">{t('advertisingImages')}</h1>
                <div className="mt-[14px] flex flex-wrap items-center gap-[14px]">
                    <ImageInput image={profileImage} setImage={setProfileImage} />
                    <div className="relative">
                        <img src="/images/advertiseIMG.png" className="w-[378px] h-[169px]" alt="Image" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Delete />
                        </div>
                    </div>
                    <div className="relative">
                        <img src="/images/advertiseIMG.png" className="w-[378px] h-[169px]" alt="Image" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Delete />
                        </div>
                    </div>
                    <div className="relative">
                        <img src="/images/advertiseIMG.png" className="w-[378px] h-[169px]" alt="Image" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Delete />
                        </div>
                    </div>
                    <div className="relative">
                        <img src="/images/advertiseIMG.png" className="w-[378px] h-[169px]" alt="Image" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Delete />
                        </div>
                    </div>
                </div>
            </div>

                <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
                <h1 className="text-[17px] text-[#2A32F8] font-bold">{t('videoBeforeChat')}</h1>
                <div className="mt-[14px] flex flex-wrap items-center gap-[14px]">
                    <VideoInput video={video} setVideo={setVideo} />

                    <div className="relative">
                        <img src="/images/advertiseIMG.png" className="w-[378px] h-[169px]" alt="Image" />
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
