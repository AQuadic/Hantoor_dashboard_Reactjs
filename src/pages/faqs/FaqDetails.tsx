import React from 'react'
import { useTranslation } from 'react-i18next';

const FaqDetails = () => {
    const { t } = useTranslation("questions");
    return (
        <div className='py-[13px] container'>
            <h2 className='text-[#2A32F8] text-[23px] font-bold text-center'>{t('questionDetails')}</h2>
            <hr className='my-4'/>
            <div className='mx-8'>
                <h3 className='text-[#2A32F8] text-[19px] font-bold'>{t('question')}</h3>
                <p className='text-[#1E1B1B] text-[19px] mt-[14px]'>{t('questionOne')}</p>
            </div>
            <hr className='my-4'/>
            <div className='mx-8'>
                <h3 className='text-[#2A32F8] text-[19px] font-bold'>{t('answer')}</h3>
                <p className='text-[#1E1B1B] text-[19px] mt-[14px]'>{t('answerOne')}</p>
            </div>
        </div>
    )
}

export default FaqDetails
