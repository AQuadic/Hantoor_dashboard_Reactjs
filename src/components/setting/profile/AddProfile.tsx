import React, { useEffect, useState } from 'react';
import ImageInput from '@/components/general/ImageInput';
import { Input } from '@heroui/react';
import DashboardButton from '@/components/general/dashboard/DashboardButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import { useTranslation } from 'react-i18next';
import DashboardTextEditor from '@/components/general/DashboardTextEditor';
import { createOnboarding, OnboardingData } from '@/api/onboarding/storeProfile';
import { getCountries, Country } from '@/api/countries/getCountry';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

const AddProfile = () => {
    const { t, i18n } = useTranslation("setting");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [countryId, setCountryId] = useState<string>('');
    const [titleAr, setTitleAr] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [arBody, setArBody] = useState('');
    const [enBody, setEnBody] = useState('');
    const [countries, setCountries] = useState<Country[]>([]);
    const [, setLoading] = useState(false);
    const navigate = useNavigate ();
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountries();
        setCountries(res.data.filter(c => c.is_active));
      } catch (err) {
        console.error(err);
        toast.error('Failed to load countries');
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async () => {
    if (!countryId) {
      toast.error('Please select a country');
      return;
    }

    const data: OnboardingData = {
      image: profileImage || undefined,
      country_id: countryId,
      title: { ar: titleAr, en: titleEn },
      description: { ar: arBody, en: enBody },
    };

    try {
      setLoading(true);
      const result = await createOnboarding(data);
      toast.success(t('profileAdded'));
      navigate("/settings?section=Informational+Pages")
      console.log(result);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

    return (
        <div>
            <div className="pt-0 pb-2 bg-white ">
                <DashboardHeader
                    titleAr="اضافة صفحة تعريفية جديدة"
                    titleEn="Add a new profile page"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
                    { titleAr: "اضافة صفحة تعريفية جديدة", titleEn: "Add a new profile page" },
                    ]}
                />
                </div>
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>{t('profileImage')}</h2>
                <ImageInput image={profileImage} setImage={setProfileImage} />
            </div> 
            <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Country */}
                <div className="md:w-1/2 w-full">
                <Select onValueChange={val => setCountryId(val)}>
                <SelectTrigger className="w-full !h-16 rounded-[12px] mt-4" dir="rtl">
                    <SelectValue placeholder={t('country')} />
                </SelectTrigger>
                <SelectContent dir="rtl">
                    {countries.length === 0
                    ? <SelectItem value="loading" disabled>Loading...</SelectItem> // use a non-empty value and disabled
                    : countries.map(country => (
                        <SelectItem key={country.id} value={country.id.toString()}>
                            {i18n.language === "ar" ? country.name.ar : country.name.en}
                        </SelectItem>
                        ))
                    }
                    </SelectContent>
                </Select>
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Arabic Question */}
                <div className="relative w-full">
                <Input
                    label={t('arText')}
                    value={titleAr}
                    onChange={e => setTitleAr(e.target.value)}
                    variant="bordered"
                    placeholder={t('arTextDesc')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    />
                </div>
                {/* English Question */}
                <div className="relative w-full">
                <Input
                    label={t('enText')}
                    value={titleEn}
                    onChange={e => setTitleEn(e.target.value)}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
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
                <DashboardButton titleAr="اضافة" titleEn="Add" onClick={handleSubmit}/>
            </div>
            </div>
        </div>
    )
}

export default AddProfile