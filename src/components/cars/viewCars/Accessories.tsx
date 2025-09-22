import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@heroui/react";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import { Accessory } from "@/api/vehicles/getVehicleById";
import { deleteAccessories } from "@/api/vehicles/accessories/deleteAccessories";
import { updateAccessory } from "@/api/vehicles/accessories/updateAccessories";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import NoData from "@/components/general/NoData";
import TableImagePlaceholder from "@/components/general/TableImagePlaceholder";

interface AccessoriesProps {
  accessories: Accessory[];
  refetch: () => void;
}

const Accessories = ({ accessories, refetch }: AccessoriesProps) => {
  const { t, i18n } = useTranslation("cars");

  const [localAccessories, setLocalAccessories] = useState<Accessory[]>(accessories);

  useEffect(() => {
    setLocalAccessories(accessories);
  }, [accessories]);

  const handleDelete = async (id: number) => {
    try {
      await deleteAccessories(id);
      toast.success(t("accessoriesDeleted"));
      refetch();
    } catch {
      toast.error(t("somethingWentWrong"));
    }
  };

  const handleToggleActive = async (accessory: Accessory) => {
    try {
      const updated = await updateAccessory(accessory.id, {
        name: accessory.name,
        price: String(accessory.price),
        is_active: !accessory.is_active,
      });

      setLocalAccessories((prev) =>
        prev.map((a) => (a.id === accessory.id ? { ...a, is_active: updated.is_active } : a))
      );

      toast.success(
        updated.is_active ? t("vehicleStatusUpdated") : t("vehicleStatusUpdated")
      );

      refetch();
    } catch (error) {
      console.error(error);
      toast.error(t("somethingWentWrong"));
    }
  };

  if (!localAccessories || localAccessories.length === 0) {
    return <NoData />;
  }

  return (
    <section className="md:mx-8 mx-0">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">{t('image')}</TableHead>
              <TableHead className="text-right">{t('name')}</TableHead>
              <TableHead className="text-right">{t('price')}</TableHead>
              <TableHead className="text-right">{t('status')}</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localAccessories.map((accessory, index) => (
              <TableRow key={accessory.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {accessory.image?.url ? (
                    <img
                      src={accessory.image.url}
                      alt={accessory.name.ar || accessory.name.en || "accessory"}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <TableImagePlaceholder />
                  )}
                </TableCell>
                <TableCell>
                  {t(accessory.name[i18n.language as "ar" | "en"] || accessory.name.en || accessory.name.ar || "-")}
                </TableCell>
                <TableCell className="w-full">{accessory.price}</TableCell>
                <TableCell className="flex items-center gap-[7px]">
                  <Switch
                    isSelected={accessory.is_active}
                    onValueChange={() => handleToggleActive(accessory)}
                  />
                  <div className="mt-2">
                    <TableDeleteButton handleDelete={() => handleDelete(accessory.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Accessories;