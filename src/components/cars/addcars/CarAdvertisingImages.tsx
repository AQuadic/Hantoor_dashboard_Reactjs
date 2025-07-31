import ImageInput from "@/components/general/ImageInput";
import React from "react";

const CarAdvertisingImages = ( ) => {
     const [profileImage, setProfileImage] = React.useState<File | null>(null);
 
  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] ">
      <h1 className="text-lg text-[#2A32F8] font-bold mb-4">الصور الاعلانية في اخر الصفحة</h1>
        <ImageInput image={profileImage} setImage={setProfileImage} placeholderText="اضافة GIF"   width={378}
            height={169}/>
    
    </div>
  );
};

export default CarAdvertisingImages;
