import { Link } from "react-router";
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
import { useTranslation } from "react-i18next";
import { useHasPermission } from "@/hooks/usePermissions";
import { deleteFAQ } from "@/api/faq/deleteFaq";
import { updateFaq } from "@/api/faq/editFaq";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { FAQ } from "@/api/faq/getFaq";

interface TechnicalSupportTableProps {
  data: FAQ[];
  from?: number;
  isLoading: boolean;
  refetch: () => void;
}

const TechnicalSupportTable: React.FC<TechnicalSupportTableProps> = (props) => {
  const { data, isLoading, refetch } = props;
  const { t, i18n } = useTranslation("questions");

  const canEdit = useHasPermission("edit_support_question");
  const canChangeStatus = useHasPermission("change-status_support_question");
  const canDelete = useHasPermission("delete_support_question");

  if (isLoading) return <Loading />;
  if (!data.length) return <NoData />;

  const handleDelete = async (id: number) => {
    await deleteFAQ(id);
    toast.success(t("faqDeleted"));
    refetch();
  };

  const handleToggleStatus = async (
    id: number,
    current: boolean | undefined
  ) => {
    try {
      // editFaq expects is_active as number (1 or 0)
      await updateFaq(String(id), { is_active: current ? 0 : 1 });
      toast.success(t("statusChanged") || "Status updated");
      refetch();
    } catch (err) {
      const getErrorMessage = (e: unknown) => {
        if (!e || typeof e !== "object")
          return t("error") || "Something went wrong";
        // try to read common axios response shape
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const maybe = e as any;
        return (
          maybe?.response?.data?.message || t("error") || "Something went wrong"
        );
      };
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("question")}</TableHead>
          <TableHead className="text-right">{t("country")}</TableHead>
          <TableHead className="text-right">{t("NOMessages")}</TableHead>
          <TableHead className="text-right">{t("dateAndTime")}</TableHead>
          {(canChangeStatus || canEdit) && (
            <TableHead className="text-right">{t("status")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((question) => (
          <TableRow key={question.id} noBackgroundColumns={1}>
            <TableCell>{question.id}</TableCell>
            <TableCell>{question.question.ar}</TableCell>
            <TableCell>
              {question.country
                ? question.country.name[i18n.language as "ar" | "en"]
                : "-"}
            </TableCell>
            <TableCell>{0}</TableCell>
            <TableCell className="w-full">
              {new Date(question.created_at).toLocaleString(
                i18n.language === "ar" ? "ar-EG" : "en-US",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              )}
            </TableCell>
            {(canChangeStatus || canEdit) && (
              <TableCell className="flex gap-[7px] items-center">
                {canChangeStatus && (
                  <Switch
                    isSelected={!!question.is_active}
                    onChange={() =>
                      handleToggleStatus(question.id, question.is_active)
                    }
                  />
                )}
                {canEdit && (
                  <Link to={`/technical-support/edit/${question.id}`}>
                    <Edit />
                  </Link>
                )}

                {canDelete && (
                  <div className="mt-2">
                    <TableDeleteButton
                      handleDelete={() => handleDelete(question.id)}
                    />
                  </div>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TechnicalSupportTable;
