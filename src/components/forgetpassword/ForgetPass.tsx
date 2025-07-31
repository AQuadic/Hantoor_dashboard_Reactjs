import React from 'react'
import Email from '../icons/login/Email'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import DashboardButton from '../general/dashboard/DashboardButton';

const ForgetPass = () => {
    const { t } = useTranslation("login");
    return (
        <section className='flex items-center justify-between gap-4 !bg-white'>
            <img src="/images/loginIMG.png" className='lg:flex hidden h-screen' alt="Login image" />
            <div className="px-8 mx-auto lg:mt-0 mt-10">
                <h1 className="text-[#1E1B1B] text-[30px] font-bold text-center">{t('forgetPassword')}</h1>
                <p className="text-[#7D7D7D] text-[17px] text-center mt-[7px]">{t('enterEmail')}</p>
                <div className="relative">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="md:w-[404px] w-full h-[57px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
                        placeholder="username@mail.com"
                    />
                    <h2 className="text-[#000000] text-[15px] absolute top-5 right-4">{t('email')}</h2>
                    <div className="absolute top-9 left-5">
                        <Email />
                    </div>
                </div>

                <Link to='/verification-code' className="text-center mt-[17px] flex items-center justify-center mx-auto">
                    <DashboardButton titleAr={('التالي')} titleEn='Next' />
                </Link>

            </div>
        </section>
    )
}

export default ForgetPass
