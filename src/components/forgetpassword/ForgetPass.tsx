import React, { useState } from 'react'
import Email from '../icons/login/Email'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import DashboardButton from '../general/dashboard/DashboardButton';
import toast from 'react-hot-toast';
import { forgotPassword, ForgotPasswordRequest } from '@/api/password/forgetPassword';

const ForgetPass = () => {
  const { t } = useTranslation("login");
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('EG');
  const [resetType, setResetType] = useState<'whatsapp_send' | 'whatsapp_receive' | 'mail_url' | 'mail_otp' | 'sms'>('mail_otp');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email && !phone) {
      toast.error("Please enter email or phone");
      return;
    }

    const data: ForgotPasswordRequest = {
      email: email || undefined,
      phone: phone || undefined,
      phone_country: phoneCountry,
      reset_type: resetType,
    };

    setLoading(true);
    try {
      await forgotPassword(data);
      toast.success(t('resetPasswordSent'));
      navigate('/verification-code');
    } catch (error: any) {
      toast.error(error.message || "Failed to send password reset");
    } finally {
      setLoading(false);
    }
  };

    return (
        <section className='flex md:flex-row flex-col items-center justify-between gap-4 !bg-white'>
                <div className="md:w-1/2 w-full md:h-screen bg-[#F4F4FE] flex items-center justify-center">
                    <img src="/images/login/loginLogo.gif" alt="logo" />
                </div>
                <div className="px-8 mx-auto lg:mt-0 mt-10">
                <h1 className="text-[#1E1B1B] text-[30px] font-bold text-center">{t('forgetPassword')}</h1>
                <p className="text-[#7D7D7D] text-[17px] text-center mt-[7px]">{t('enterEmail')}</p>
                <div className="relative">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="md:w-[404px] w-full h-[57px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
                        placeholder="username@mail.com"
                    />
                    <h2 className="text-[#000000] text-[15px] absolute top-5 right-4">{t('email')}</h2>
                    <div className="absolute top-9 left-5">
                        <Email />
                    </div>
                </div>

                <div className="text-center mt-[17px]">
                <DashboardButton titleAr="التالي" titleEn='Next' onClick={handleSubmit} />
            </div>
            </div>
        </section>
    )
}

export default ForgetPass
