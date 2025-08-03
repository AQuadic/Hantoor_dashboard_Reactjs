import { Input } from '@heroui/react'
import React from 'react'
import DashboardButton from '../general/dashboard/DashboardButton'
import ImageInput from '../general/ImageInput'
import { useTranslation } from 'react-i18next';

const GeneralSettings = () => {
    const { t } = useTranslation("setting");
    const [profileImage, setProfileImage] = React.useState<File | null>(null);
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
                />
                <div className='mt-4'>
                    <DashboardButton titleAr="حفظ" titleEn="Save" />
                </div>
                </div>
            </div>

            {/* 2 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>{t('chooseImage')}</h2>
                <ImageInput image={profileImage} setImage={setProfileImage} />
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
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
                    </div>
                    <div className='w-full relative'>
                        <h2 className='absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal'>{t('enText')}</h2>
                        <textarea
                        className='w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8'
                        placeholder={t('writeHere')}
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
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
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
                    </div>
                    <div className='w-full relative'>
                        <h2 className='absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal'>{t('enText')}</h2>
                        <textarea
                        className='w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8'
                        placeholder={t('writeHere')}
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
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
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
                    </div>
                    <div className='w-full relative'>
                        <h2 className='absolute top-[11px] rtl:right-5 text-[#000000] text-[15px] font-normal'>{t('enText')}</h2>
                        <textarea
                        className='w-full h-32 border border-[#E2E2E2] rounded-[12px] px-5 py-8'
                        placeholder={t('writeHere')}
                        ></textarea>
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
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
                />
                <Input
                    label={t('androidVersion')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                <Input
                    type="date"
                    label={t('publishDate')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                <Input
                    label={t('iphoneLink')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                <Input
                    label={t('iphoneVersion')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                <Input
                    type="date"
                    label={t('iphoneDate')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base"}}
                    size="lg"
                />
                </div>
            </div>
        </section>
    )
}

export default GeneralSettings
