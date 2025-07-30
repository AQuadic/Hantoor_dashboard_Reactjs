import AddCarsHeader from '@/components/cars/addcars/AddCarsHeader'
import CarDetails from '@/components/cars/addcars/CarDetails'
import PhotosAndVideos from '@/components/cars/addcars/PhotosAndVideos'
import React from 'react'

const AddCars = () => {
    return (
        <div>
            <AddCarsHeader />
            <div className='md:px-8 px-2'>
                <PhotosAndVideos />
                <CarDetails />
            </div>
        </div>
    )
}

export default AddCars
