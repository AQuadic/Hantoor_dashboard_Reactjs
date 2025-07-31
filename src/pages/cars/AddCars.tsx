import AddCarsHeader from "@/components/cars/addcars/AddCarsHeader";
import CarDetails from "@/components/cars/addcars/CarDetails";
import PhotosAndVideos from "@/components/cars/addcars/PhotosAndVideos";
import React from "react";
import CarPrices from "@/components/cars/addcars/CarPrices";
import CarPackages from "@/components/cars/addcars/CarPackages";
import CarAccessories from "@/components/cars/addcars/CarAccessories";
import CarOffers from "@/components/cars/addcars/CarOffers";
import RentToOwn from "@/components/cars/addcars/RentToOwn";
import CarAdvertisingImages from "@/components/cars/addcars/CarAdvertisingImages";
import DashboardButton from "@/components/general/dashboard/DashboardButton";

const AddCars = () => {
    const handleDelete = () => {
  };
  return (
    <div>
      <AddCarsHeader />
      <div className="md:px-8 px-2">
        <PhotosAndVideos />
        <CarDetails />
        <CarPrices />
        <CarPackages />
        <CarAccessories
          handleDelete={handleDelete}
          field={{
            image: null,
            titleEn: "",
            titleAr: "",
            descriptionEn: "",
            descriptionAr: "",
          }}
        />
        <CarOffers 
          handleDelete={handleDelete}
          field={{
            image: null,
            titleEn: "",
            titleAr: "",
            descriptionEn: "",
            descriptionAr: "",
          }}/>
        <RentToOwn />
        <CarAdvertisingImages />
        <div className="mt-6">
          <DashboardButton titleAr="اضافة" titleEn="Add"/>
        </div>
      </div>
    </div>
  );
};

export default AddCars;
