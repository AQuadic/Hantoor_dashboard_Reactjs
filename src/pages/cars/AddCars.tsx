import AddCarsHeader from "@/components/cars/addcars/AddCarsHeader";
import CarDetails from "@/components/cars/addcars/CarDetails";
import PhotosAndVideos from "@/components/cars/addcars/PhotosAndVideos";
import React from "react";
import CarPrices from "@/components/cars/addcars/CarPrices";
import CarPackages from "@/components/cars/addcars/CarPackages";
import CarAccessoriess from "@/components/cars/addcars/CarAccessories";

const AddCars = () => {
  return (
    <div>
      <AddCarsHeader />
      <div className="md:px-8 px-2">
        <PhotosAndVideos />
        <CarDetails />
        <CarPrices />
        <CarPackages />
        <CarAccessoriess />
      </div>
    </div>
  );
};

export default AddCars;
