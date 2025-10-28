import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";
import View from "../icons/general/View";
import FaqDetails from "@/pages/faqs/FaqDetails";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useHasPermission } from "@/hooks/usePermissions";
import { FAQ } from "@/api/faq/getFaq";
import { deleteFAQ } from "@/api/faq/deleteFaq";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { updateFaq } from "@/api/faq/editFaq";
import { useQuery } from "@tanstack/react-query";
import { Country, getCountries } from "@/api/countries/getCountry";

interface FAQsTableProps {
  data?: FAQ[];
  isLoading?: boolean;
  refetch: () => void;
  from?: number;
  to?: number;
}

const FAQsTable = ({ data, isLoading = false, refetch }: FAQsTableProps) => {
  const { t, i18n } = useTranslation("questions");
  const canEdit = useHasPermission("edit_faq");
  const canChangeStatus = useHasPermission("change-status_faq");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const canDelete = useHasPermission("delete_faq");

  const handleDelete = async (id: number) => {
    await deleteFAQ(id);
    toast.success(t("faqDeleted"));
    refetch();
  };
  const handleToggleSwitch = async (faq: FAQ) => {
    try {
      await updateFaq(faq.id.toString(), {
        country_id: faq.country_id?.toString(),
        type: faq.type,
        question: faq.question,
        answer: faq.answer,
        is_active: faq.is_active ? 0 : 1,
      });
      toast.success(t("statusUpdated"));
      refetch();
    } catch (err: unknown) {
      const getMessageFromError = (e: unknown): string | undefined => {
        if (!e || typeof e !== "object") return undefined;
        const maybe = e as { response?: { data?: { message?: string } } };
        return maybe.response?.data?.message;
      };
      const message = getMessageFromError(err) || t("somethingWentWrong");
      toast.error(message);
    }
  };

  const { data: countriesData } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(1, ""),
  });

  const countries: Country[] = countriesData?.data ?? [];

  const getCountryName = (id?: number | null) => {
    if (!id) return "-";
    const country = countries.find((c) => c.id === id);
    if (!country) return "-";
    return i18n.language === "ar" ? country.name.ar : country.name.en;
  };

  const formatDateTime = (dateString?: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString(i18n.language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  if (isLoading) return <Loading />;
  if (!data || data.length === 0) return <NoData />;

  return (
    <div className="">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">{t("question")}</TableHead>
              <TableHead className="text-right">{t("country")}</TableHead>
              <TableHead className="text-right">{t("NOUses")}</TableHead>
              <TableHead className="text-right">
                {t("NONotBenefited")}
              </TableHead>
              <TableHead className="text-right">{t("dateAndTime")}</TableHead>
              {(canChangeStatus || canEdit) && (
                <TableHead className="text-right">{t("status")}</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((faq: FAQ) => (
              <TableRow key={faq.id} noBackgroundColumns={1}>
                <TableCell>{faq.id}</TableCell>
                <TableCell>
                  {i18n.language === "ar" ? faq.question.ar : faq.question.en}
                </TableCell>
                <TableCell>{getCountryName(faq.country_id)}</TableCell>
                <TableCell>{faq.useful_uses_count}</TableCell>
                <TableCell>{faq.unuseful_uses_count}</TableCell>
                <TableCell className="w-full">
                  {formatDateTime(faq.created_at)}
                </TableCell>
                {(canChangeStatus || canEdit) && (
                  <TableCell
                    className="flex gap-[7px] items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {canChangeStatus && (
                      <Switch
                        isSelected={!!faq.is_active}
                        onChange={() => handleToggleSwitch(faq)}
                      />
                    )}

                    <button onClick={() => setOpenFaqId(faq.id)}>
                      <View />
                    </button>
                    {canEdit && (
                      <Link to={`/faq/edit/${faq.id}`}>
                        <Edit />
                      </Link>
                    )}
                  {canDelete && (
                    <div className="mt-2">
                      <TableDeleteButton
                        handleDelete={() => handleDelete(faq.id)}
                      />
                    </div>
                  )}
                  </TableCell>
                )}
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
