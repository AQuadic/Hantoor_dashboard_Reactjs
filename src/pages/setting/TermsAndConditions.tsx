import TermsHeader from '@/components/termsandconditions/TermsHeader'
import TermsTable from '@/components/termsandconditions/TermsTable'
import React from 'react'

const TermsAndConditions = () => {
    return (
        <div className='md:px-8 px-2'>
            <TermsHeader />
            <TermsTable />
        </div>
    )
}

export default TermsAndConditions
