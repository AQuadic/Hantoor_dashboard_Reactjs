import { useTranslation } from "react-i18next";
import Email from "../icons/login/Email";
import Password from "../icons/login/Password";
import { Link } from "react-router";
import {Checkbox} from "@heroui/react";
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
    const { t } = useTranslation("login");
    return (
        <section className='flex items-center justify-between container gap-4'>
            <img src="/images/loginIMG.png" className='lg:flex hidden h-screen' alt="Login image" />
            <div className="px-8 mx-auto lg:mt-0 mt-10">
                <h1 className="text-[#1E1B1B] text-[30px] font-bold text-center">{t('welcome')}</h1>
                <p className="text-[#7D7D7D] text-[17px] text-center">{t('loginTo')}</p>
                <div className="relative">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="md:w-[404px] w-[300px] h-[57px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
                        placeholder="username@mail.com"
                    />
                    <h2 className="text-[#000000] text-[15px] absolute top-5 right-4">{t('email')}</h2>
                    <div className="absolute top-9 left-5">
                        <Email />
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
                    <h2 className="text-[#000000] text-[15px] absolute top-5 right-4">{t('password')}</h2>
                    <div className="absolute top-9 left-5">
                        <Password />
                    </div>
                </div>

                <div className="mt-4 flex items-center">
                    <Checkbox defaultSelected size="md"></Checkbox>
                    <p className="text-[#2A32F8] text-[14px] font-normal">{t('rememberMe')}</p>
                </div>

                <div className="mt-4 flex items-center justify-center">
                    <ReCAPTCHA
                        sitekey="YOUR_RECAPTCHA_SITE_KEY"
                    />
                </div>

                <div className="text-center">
                    <button className="w-[214px] h-11 bg-[#2A32F8] rounded-[9.2px] mt-[17px] text-[#FFFFFF] text-lg font-bold">{t('enter')}</button>
                </div>
                
                <div className="mt-3 text-center">
                    <Link to='/' className="text-[#000000] text-[19px] font-normal">{t('forgetPassword')}</Link>
                </div>
            </div>
        </section>
    )
}

export default Login
