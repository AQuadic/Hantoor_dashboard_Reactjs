import AddCarsHeader from "@/components/cars/addcars/AddCarsHeader";
import CarDetails from "@/components/cars/addcars/CarDetails";
import PhotosAndVideos from "@/components/cars/addcars/PhotosAndVideos";
import React from "react";
import CarPrices from "@/components/cars/addcars/CarPrices";
import CarPackages from "@/components/cars/addcars/CarPackages";
import CarAccessories from "@/components/cars/addcars/CarAccessories";
import CarOffers from "@/components/cars/addcars/CarOffers";

const AddCars = () => {
  return (
    <div>
      <AddCarsHeader />
      <div className="md:px-8 px-2">
        <PhotosAndVideos />
        <CarDetails />
        <CarPrices />
        <CarPackages />
        <CarAccessories />
        <CarOffers />
      </div>
    </div>
  );
};

export default AddCars;
