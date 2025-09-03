import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import View from "../icons/general/View";
import ContactUsView from "@/pages/contactus/ContactUsView";
import Email from "../icons/contactus/Email";
import Star from "../icons/contactus/Star";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getSuggestions, SuggestionsResponse } from "@/api/suggestions/getSuggestions";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import NoData from "../general/NoData";
import { deleteSuggestions } from "@/api/suggestions/deleteSuggestion";
import toast from "react-hot-toast";
import Loading from "../general/Loading";

type ContactUsTableProps = {
  page: number;
  perPage: number;
  setTotalPages: (pages: number) => void;
  setPerPage: (perPage: number) => void;
  setTotalItems: (total: number) => void;
};

const ContactUsTable: React.FC<ContactUsTableProps> = ({
  page,
  perPage,
  setTotalPages,
  setPerPage,
  setTotalItems,
}) => {
    const { t } = useTranslation("contactUs");
    const [openMessageId, setOpenMessageId] = useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery<SuggestionsResponse, Error>({
    queryKey: ["suggestions", page, perPage],
    queryFn: () => getSuggestions({ page, per_page: perPage }),
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.meta.last_page);
      setPerPage(data.meta.per_page);
      setTotalItems(data.meta.total);
    }
  }, [data, setTotalPages, setPerPage, setTotalItems]);

  if (isLoading) return <Loading />;

  const suggestions = data?.data || [];

  if (suggestions.length === 0) return <NoData />;

    const handleDelete = async (id: number) => {
        await deleteSuggestions(id);
        toast.success(t("suggestionDeleted"));
        refetch();
    };

    return (
        <div className="">
        <div className="w-full">
            <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t("clientName")}</TableHead>
            <TableHead className="text-right">{t("phoneNumber")}</TableHead>
            <TableHead className="text-right">{t("email")}</TableHead>
            <TableHead className="text-right">{t("country")}</TableHead>
            <TableHead className="text-right"></TableHead>

            </TableRow>
        </TableHeader>
            <TableBody>
                {suggestions.map((message, index) => (
                <TableRow key={message.id} noBackgroundColumns={1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.phone}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.city}</TableCell>
                    <TableCell className="flex items-center gap-2">
                    <div
                        className="flex gap-[7px] items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-center gap-[10px] w-[160px] h-[37px] bg-[#1E1B1B] rounded-[8.15px]">
                        <Email />
                        <button className=" text-[#FFFFFF] font-bold text-sm">
                            {t("replayViaEmail")}
                        </button>
                        </div>
                    </div>
                
                    <button onClick={() => setOpenMessageId(message.id)}>
                        <View />
                    </button>
                    <Star />
                    <div className="mt-2">
                        <TableDeleteButton handleDelete={() => handleDelete(message.id)} />
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
                <ContactUsView id={openMessageId} />
                </motion.div>
            </>
            )}
        </AnimatePresence>
        </div>
    );
};

export default ContactUsTable;
