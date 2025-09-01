import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import Edit from "@/components/icons/general/Edit";
import { useTranslation } from "react-i18next";
import { Switch } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import {getRequestFinancing } from "@/api/financing/fetchFinancing";
import { getCountries, Country } from "@/api/countries/getCountry";
import Loading from "@/components/general/Loading";
import NoData from "@/components/general/NoData";
import { deleteFinancing } from "@/api/financing/deleteFinancing";
import toast from "react-hot-toast";

const InsuranceTable = () => {
  const { t, i18n } = useTranslation("setting");

const { data: financingItems = [], isLoading: financingLoading, refetch } = useQuery({
  queryKey: ["request-financing"],
  queryFn: () => getRequestFinancing(undefined, false),
});


  const { data: countriesData, isLoading: countriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(1, ""),
  });

  const countries: Country[] = countriesData?.data ?? [];

  const getCountryName = (id: number) => {
    const country = countries.find((c) => c.id === id);
    if (!country) return "-";
    return i18n.language === "ar" ? country.name.ar : country.name.en;
  };

  const handleDelete = async (id: number) => {
      await deleteFinancing(id);
      toast.success(t("deletedSuccessfully"));
      refetch();
    };

  if (financingLoading || countriesLoading) {
    return <Loading />;
  }

  if (!financingItems.length) {
    return <NoData />;
  }

    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t('whatsappNumber')}</TableHead>
            <TableHead className="text-right">{t('country')}</TableHead>
            <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {financingItems.map((item, index) => (
            <TableRow key={item.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell dir="ltr">{item.phone}</TableCell>
                <TableCell className="w-full">{getCountryName(item.country_id)}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Switch defaultSelected={!!item.is_active} />
                <Link to={`/setting/edit-whatsapp/${item.id}`}>
                    <Edit />
                </Link>
                <div className="mt-2">
                <TableDeleteButton handleDelete={() => handleDelete(item.id)} />
                </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}

export default InsuranceTable
