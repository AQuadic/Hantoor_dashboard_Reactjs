import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import View from "../icons/general/View";
import ContactUsView from "@/pages/contactus/ContactUsView";
import Email from "../icons/contactus/Email";
import Star from "../icons/contactus/Star";

const ContactUsTable = () => {
    const [openMessageId, setOpenMessageId] = useState<number | null>(null);

    const messages = [
        {
            id: 1,
            name: "مصطفي محمد",
            number: "6881066",
            email: "username@mail.com",
            country: "الامارات",
            phone: "+966 123456 789"
        },
        {
            id: 2,
            name: "مصطفي محمد",
            number: "6881066",
            email: "username@mail.com",
            country: "الامارات",
            phone: "+966 123456 789"
        },
        {
            id: 3,
            name: "مصطفي محمد",
            number: "6881066",
            email: "username@mail.com",
            country: "الامارات",
            phone: "+966 123456 789"
        },
    ];
    return (
        <div className="">
        <div className="w-full">
            <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">اسم العميل</TableHead>
            <TableHead className="text-right">رقم الجوال</TableHead>
            <TableHead className="text-right">البريد الالكتروني</TableHead>
            <TableHead className="text-right">البلد</TableHead>
            <TableHead className="text-right"></TableHead>

            </TableRow>
        </TableHeader>
            <TableBody>
                {messages.map((message, index) => (
                <TableRow key={message.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.phone}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell className="w-full">{message.country}</TableCell>
                    <TableCell className="flex items-center gap-2">
                        <TableCell
                    className="flex gap-[7px] items-center"
                    onClick={(e) => e.stopPropagation()} 
                    >
                    <div className="flex items-center justify-center gap-[10px] w-[160px] h-[37px] bg-[#1E1B1B] rounded-[8.15px]">
                        <Email />
                        <button className=" text-[#FFFFFF] font-bold text-sm">الرد عن طريق البريد</button>
                    </div>
                </TableCell>
                    <button onClick={() => setOpenMessageId(message.id)}>
                        <View />
                    </button>
                        <Star />
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
                <ContactUsView />
                </motion.div>
            </>
            )}
        </AnimatePresence>
        </div>
    );
};

export default ContactUsTable;
