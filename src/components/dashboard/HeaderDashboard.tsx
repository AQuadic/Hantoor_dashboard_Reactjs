import React from 'react'
import { useTranslation } from 'react-i18next';

const HeaderDashboard = () => {
    const { t } = useTranslation("header");
    return (
        <div className="pt-2 pb-2 px-8 bg-white ">
            <p className='text-[#7A808A] text-sm font-normal'>{t('dashboard')}</p>
        </div>
    )
}

export default HeaderDashboard
