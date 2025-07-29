import CarsHeader from '@/components/cars/CarsHeader'
import CarsTable from '@/components/cars/CarsTable'
import React from 'react'

const CarsPage = () => {
    return (
        <div>
            <CarsHeader />
            <div className="px-2 md:px-8">
                <CarsTable />
            </div>
        </div>
    )
}

export default CarsPage
