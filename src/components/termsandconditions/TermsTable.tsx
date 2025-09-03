import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Edit from "../icons/general/Edit";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getPages, Page } from "@/api/pages/getPages";
import { getCountries, Country } from "@/api/countries/getCountry";

const TermsTable = () => {
  const { t, i18n } = useTranslation("setting");
  const lang: "ar" | "en" = i18n.language === "ar" ? "ar" : "en";

  const { data: pagesData, isLoading: isPagesLoading, isError: isPagesError } = useQuery({
    queryKey: ["pages"],
    queryFn: () => getPages({ per_page: 50 }),
  });

  const { data: countriesData } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
  });

  const pages: Page[] = pagesData?.data || [];
  const countries: Country[] = countriesData?.data || [];

  if (isPagesLoading) return <div>{t("loading")}</div>;
  if (isPagesError) return <div>{t("errorLoading")}</div>;

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
      return desc;
    }

    return "";
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
            {pages.map((page, index) => (
            <TableRow key={page.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{page.title?.[lang] || page.title?.en}</TableCell>
                <TableCell>{getCountryName(page.country_id)}</TableCell>
                <TableCell>{parseDescription(page.description?.[lang])}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Link to={`/profile/edit-termsandconditions/${page.id}`}>
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

export default TermsTable
