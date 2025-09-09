import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Edit from "../icons/general/Edit";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Page } from "@/api/pages/getPages";
import { getCountries, Country } from "@/api/countries/getCountry";
import { deletePage } from "@/api/pages/deletePage";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import NoData from "../general/NoData";

interface TermsTableProps {
  data: Page[];
  from: number;
  isLoading: boolean;
  refetch: () => void;
}

const TermsTable = ({ data, isLoading, refetch }: TermsTableProps) => {
  const { t, i18n } = useTranslation("setting");
  const lang: "ar" | "en" = i18n.language === "ar" ? "ar" : "en";

  const { data: countriesData } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
  });

  const countries: Country[] = countriesData?.data || [];

  if (isLoading) return <Loading />;
  if (!data || data.length === 0) return <NoData />;

  const getCountryName = (id?: number) => {
    const country = countries.find((c) => c.id === id);
    return country ? country.name[lang] : "-";
  };

  const parseDescription = (desc?: string) => {
    if (!desc) return "";

    try {
      const blocks = JSON.parse(desc);
      if (Array.isArray(blocks)) {
        return blocks
          .map((block: any) =>
            block.children?.map((child: any) => child.text).join("") || ""
          )
          .join("\n");
      }
    } catch {
      return desc.replace(/<[^>]+>/g, "").trim();
    }

    return "";
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };


  const handleDelete = async (id: number) => {
    await deletePage(id);
    toast.success(t("pageDeleted"));
    refetch();
  };

  return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t('textTitle')}</TableHead>
            <TableHead className="text-right">{t('country')}</TableHead>
            <TableHead className="text-right">{t('description')}</TableHead>
            <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((page, index) => (
            <TableRow key={page.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{page.title?.[lang] || page.title?.en}</TableCell>
                <TableCell>{getCountryName(page.country_id)}</TableCell>
                <TableCell>
                  {truncateText(parseDescription(page.description?.[lang]), 100)}
                </TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Link to={`/profile/edit-termsandconditions/${page.id}`}>
                    <Edit />
                </Link>

                <div className="mt-2">
                <TableDeleteButton handleDelete={() => handleDelete(page.id)} />
                </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}

export default TermsTable
