import React from 'react'
import { useTranslation } from 'react-i18next';
// import Password from '../icons/login/Password';
import DashboardButton from '../general/dashboard/DashboardButton';
import { Link } from 'react-router';
import PasswordInput from '../general/PasswordInput';

const CahngePassword = () => {
    const { t } = useTranslation("login");
    return (
    <section className="flex md:flex-row flex-col items-center justify-between gap-4 !bg-white">
        <div className="md:w-1/2 w-full md:h-screen bg-[#F4F4FE] flex items-center justify-center">
            <img src="/images/login/loginLogo.gif" alt="logo" />
        </div>
            <div className="px-8 mx-auto lg:mt-0 mt-10">
                <h1 className="text-[#1E1B1B] text-[30px] font-bold text-center">{t('forgetPassword')}</h1>
                <p className="text-[#7D7D7D] text-[17px] text-center">{t('newPassword')}</p>

                <div className="relative md:w-[404px] mt-[18px]">
                    <PasswordInput 
                        label={'كلمة المرور'} 
                        value={''} 
                        setValue={() => {}}
                    />
                </div>

                <div className="relative md:w-[404px] mt-4">
                    <PasswordInput 
                        label={'تأكيد كلمة المرور'} 
                        value={''} 
                        setValue={() => {}}
                    />
                </div>
                <Link to='/login' className="flex items-center justify-center mt-[17px]">
                    <DashboardButton titleAr={('حفظ ودخول' )} titleEn={('Save and enter')} />
                </Link>

            </div>
        </section>
    )
}

export default CahngePassword
