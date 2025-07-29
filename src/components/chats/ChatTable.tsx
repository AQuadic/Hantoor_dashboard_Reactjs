import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import ActiveStatus from "../icons/general/ActiveStatus";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ChatIcon from "../icons/chats/ChatIcon";
import ConversationPage from "@/pages/chats/ConversationPage";

const ChatTable = () => {
    const [openChatId, setOpenChatId] = useState<number | null>(null);

    const chats = [
    {
        id: 1,
        name: "تويوتا كامري 2025",
        brand: "تويوتا",
        count: 11
    },
    {
        id: 2,
        name: "تويوتا كامري 2025",
        brand: "تويوتا",
        count: 11
    },
    {
        id: 3,
        name: "تويوتا كامري 2025",
        brand: "تويوتا",
        count: 11
    },
    ];
    return (
        <div className="relative flex">
        <div className="w-full">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="text-right">#</TableHead>
                <TableHead className="text-right">اسم السيارة</TableHead>
                <TableHead className="text-right">اسم الماركة</TableHead>
                <TableHead className="text-right">المستخدمين داخل المحادثة</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {chats.map((chat, index) => (
                <TableRow key={chat.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{chat.name}</TableCell>
                    <TableCell>{chat.brand}</TableCell>
                    <TableCell>{chat.count}</TableCell>
                    <TableCell className="flex gap-[7px] items-center">
                    <ActiveStatus />
                    <button onClick={() => setOpenChatId(chat.id)}>
                        <ChatIcon />
                    </button>
                    <div className="mt-2">
                        <TableDeleteButton handleDelete={() => {}} />
                    </div>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>

        <AnimatePresence>
        {openChatId !== null && (
            <>
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpenChatId(null)}
                className="fixed inset-0 bg-black z-40"
            />

            <motion.div
                key="sidebar"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 h-full md:w-[493px] w-[300px] bg-white shadow-lg z-50 overflow-y-auto"
            >
                <ConversationPage />
            </motion.div>
            </>
        )}
        </AnimatePresence>
        </div>
    );
};

export default ChatTable;
