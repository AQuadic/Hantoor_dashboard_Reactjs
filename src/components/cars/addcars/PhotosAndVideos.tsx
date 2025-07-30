import ImageInput from '@/components/general/ImageInput';
import React from 'react';

const PhotosAndVideos = () => {
    const [profileImage, setProfileImage] = React.useState<File | null>(null);

    return (
        <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
            <h1 className="text-lg text-[#2A32F8] font-bold mb-2">الصور والفيديوهات</h1>
            <div className='flex md:flex-row flex-col gap-4'>
                <ImageInput image={profileImage} setImage={setProfileImage} width={555} height={231} />
            <div className='flex md:flex-col flex-row gap-[11px]'>
                <ImageInput image={profileImage} setImage={setProfileImage} height={110}/>
                <ImageInput image={profileImage} setImage={setProfileImage} height={110}/>
            </div>
            </div>
        </div>
    );
};

export default PhotosAndVideos;
