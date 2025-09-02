import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { deleteFAQ } from "@/api/faq/deleteFaq";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { FAQ } from "@/api/faq/getFaq";

interface TechnicalSupportTableProps {
  data: FAQ[];
  from: number;
  isLoading: boolean;
  refetch: () => void;
}

const TechnicalSupportTable: React.FC<TechnicalSupportTableProps> = ({
  data,
  from,
  isLoading,
  refetch,
}) => {
  const { t } = useTranslation("questions");

  if (isLoading) return <Loading />;
  if (!data.length) return <NoData />;

  const handleDelete = async (id: number) => {
    await deleteFAQ(id);
    toast.success(t("faqDeleted"));
    refetch();
  };

    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t('question')}</TableHead>
            <TableHead className="text-right">{t('country')}</TableHead>
            <TableHead className="text-right">{t('NOMessages')}</TableHead>
            <TableHead className="text-right">{t("dateAndTime")}</TableHead>
            <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((question, index) => (
            <TableRow key={question.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{question.question.ar}</TableCell>
                <TableCell>{question.country_id ?? "-"}</TableCell>
                <TableCell>{0}</TableCell>
                <TableCell className="w-full">{new Date(question.created_at).toLocaleString()}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Switch />
                <Link to={`/technical-support/edit/${question.id}`}>
                    <Edit />
                </Link>

                <div className="mt-2">
                <TableDeleteButton handleDelete={() => handleDelete(question.id)} />
                </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
  }

export default TechnicalSupportTable
