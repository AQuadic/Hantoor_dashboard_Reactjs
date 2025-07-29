import InsuranceHeader from '@/components/setting/insuranceprice/InsuranceHeader'
import InsuranceTable from '@/components/setting/insuranceprice/InsuranceTable'
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
