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
import { Offer } from "@/api/vehicles/getVehicleById";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { deleteOffers } from "@/api/vehicles/offers/deleteOffer";

const Offers = ({ offers }: { offers: Offer[] }) => {
  const { t } = useTranslation("cars");
  const queryClient = useQueryClient();

  const handleDelete = async (id: number) => {
    try {
      await deleteOffers(id);
      toast.success(t("offerDeleted"));
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    } catch {
      toast.error(t("error"));
    }
  };

  return (
    <section className="md:mx-8 mx-0">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right ">#</TableHead>
              <TableHead className="text-right ">الصورة</TableHead>
              <TableHead className="text-right w-[10%]">الاسم</TableHead>
              <TableHead className="text-right w-full">تفاصيل</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id} noBackgroundColumns={1}>
                <TableCell>{offer.id}</TableCell>
                <TableCell>
                  {offer.image?.url ? (
                    <img
                      src={offer.image.url}
                      alt={offer.name.ar || offer.name.en || "offer"}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell>{offer.name.ar || offer.name.en || "-"}</TableCell>
                <TableCell>{offer.description.ar || offer.description.en || "-"}</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Switch isSelected={offer.is_active} />
                  <TableDeleteButton handleDelete={() => handleDelete(offer.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Offers;