import React from 'react'
import { useTranslation } from 'react-i18next';
import { Form, InputOtp } from '@heroui/react';
import { Link } from 'react-router';

const VerficationCode = () => {
    const { t } = useTranslation("login");

    return (
        <section className='flex items-center justify-between  gap-4 !bg-white'>
            <img src="/images/loginIMG.png" className='lg:flex hidden h-screen' alt="Login image" />
            <div className="px-8 mx-auto lg:mt-0 mt-10">
                <h1 className="text-[#1E1B1B] text-[30px] font-bold text-center">{t('forgetPassword')}</h1>
                <p className="text-[#7D7D7D] text-[17px] text-center mt-[7px]">{t('codeSent')}</p>
                <Form
                    className="flex w-full flex-col items-start gap-4 mt-4.5"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    >
                    <InputOtp
                        isRequired
                        aria-label="OTP input field"
                        length={4}
                        name="otp"
                        placeholder="Enter code"
                        classNames={{
                            segmentWrapper: "flex justify-center gap-2",
                            segment: "w-[84px] h-[57px] border rounded text-center rounded-[12px] bg-white border border-[#E2E2E2] shadow-none",
                        }}  
                    />
                </Form>

                <p className='text-[#7D7D7D] text-lg font-normal text-center mt-2'>00:45</p>

                <div className='text-center mt-3 underline'>
                    <Link to='/' className='text-[#2A32F8] text-[19px]'>{t('resend')}</Link>
                </div>
                <div className="text-center">
                    <button className="w-[214px] h-11 bg-[#2A32F8] rounded-[9.2px] mt-[17px] text-[#FFFFFF] text-lg font-bold">{t('next')}</button>
                </div>
            </div>
        </section>
    )
}

export default VerficationCode
