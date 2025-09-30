import React, { useState } from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Edit from "../icons/general/Edit";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useHasPermission } from "@/hooks/usePermissions";
import { Feature } from "@/api/featuresApp/getFeatures";
import { editFeature } from "@/api/featuresApp/editFeatures";
import toast from "react-hot-toast";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { deleteFeature } from "@/api/featuresApp/deleteFeature";

interface Props {
  features: Feature[];
  refetch: () => void;
}

const FeaturesTable: React.FC<Props> = ({ features, refetch }) => {
  const { t, i18n } = useTranslation("setting");
  const canEdit = useHasPermission("edit_app_feature");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    await deleteFeature(id);
    toast.success(t("faetureDeletedSuccessfully"));
    refetch();
  };

  const handleToggle = async (feature: Feature) => {
    setUpdatingId(feature.id);
    const prevState = feature.is_active;
    try {
      // optimistic update
      feature.is_active = feature.is_active ? 0 : 1;
      await editFeature(feature.id, {
        description: feature.description,
        is_active: feature.is_active,
      });
      toast.success(t("statusUpdated") || "Status updated");
      refetch();
    } catch (err) {
      feature.is_active = prevState;
      toast.error(t("somethingWentWrong"));
    } finally {
      setUpdatingId(null);
    }
  };

  if (!features || features.length === 0) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              لا توجد ميزات متاحة
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("image")}</TableHead>
          <TableHead className="text-right w-full">{t("text")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map((feature, index) => (
          <TableRow key={feature.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {feature.image?.url ? (
                <img
                  src={feature.image.url}
                  alt="feature"
                  className="w-[52.36px] h-[51px] rounded-[7px] object-cover"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </TableCell>
            <TableCell>
              {feature.description[i18n.language as "ar" | "en"]}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch
                isSelected={
                  feature.is_active === 1 || feature.is_active === true
                }
                isDisabled={updatingId === feature.id}
                onChange={() => handleToggle(feature)}
              />
              {canEdit && (
                <Link to={`/features/edit/${feature.id}`}>
                  <Edit />
                </Link>
              )}
              <div className="mt-2">
                <TableDeleteButton
                  handleDelete={() => handleDelete(feature.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FeaturesTable;
