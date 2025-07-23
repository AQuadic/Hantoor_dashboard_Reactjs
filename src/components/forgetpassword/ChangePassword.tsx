import React from 'react'
import { useTranslation } from 'react-i18next';
import Password from '../icons/login/Password';
import DashboardButton from '../general/dashboard/DashboardButton';
import { Link } from 'react-router';

const CahngePassword = () => {
    const { t } = useTranslation("login");
    return (
    <section className='flex items-center justify-between gap-4 !bg-white'>
            <img src="/images/loginIMG.png" className='lg:flex hidden h-screen' alt="Login image" />
            <div className="px-8 mx-auto lg:mt-0 mt-10">
                <h1 className="text-[#1E1B1B] text-[30px] font-bold text-center">{t('forgetPassword')}</h1>
                <p className="text-[#7D7D7D] text-[17px] text-center">{t('newPassword')}</p>

                <div className="relative">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="md:w-[404px] w-[300px] h-[57px] border border-[#E2E2E2] rounded-[12px] mt-[18px] px-4 pt-4"
                        placeholder="******************************"
                    />
                    <h2 className="text-[#000000] text-[15px] absolute top-5 right-4">{t('password')}</h2>
                    <div className="absolute top-9 left-5">
                        <Password />
                    </div>
                </div>

                <div className="relative">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="md:w-[404px] w-[300px] h-[57px] border border-[#E2E2E2] rounded-[12px] mt-[18px] px-4 pt-4"
                        placeholder="******************************"
                    />
                    <h2 className="text-[#000000] text-[15px] absolute top-5 right-4">{t('confirmPassword')}</h2>
                    <div className="absolute top-9 left-5">
                        <Password />
                    </div>
                </div>
                <Link to='/login' className="flex items-center justify-center mt-[17px]">
                    <DashboardButton title={t('saveAndEnter')} />
                </Link>

            </div>
        </section>
    )
}

export default CahngePassword
