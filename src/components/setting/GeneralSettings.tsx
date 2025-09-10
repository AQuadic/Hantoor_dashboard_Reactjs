import { Input } from '@heroui/react'
import React, { useEffect } from 'react'
import DashboardButton from '../general/dashboard/DashboardButton'
import ImageInput from '../general/ImageInput'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { updateSettings, UpdateSettingsPayload } from '@/api/setting/updateSetting';
import { GeneralSettingsResponse, getSettings } from '@/api/setting/getSetting';

const GeneralSettings = () => {
    const { t } = useTranslation("setting");
    const [profileImage, setProfileImage] = React.useState<File | null>(null);
    const [, setLoading] = React.useState(false);
    const [fields, setFields] = React.useState({
        no_videos: '',
        text_features_ar: '',
        text_features_en: '',
        advanced_search_ar: '',
        advanced_search_en: '',
        financing_text_ar: '',
        financing_text_en: '',
        android_link: '',
        android_version: '',
        publish_date: '',
        iphone_link: '',
        iphone_version: '',
        iphone_date: '',
    });

    useEffect(() => {
    const fetchSettings = async () => {
        try {
        const data: GeneralSettingsResponse = await getSettings();
        setFields({
            no_videos: data.no_videos,
            text_features_ar: data.text_features_ar,
            text_features_en: data.text_features_en,
            advanced_search_ar: data.advanced_search_ar,
            advanced_search_en: data.advanced_search_en,
            financing_text_ar: data.financing_text_ar,
            financing_text_en: data.financing_text_en,
            android_link: data.android_link,
            android_version: data.android_version,
            publish_date: data.publish_date,
            iphone_link: data.iphone_link,
            iphone_version: data.iphone_version,
            iphone_date: data.iphone_date,
        });
        if (data.profile_image) {
            setProfileImage(null); 
        }
    } catch (error: any) {
        toast.error(error.message || "Failed to load settings");
    }
};
    fetchSettings();
}, []);

const handleInputChange = (key: string, value: string) => {
    setFields(prev => ({ ...prev, [key]: value }));
};

const handleSave = async (keys: string[]) => {
    const emptyFields = keys.filter(key => {
        if (key === 'profile_image') return !profileImage;
        return !fields[key as keyof typeof fields]?.trim();
    });

    if (emptyFields.length > 0) {
        toast.error(t('pleaseFillTheField'));
        return;
    }

    const payload: UpdateSettingsPayload = {};

    keys.forEach(key => {
        switch (key) {
            case 'no_videos':
                payload.ads_per_search = Number(fields.no_videos);
                break;
            case 'text_features_ar':
            case 'text_features_en':
                payload.featuresText = {
                    ar: fields.text_features_ar,
                    en: fields.text_features_en
                };

                break;
                break;
            case 'advanced_search_ar':
            case 'advanced_search_en':
                payload.AdvancedSearch = {
                    ar: fields.advanced_search_ar,
                    en: fields.advanced_search_en,
                };
                break;
            case 'financing_text_ar':
            case 'financing_text_en':
                payload.financeText = {
                    ar: fields.financing_text_ar,
                    en: fields.financing_text_en,
                };
                break;
            case 'android_link':
            case 'android_version':
            case 'publish_date':
                payload.app = payload.app || {};
                payload.app.android = {
                    link: fields.android_link,
                    version: fields.android_version,
                    release_date: fields.publish_date,
                };
                break;
            case 'iphone_link':
            case 'iphone_version':
            case 'iphone_date':
                payload.app = payload.app || {};
                payload.app.ios = {
                    link: fields.iphone_link,
                    version: fields.iphone_version,
                    release_date: fields.iphone_date,
                };
                break;
            case 'profile_image':
                payload.site_name = fields.no_videos;
                break;
        }
    });

    try {
        setLoading(true);
        const response = await updateSettings(payload);
        toast.success(response.message || t('savedSuccessfully'));
    } catch (error: any) {
        toast.error(error.message || t('somethingWentWrong'));
    } finally {
        setLoading(false);
    }
};


    return (
        <section>
            {/* 1 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] flex items-center mx-8 px-[29px] py-5'>
                <div className='lg:w-1/2'>
                    <Input
                    label={t('noVideos')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    value={fields.no_videos}
                    onChange={(e) => handleInputChange('no_videos', e.target.value)}
                />
                <div className='mt-4'>
                    <DashboardButton titleAr="حفظ" titleEn="Save" onClick={() => handleSave(['no_videos'])} />
                </div>
                </div>
            </div>

            {/* 2 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>{t('chooseImage')}</h2>
                <ImageInput image={profileImage} setImage={setProfileImage} />
                <div className='mt-4'>
                <DashboardButton titleAr="حفظ" titleEn="Save" onClick={() => handleSave(['profile_image'])}/>
                </div>
            </div> 

            {/* 3 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>{t('textFeatures')}</h2>
                <div className='flex md:flex-row flex-col items-center gap-[15px]'>
                    <div className='w-full relative'>
                        <h2 className='absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal'>{t('arText')}</h2>
                        <textarea
                        className='w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8'
                        placeholder={t('writeHere')}
                        value={fields.text_features_ar}
                        onChange={(e) => handleInputChange('text_features_ar', e.target.value)}
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" onClick={() => handleSave(['text_features_ar'])}/>
                    </div>
                    <div className='w-full relative'>
                        <h2 className='absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal'>{t('enText')}</h2>
                        <textarea
                            className='w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8'
                            placeholder={t('writeHere')}
                            value={fields.text_features_en}
                            onChange={(e) => handleInputChange('text_features_en', e.target.value)}
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" onClick={() => handleSave(['text_features_en'])}/>
                    </div>
                </div>
            </div>

            {/* 4 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>{t('advancedSearch')}</h2>
                <div className='flex md:flex-row flex-col items-center gap-[15px]'>
                    <div className='w-full relative'>
                        <h2 className='absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal'>{t('arText')}</h2>
                        <textarea
                        className='w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8'
                        placeholder={t('writeHere')}
                        value={fields.advanced_search_ar}
                        onChange={(e) => handleInputChange('advanced_search_ar', e.target.value)}
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" onClick={() => handleSave(['advanced_search_ar'])} />
                    </div>
                    <div className='w-full relative'>
                        <h2 className='absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal'>{t('enText')}</h2>
                        <textarea
                        className='w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8'
                        placeholder={t('writeHere')}
                        value={fields.advanced_search_en}
                        onChange={(e) => handleInputChange('advanced_search_en', e.target.value)}
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" onClick={() => handleSave(['advanced_search_en'])} />
                    </div>
                </div>
            </div> 

            {/* 5 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>{t('financingText')}</h2>
                <div className='flex md:flex-row flex-col items-center gap-[15px]'>
                    <div className='w-full relative'>
                        <h2 className='absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal'>{t('arText')}</h2>
                        <textarea
                        className='w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8'
                        placeholder={t('writeHere')}
                        value={fields.financing_text_ar}
                        onChange={(e) => handleInputChange('financing_text_ar', e.target.value)}
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" onClick={() => handleSave(['financing_text_ar'])}/>
                    </div>
                    <div className='w-full relative'>
                        <h2 className='absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal'>{t('enText')}</h2>
                        <textarea
                        className='w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8'
                        placeholder={t('writeHere')}
                        value={fields.financing_text_en}
                        onChange={(e) => handleInputChange('financing_text_en', e.target.value)}
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" onClick={() => handleSave(['financing_text_en'])}/>
                    </div>
                </div>
            </div>

            {/* 6 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>{t('appLinks')}</h2>
                <div className='mt-2.5 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    <Input
                    label={t('androidLink')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    value={fields.android_link}
                    onChange={(e) => handleInputChange('android_link', e.target.value)}
                />
                <Input
                    label={t('androidVersion')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    value={fields.android_version}
                    onChange={(e) => handleInputChange('android_version', e.target.value)}
                />
                <Input
                    type="date"
                    label={t('publishDate')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    value={fields.publish_date}
                    onChange={(e) => handleInputChange('publish_date', e.target.value)}
                />
                <Input
                    label={t('iphoneLink')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    value={fields.iphone_link}
                    onChange={(e) => handleInputChange('iphone_link', e.target.value)}
                />
                <Input
                    label={t('iphoneVersion')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    value={fields.iphone_version}
                    onChange={(e) => handleInputChange('iphone_version', e.target.value)}
                />
                <Input
                    type="date"
                    label={t('iphoneDate')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base"}}
                    size="lg"
                    value={fields.iphone_date}
                    onChange={(e) => handleInputChange('iphone_date', e.target.value)}
                />
                </div>
                <div className='mt-4'>
                <DashboardButton titleAr="حفظ" titleEn="Save" onClick={() => handleSave(['android_link', 'android_version', 'publish_date', 'iphone_link', 'iphone_version', 'iphone_date'])}/>
                </div>
            </div>
        </section>
    )
}

export default GeneralSettings
