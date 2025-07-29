import InsuranceHeader from '@/components/setting/InsuranceHeader'
import InsuranceTable from '@/components/setting/InsuranceTable'
import React from 'react'

const InsurancePage = () => {
    return (
        <div className='px-2 md:px-8'>
            <InsuranceHeader />
            <InsuranceTable />
        </div>
    )
}

export default InsurancePage
