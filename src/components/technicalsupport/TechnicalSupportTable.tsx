import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getFAQs, FAQ, FAQsResponse } from "@/api/faq/getFaq";
import Loading from "../general/Loading";
import NoData from "../general/NoData";

const TechnicalSupportTable = () => {
  const { t } = useTranslation("questions");

    const { data, isLoading, isError } = useQuery<FAQsResponse, Error>({
    queryKey: ["technicalSupportFAQs"],
    queryFn: () => getFAQs({ type: "Technical Support Questions" }),
    });

  if (isLoading) return <Loading />;
  if (isError || !data?.data.length) return <NoData />;

  const technicalSupportFAQs: FAQ[] = data.data;

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
            {technicalSupportFAQs.map((question, index) => (
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
                <TableDeleteButton handleDelete={() => {}} />
                </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}

export default TechnicalSupportTable
