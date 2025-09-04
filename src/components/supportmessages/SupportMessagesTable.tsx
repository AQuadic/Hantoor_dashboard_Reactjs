import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import View from "../icons/general/View";
import SupportMsgsConversation from "@/pages/supportmessages/SupportMsgsConversation";
import { useTranslation } from "react-i18next";
import { getSupportConversations, Conversation, SupportConversationsResponse } from "@/api/support/getConversations";
import { useState } from "react";
import Loading from "../general/Loading";
import NoData from "../general/NoData";

interface SupportMessagesTableProps {
  page: number;
  itemsPerPage: number;
}

const SupportMessagesTable = ({ page, itemsPerPage }: SupportMessagesTableProps) => {
    const { t } = useTranslation("questions");
    const [openMessageId, setOpenMessageId] = useState<number | null>(null);

  const { data, isLoading } = useQuery<SupportConversationsResponse, Error>({
    queryKey: ["supportConversations", page, itemsPerPage],
    queryFn: () => getSupportConversations({ page, per_page: itemsPerPage }),
  });

  if (isLoading) return <Loading />
  const supportMessages: Conversation[] = data?.data || [];
  if (!supportMessages.length) return <NoData />;

    return (
        <div className="relative flex">
        <div className="w-full">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="text-right">#</TableHead>
                <TableHead className="text-right">{t('supportNumber')}</TableHead>
                <TableHead className="text-right">{t('country')}</TableHead>
                <TableHead className="text-right">{t('question')}</TableHead>
                <TableHead className="text-right">{t('username')}</TableHead>
                <TableHead className="text-right">{t('phoneNumber')}</TableHead>
                <TableHead className="text-right">{t('supportStatus')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {supportMessages.map((message, index) => (
                <TableRow key={message.id} noBackgroundColumns={1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{message.id}</TableCell>
                    <TableCell>{message.country_id || "-"}</TableCell>
                    <TableCell>{message.title}</TableCell>
                    <TableCell>{message.name}</TableCell>
                    <TableCell className="w-full">
                        <div dir="ltr">
                            {message.phone}
                        </div>
                    </TableCell>
                    <TableCell
                    className="flex gap-[7px] items-center"
                    onClick={(e) => e.stopPropagation()}
                    >
                    <div className="flex items-center gap-[10px]">
                        <button className="w-[78px] h-[37px] bg-[#2A32F8] rounded-[8.15px] text-[#FFFFFF] font-bold text-[13px]">
                            {t('working')}
                        </button>
                        <button className="w-[78px] h-[37px] bg-[#FFFFFF] rounded-[8.15px] text-[#A1A1A1] font-normal text-[13px]">
                            {t('done')}
                        </button>
                        <input
                        type="text"
                        name="notes"
                        id="notes"
                        value={message.notes}
                        className="w-[195px] h-[37px] bg-[#FFFFFF] border border-[#D8D8D8] rounded-[10px] focus:outline-none px-3 placeholder:text-[13px]"
                        placeholder={t('yourNotes')}
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
