import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Country, getCountries } from "@/api/countries/getCountry";
import Loading from "../general/Loading";

const CountriesTable = () => {
    const { t, i18n } = useTranslation("country");

  const { data: countries = [], isLoading } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  if (isLoading) return <Loading />;

    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t('countryName')}</TableHead>
            <TableHead className="text-right">{t('currency')}</TableHead>
            <TableHead className="text-right">{t("NOUsers")}</TableHead>
            <TableHead className="text-right">{t('dateAndTime')}</TableHead>
            <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {countries.map((country, index) => (
            <TableRow key={country.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                    {i18n.language === "ar" ? country.name.ar : country.name.en}
                </TableCell>
                    <TableCell>
                    {i18n.language === "ar" ? country.currency?.ar || "-" : country.currency?.en || "-"}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                0
                </TableCell>
                <TableCell className="w-full">
                {new Date(country.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Switch isSelected={!country.is_active} />
                <Link to={`/countries/edit/${country.id}`}>
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

export default CountriesTable
