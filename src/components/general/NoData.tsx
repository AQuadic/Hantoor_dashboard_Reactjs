import React from 'react'
import { useTranslation } from 'react-i18next';

const NoData = () => {
    const { t } = useTranslation("header");
    return (
        <section className='container flex flex-col items-center justify-center py-8'>
            <img src='/images/xIcon.png' alt='x icon' className='w-20 h-20' />
            <h2 className='mt-8 text-xl font-bold'>{t('noDataAvailable')}</h2>
        </section>
    )
}

export default NoData
