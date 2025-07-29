import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import View from "../icons/general/View";
import SupportMsgsConversation from "@/pages/supportmessages/SupportMsgsConversation";

const SupportMessagesTable = () => {
    const [openMessageId, setOpenMessageId] = useState<number | null>(null);

    const supportMessages = [
        {
            id: 1,
            number: "6881066",
            country: "الامارات",
            question: "صعوبة في التواصل مع الوكلاء أو المعارض",
            name: "مصطفي محمد",
            phone: "+966 123456 789"
        },
        {
            id: 2,
            number: "6881066",
            country: "مصر",
            question: "صعوبة في التواصل مع الوكلاء أو المعارض",
            name: "مصطفي محمد",
            phone: "+966 123456 789"
        },
        {
            id: 3,
            number: "6881066",
            country: "الامارات",
            question: "صعوبة في التواصل مع الوكلاء أو المعارض",
            name: "مصطفي محمد",
            phone: "+966 123456 789"
        },
    ];
    return (
        <div className="relative flex">
        <div className="w-full">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="text-right">#</TableHead>
                <TableHead className="text-right">رقم الدعم</TableHead>
                <TableHead className="text-right">البلد</TableHead>
                <TableHead className="text-right">السؤال</TableHead>
                <TableHead className="text-right">اسم المستخدم</TableHead>
                <TableHead className="text-right">رقم الجوال</TableHead>
                <TableHead className="text-right">حالة الدعم</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {supportMessages.map((message, index) => (
                <TableRow key={message.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{message.number}</TableCell>
                    <TableCell>{message.country}</TableCell>
                    <TableCell>{message.question}</TableCell>
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.phone}</TableCell>
                    <TableCell
                    className="flex gap-[7px] items-center"
                    onClick={(e) => e.stopPropagation()}
                    >
                    <div className="flex items-center gap-[10px]">
                        <button className="w-[78px] h-[37px] bg-[#2A32F8] rounded-[8.15px] text-[#FFFFFF] font-bold text-[13px]">
                        جاري العمل
                        </button>
                        <button className="w-[78px] h-[37px] bg-[#FFFFFF] rounded-[8.15px] text-[#A1A1A1] font-normal text-[13px]">
                        تم الانتهاء
                        </button>
                        <input
                        type="text"
                        name="notes"
                        id="notes"
                        className="w-[195px] h-[37px] bg-[#FFFFFF] border border-[#D8D8D8] rounded-[10px] focus:outline-none px-3 placeholder:text-[13px]"
                        placeholder="ملاحظاتك"
                        />
                    </div>

                    <button onClick={() => setOpenMessageId(message.id)}>
                        <View />
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
            {openMessageId !== null && (
            <>
                <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpenMessageId(null)}
                className="fixed inset-0 bg-black z-40"
                />

                <motion.div
                key="sidebar"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 h-full md:w-[493px] w-[300px] bg-white shadow-lg z-50 overflow-y-auto"
                >
                <SupportMsgsConversation />
                </motion.div>
            </>
            )}
        </AnimatePresence>
        </div>
    );
};

export default SupportMessagesTable
