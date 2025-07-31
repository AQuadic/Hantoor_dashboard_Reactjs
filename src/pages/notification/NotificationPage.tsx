import TablePagination from '@/components/general/dashboard/table/TablePagination'
import NotificationsHeader from '@/components/notifactions/NotificationsHeader'
import NotificationTable from '@/components/notifactions/NotificationTable'
import React from 'react'

const NotificationPage = () => {
    return (
        <div>
            <NotificationsHeader />
            <div className='md:px-8 px-2'>
                <NotificationTable />
                    <TablePagination
                    currentPage={0}
                    setCurrentPage={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    totalPages={20}
                    totalItems={20}
                    itemsPerPage={5}
                />
            </div>
        </div>
    )
}

export default NotificationPage
