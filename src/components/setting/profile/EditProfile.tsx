import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageInput from '@/components/general/ImageInput'
import { Input } from '@heroui/react';
import DashboardButton from '@/components/general/dashboard/DashboardButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import { useTranslation } from 'react-i18next';
import DashboardTextEditor from '@/components/general/DashboardTextEditor';
import { useQuery } from "@tanstack/react-query";
import { getOnboardingById, OnboardingDetail } from "@/api/onboarding/getProfileById";
import { getCountries, Country } from "@/api/countries/getCountry";
import Loading from "@/components/general/Loading";
import NoData from "@/components/general/NoData";

const EditProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation("setting");

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [arTitle, setArTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [arBody, setArBody] = useState("");
  const [enBody, setEnBody] = useState("");
  const [countryId, setCountryId] = useState<string>("");

  const { data: profile, isLoading } = useQuery<OnboardingDetail>({
    queryKey: ["onboarding", id],
    queryFn: () => getOnboardingById(id!),
    enabled: !!id,
  });

    const { data: countriesData } = useQuery<{ data: Country[] }, Error>({
    queryKey: ["countries"],
    queryFn: () => getCountries(1),
    });


    useEffect(() => {
    if (profile?.data) {
        const detail = profile.data;
        setArTitle(detail.title?.ar ?? "");
        setEnTitle(detail.title?.en ?? "");
        setArBody(detail.description?.ar ?? "");
        setEnBody(detail.description?.en ?? "");
        setCountryId(detail.country_id?.toString() ?? "");

        if (detail.image && typeof detail.image === "string") {
        fetch(detail.image)
            .then(res => res.blob())
            .then(blob => {
            const file = new File([blob], "profile.jpg", { type: blob.type });
            setProfileImage(file);
            });
        }
    }
    }, [profile]);

  if (isLoading) return <Loading />
  if (!profile) return <NoData />

    return (
        <div>
            <div className="pt-0 pb-2 bg-white ">
                <DashboardHeader
                    titleAr="تعديل الصفحة التعريفية"
                    titleEn="Edit profile page"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
                    { titleAr: "تعديل الصفحة التعريفية", titleEn: "Edit profile page" },
                    ]}
                />
                </div>
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>{t('profileImage')}</h2>
                <ImageInput 
                image={profileImage} 
                setImage={setProfileImage} 
                />
            </div> 
            <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Country */}
                <div className="md:w-1/2 w-full">
                <Select value={countryId} onValueChange={setCountryId}>
                    <SelectTrigger className="w-full !h-16 rounded-[12px] mt-4" dir="rtl">
                        <SelectValue placeholder={t("country")} />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                        {countriesData?.data.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                            {i18n.language === "ar" ? c.name.ar : c.name.en}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Arabic Question */}
                <div className="relative w-full">
                <Input
                    label={t('arText')}
                    variant="bordered"
                    placeholder={t("writeHere")}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    value={arTitle}
                    onChange={(e) => setArTitle(e.target.value)}
                    />
                </div>
                {/* English Question */}
                <div className="relative w-full">
                <Input
                    label={t('enText')}
                    variant="bordered"
                    placeholder={t("writeHere")}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    value={enTitle}
                    onChange={(e) => setEnTitle(e.target.value)}
                />
                </div>
            </div>

            <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Arabic Question */}
                <div className="relative w-full">
                    <DashboardTextEditor
                    title={t("arDescription")}
                    body={arBody}
                    setBody={setArBody}
                    />
                </div>
                {/* English Question */}
                <div className="relative w-full">
                    <DashboardTextEditor
                    title={t("enDescription")}
                    body={enBody}
                    setBody={setEnBody}
                    />
                </div>
            </div>
    
            <div className="mt-4">
                <DashboardButton titleAr="حفظ" titleEn="Save" />
            </div>
            </div>
        </div>
    )
}

export default EditProfile