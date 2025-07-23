import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardDatePicker from '@/components/general/dashboard/DashboardDatePicker';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import SearchBar from '@/components/general/dashboard/SearchBar';
import React from 'react';

const DashboardUsers = () => {
    return (
        <section>
            <DashboardHeader
                title="المستخدمين"
                items={[
                    { title: 'لوحة التحكم', link: '/' },
                    { title: 'المستخدمين' }
                ]}
            />

            <div className='flex items-center gap-2 mt-2.5'>
                <div className='flex-1'>
                    <SearchBar
                        term={''}
                        setTerm={() => {
                        }}
                    />
                </div>
                <div className='flex-1'>
                    <DashboardDatePicker />
                </div>
                <DashboardButton title={'إضافة مستخدم جديد'} variant="add" />
            </div>
        </section>
    );
};

export default DashboardUsers;
