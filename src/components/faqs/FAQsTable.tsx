import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Switch } from "@heroui/react";
import View from "../icons/general/View";
import FaqDetails from "@/pages/faqs/FaqDetails";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { FAQ } from "@/api/faq/getFaq";
import { deleteFAQ } from "@/api/faq/deleteFaq";
import toast from "react-hot-toast";
import NoData from "../general/NoData";

interface FAQsTableProps {
  data: FAQ[];
  from?: number;
  refetch: () => void;
}

const FAQsTable = ({ data, from = 1, refetch }: FAQsTableProps) => {
  const { t, i18n } = useTranslation("questions");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
    await deleteFAQ(id);
    toast.success(t("faqDeleted"));
    refetch();
  };

  if (!data || data.length === 0) return <NoData />

  return (
    <div className="">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">{t('question')}</TableHead>
              <TableHead className="text-right">{t('country')}</TableHead>
              <TableHead className="text-right">{t("NOUses")}</TableHead>
              <TableHead className="text-right">{t("NONotBenefited")}</TableHead>
              <TableHead className="text-right">{t("dateAndTime")}</TableHead>
              <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((faq: FAQ, index: number) => (
              <TableRow key={faq.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{i18n.language === "ar" ? faq.question.ar : faq.question.en}</TableCell>
                <TableCell>{faq.country_id || "-"}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell className="w-full">{new Date(faq.created_at).toLocaleString()}</TableCell>
                <TableCell
                  className="flex gap-[7px] items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Switch />
                  <button onClick={() => setOpenFaqId(faq.id)}>
                    <View />
                  </button>
                  <Link to={`/faq/edit/${faq.id}`}>
                    <Edit />
                  </Link>
                  <div className="mt-2">
                    <TableDeleteButton handleDelete={() => handleDelete(faq.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AnimatePresence>
        {openFaqId !== null && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenFaqId(null)}
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
              <FaqDetails faqId={openFaqId} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQsTable;