import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import View from "../icons/general/View";
import ContactUsView from "@/pages/contactus/ContactUsView";
import Email from "../icons/contactus/Email";
import Star from "../icons/contactus/Star";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {
  getSuggestions,
  SuggestionsResponse,
} from "@/api/suggestions/getSuggestions";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import NoData from "../general/NoData";
import { deleteSuggestions } from "@/api/suggestions/deleteSuggestion";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import { updateSuggestion } from "@/api/suggestions/getSuggestionsById";
import { DateFilterParams } from "@/hooks/useDatePicker";

type ContactUsTableProps = {
  page: number;
  perPage: number;
  search: string;
  dateParams: DateFilterParams;
  setTotalPages: (pages: number) => void;
  setPerPage: (perPage: number) => void;
  setTotalItems: (total: number) => void;
};

const ContactUsTable: React.FC<ContactUsTableProps> = ({
  page,
  perPage,
  search,
  dateParams,
  setTotalPages,
  setPerPage,
  setTotalItems,
}) => {
  const { t } = useTranslation("contactUs");
  const [openMessageId, setOpenMessageId] = useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery<SuggestionsResponse, Error>({
    queryKey: ["suggestions", page, perPage, search, dateParams],
    queryFn: () =>
      getSuggestions({ page, per_page: perPage, search, ...dateParams }),
  });

  // track ids that are currently being toggled to prevent duplicate presses
  const [togglingIds, setTogglingIds] = useState<number[]>([]);

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

  const handleToggleStar = async (id: number, current: boolean) => {
    if (togglingIds.includes(id)) return; // already toggling

    setTogglingIds((s) => [...s, id]);
    try {
      await updateSuggestion(id, { is_starred: !current });
      toast.success(current ? t("removedFromStarred") : t("addedToStarred"));
      refetch();
    } catch {
      toast.error(t("error"));
    } finally {
      setTogglingIds((s) => s.filter((i) => i !== id));
    }
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
                <TableCell dir="ltr">{message.phone}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.city}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <div
                    className="flex gap-[7px] items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={`mailto:${message.email}`}
                      className="flex items-center justify-center gap-[10px] w-[160px] h-[37px] bg-[#1E1B1B] rounded-[8.15px]"
                    >
                      <Email />
                      <span className="text-[#FFFFFF] font-bold text-sm">
                        {t("replayViaEmail")}
                      </span>
                    </a>
                  </div>

                  <button onClick={() => setOpenMessageId(message.id)}>
                    <View />
                  </button>
                  <button
                    onClick={() =>
                      handleToggleStar(message.id, !!message.is_starred)
                    }
                    disabled={togglingIds.includes(message.id)}
                    aria-busy={togglingIds.includes(message.id)}
                    className={
                      togglingIds.includes(message.id)
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }
                  >
                    <Star
                      className={
                        message.is_starred ? "text-yellow-400" : "text-gray-400"
                      }
                    />
                  </button>

                  <div className="mt-2">
                    <TableDeleteButton
                      handleDelete={() => handleDelete(message.id)}
                    />
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
