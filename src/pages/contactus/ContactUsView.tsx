import { useTranslation } from 'react-i18next';

const ContactUsView = () => {
    const { t } = useTranslation("header");
    return (
        <section className='py-[13px] bg-white h-screen'>
            <h1 className='text-[#071739] text-[23px] font-bold text-center'>{t('notes')}</h1>
            <hr className='my-4'/>
            <div className='px-8'>
                <h2 className='text-[#2A32F8] text-[19px] font-bold'>{t('clientData')}</h2>
                <p className='text-[#071739] text-[19px] font-normal mt-3'>ابراهيم محمود</p>
                <p className='text-[#606C7E] text-[15px] font-normal mt-2 rtl:text-right' dir='ltr'>+966 123456 789</p>
            </div>
            <hr className='my-4'/>
            <div className='px-8'>
                <h2 className='text-[#2A32F8] text-[19px] font-bold'>{t('notes')}</h2>
                <p className='text-[#071739] text-[19px] font-normal mt-3'>
                    لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي تستخدم بشكل شائع لتوضيح الشكل المرئي للمستند أو الخط دون الاعتماد على محتوى ذي معنى. يمكن استخدام لوريم إيبسوم قبل نشر النسخة النهائية
                </p>
            </div>
        </section>
    )
}

export default ContactUsView
