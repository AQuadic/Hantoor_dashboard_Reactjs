import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import DashboardButton from '../general/dashboard/DashboardButton';
import toast from 'react-hot-toast';
import { verifyAdmin, VerifyRequest } from '@/api/password/verify';
import { resend, ResendRequest as AdminResendRequest } from '@/api/password/resendcode';
import { resend as resendUser } from '@/api/password/resendcode';

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
  const [phone, setPhone] = useState(locationState?.phone || localStorage.getItem('resetPhone') || '');
  const [phoneCountry] = useState(locationState?.phoneCountry || localStorage.getItem('resetPhoneCountry') || 'EG');

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [resendTimer, setResendTimer] = useState(45);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    inputsRef.current[0]?.focus();

    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 45;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
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
    toast.error(error?.response?.data?.message || error.message || "Verification failed");
  }
};

  const handleResend = async () => {
  const emailToSend = email?.trim();
  const phoneToSend = phone?.trim();

  if (phoneToSend) {
    const data: AdminResendRequest = {
      phone: phoneToSend,
      phone_country: phoneCountry,
      type: "verify",
      email: emailToSend,
    };
    try {
      const response = await resend(data);
      toast.success(response.message || "Verification code resent successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to resend code");
    }
  } else if (emailToSend) {
    type UserResendRequest = {
      email: string;
      type: "verify" | "new";
    };
    const data: UserResendRequest = {
      email: emailToSend,
      type: "verify",
    };
    try {
      const response = await resendUser(data);
      toast.success(response.message || "Verification code resent successfully via email");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to resend code via email");
    }
  } else {
    toast.error("Email or phone is required to resend code");
  }

  setResendDisabled(true);
  let timer = 45;
  const interval = setInterval(() => {
    timer--;
    setResendTimer(timer);
    if (timer <= 0) {
      clearInterval(interval);
      setResendDisabled(false);
      setResendTimer(45);
    }
  }, 1000);
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

                <p className="text-[#7D7D7D] text-center text-lg font-normal mt-2">00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}</p>

                <div className="text-center mt-3 underline">
                  <button
                    disabled={resendDisabled}
                    className={`text-[19px] ${resendDisabled ? 'text-gray-400' : 'text-[#2A32F8]'}`}
                    onClick={handleResend}
                  >
                  {t('resend')}
                  </button>
                </div>

                <div className="mt-[17px] flex items-center justify-center mx-auto">
                  <DashboardButton titleAr={t('next')} titleEn="التالي" onClick={handleVerify} />
                </div>
              </div>
            </section>
    )
}

export default VerificationCode
