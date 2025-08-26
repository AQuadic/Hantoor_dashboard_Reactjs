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
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { Country, CountriesResponse } from "@/api/countries/getCountry";
import Loading from "../general/Loading";
import { deleteCountry } from "@/api/countries/deleteCountry";
import toast from "react-hot-toast";
import { updateCountry } from "@/api/countries/editCountry";

interface CountriesTableProps {
  countries: Country[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<CountriesResponse, Error>>;
  isLoading?: boolean;
}

const CountriesTable = ({
  countries = [],
  refetch,
  isLoading = false,
}: CountriesTableProps) => {
  const { t, i18n } = useTranslation("country");

  const handleDelete = async (id: number) => {
    await deleteCountry(id);
    toast.success(t("countryDeleted"));
    refetch();
  };

  const handleToggleStatus = async (country: Country) => {
    try {
      await updateCountry(country.id, {
        is_active: !country.is_active,
      });
      toast.success(
        !country.is_active ? t("countryActivated") : t("countryDeactivated")
      );
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(t("somethingWentWrong"));
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("countryName")}</TableHead>
          <TableHead className="text-right">{t("currency")}</TableHead>
          <TableHead className="text-right">{t("NOUsers")}</TableHead>
          <TableHead className="text-right">{t("dateAndTime")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {countries.map((country, index) => {
          return (
            <TableRow key={country.id} noBackgroundColumns={1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {i18n.language === "ar" ? country.name.ar : country.name.en}
              </TableCell>
              <TableCell>
                {i18n.language === "ar"
                  ? country.currency_text?.ar || "-"
                  : country.currency_text?.en || "-"}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>0</TableCell>
              <TableCell className="w-full">
                {new Date(country.created_at).toLocaleString()}
              </TableCell>
              <TableCell className="flex gap-[7px] items-center">
                <Switch
                  isSelected={country.is_active}
                  onChange={() => handleToggleStatus(country)}
                />
                <Link to={`/countries/edit/${country.id}`}>
                  <Edit />
                </Link>

                <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(country.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CountriesTable;