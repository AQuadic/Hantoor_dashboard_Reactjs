import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import DashboardButton from '../general/dashboard/DashboardButton';
import toast from 'react-hot-toast';
import { verifyAdmin, VerifyRequest } from '@/api/password/verify';

interface LocationState {
  email?: string;
  phone?: string;
  phoneCountry?: string;
}

const VerificationCode = () => {
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;

  const [email] = useState(locationState?.email || localStorage.getItem('resetEmail') || '');
  const [phone] = useState(locationState?.phone || localStorage.getItem('resetPhone') || '');
  const [phoneCountry] = useState(locationState?.phoneCountry || localStorage.getItem('resetPhoneCountry') || 'EG');

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

const handleVerify = async () => {
  const code = otp.join('');
  if (code.length < 4) {
    toast.error("Please enter the complete OTP code");
    return;
  }

  const emailToSend = email?.trim() || undefined;
  const phoneToSend = phone?.trim() || undefined;

  if (!emailToSend && !phoneToSend) {
    toast.error("Email or phone is required");
    return;
  }

  const data: VerifyRequest = {
    code,
    type: "reset",
    email: emailToSend,
    phone: phoneToSend,
    phone_country: phoneToSend ? phoneCountry : undefined,
  };

  try {
    const response = await verifyAdmin(data);

    if (response.reset_token) {
      localStorage.setItem('resetToken', response.reset_token);
    }

    toast.success(response.message || "Verification successful");

    navigate('/change-password');
  } catch (error: any) {
    toast.error(error.message || "Verification failed");
  }
};

    return (
    <section className="flex md:flex-row flex-col items-center justify-between gap-4 !bg-white">
        <div className="md:w-1/2 w-full md:h-screen bg-[#F4F4FE] flex items-center justify-center">
            <img src="/images/login/loginLogo.gif" alt="logo" />
        </div>
            <div className="px-8 mx-auto lg:mt-0 mt-10">
                <h1 className="text-[#1E1B1B] text-[30px] font-bold text-center">{t('forgetPassword')}</h1>
                <p className="text-[#7D7D7D] text-[17px] text-center mt-[7px]">{t('codeSent')}</p>

                <div className="flex justify-center gap-2 mt-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      ref={(el) => (inputsRef.current[index] = el)}
                      onChange={(e) => handleChange(index, e.target.value)}
                      className="md:w-[84px] w-[70px] h-[57px] text-center rounded-[12px] border border-[#E2E2E2] text-xl"
                    />
                  ))}
                </div>

                <p className="text-[#7D7D7D] text-lg font-normal mt-2">00:45</p>

                <div className="text-center mt-3 underline">
                  <a
                    href="#"
                    className="text-[#2A32F8] text-[19px]"
                    onClick={(e) => {
                      e.preventDefault();
                      toast("Resend code clicked");
                    }}
                  >
                    {t('resend')}
                  </a>
                </div>

                <div className="mt-[17px] flex items-center justify-center mx-auto">
                  <DashboardButton titleAr={t('next')} titleEn="التالي" onClick={handleVerify} />
                </div>
              </div>
            </section>
    )
}

export default VerificationCode
