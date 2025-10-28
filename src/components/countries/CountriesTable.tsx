import { Link } from "react-router";
import { useState, useEffect } from "react";
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
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { Country, CountriesResponse } from "@/api/countries/getCountry";
import Loading from "../general/Loading";
import { deleteCountry } from "@/api/countries/deleteCountry";
import toast from "react-hot-toast";
import { updateCountry } from "@/api/countries/editCountry";
import NoData from "../general/NoData";

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
  const canEdit = useHasPermission("edit_country");
  const canChangeStatus = useHasPermission("change-status_country");
  const canDelete = useHasPermission("delete_country");

  const [localCountries, setLocalCountries] = useState(countries);

  useEffect(() => {
    setLocalCountries(countries);
  }, [countries]);

  const handleDelete = async (id: number) => {
    await deleteCountry(id);
    toast.success(t("countryDeleted"));
    refetch();
  };

  const handleToggleStatus = async (country: Country) => {
    // Optimistic update
    const updatedCountries = localCountries.map((c) =>
      c.id === country.id ? { ...c, is_active: !c.is_active } : c
    );
    setLocalCountries(updatedCountries);

    try {
      const newState = !country.is_active;
      await updateCountry(country.id, {
        is_active: newState,
      });
      toast.success(newState ? t("countryActivated") : t("countryDeactivated"));
      // refetch(); // optional
    } catch (error) {
      console.error(error);
      toast.error(t("somethingWentWrong"));
      // Revert
      setLocalCountries(countries);
    }
  };

  if (isLoading) return <Loading />;
  if (localCountries.length === 0) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("countryName")}</TableHead>
          <TableHead className="text-right">{t("currency")}</TableHead>
          <TableHead className="text-right">{t("NOUsers")}</TableHead>
          <TableHead className="text-right">{t("dateAndTime")}</TableHead>
          {(canChangeStatus || canEdit || canDelete) && (
            <TableHead className="text-right">{t("status")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {localCountries.map((country) => {
          return (
            <TableRow key={country.id} noBackgroundColumns={1}>
              <TableCell>{country.id}</TableCell>
              <TableCell>
                {i18n.language === "ar" ? country.name.ar : country.name.en}
              </TableCell>
              <TableCell>
                {i18n.language === "ar"
                  ? country.currency_text?.ar || "-"
                  : country.currency_text?.en || "-"}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {country.users_count}
              </TableCell>
              <TableCell className="w-full">
                {new Date(country.created_at).toLocaleString(
                  i18n.language === "ar" ? "ar-EG" : "en-GB",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  }
                )}
              </TableCell>
              {(canChangeStatus || canEdit) && (
                <TableCell className="flex gap-[7px] items-center">
                  {canChangeStatus && (
                    <Switch
                      isSelected={country.is_active}
                      onChange={() => handleToggleStatus(country)}
                    />
                  )}
                  {canEdit && (
                    <Link to={`/countries/edit/${country.id}`}>
                      <Edit />
                    </Link>
                  )}

                  {canDelete && (
                    <div className="mt-2">
                      <TableDeleteButton
                        handleDelete={() => handleDelete(country.id)}
                      />
                    </div>
                  )}
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CountriesTable;
