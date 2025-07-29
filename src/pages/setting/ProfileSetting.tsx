import ProfileHeader from '@/components/setting/profile/ProfileHeader'
import ProfileTable from '@/components/setting/profile/ProfileTable'
import React from 'react'

const ProfileSetting = () => {
    return (
        <div className='px-2 md:px-8'>
            <ProfileHeader />
            <ProfileTable />
        </div>
    )
}

export default ProfileSetting
