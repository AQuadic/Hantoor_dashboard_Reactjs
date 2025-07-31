import NotificationsHeader from '@/components/notifactions/NotificationsHeader'
import NotificationTable from '@/components/notifactions/NotificationTable'
import React from 'react'

const NotificationPage = () => {
    return (
        <div>
            <NotificationsHeader />
            <div className='md:px-8 px-2'>
                <NotificationTable />
            </div>
        </div>
    )
}

export default NotificationPage
