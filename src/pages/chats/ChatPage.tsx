import ChatHeader from '@/components/chats/ChatHeader'
import ChatTable from '@/components/chats/ChatTable'
import TablePagination from '@/components/general/dashboard/table/TablePagination'
import React from 'react'

const ChatPage = () => {
    return (
        <div>
            <ChatHeader />
            <div className="px-2 md:px-8">
                <ChatTable />
                <TablePagination
                    currentPage={0}
                    setCurrentPage={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    totalPages={0}
                    totalItems={0}
                    itemsPerPage={0}
                />
            </div>
        </div>
    )
}

export default ChatPage
