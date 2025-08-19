import React, { useEffect, useState } from "react";
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
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Switch } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { getFeatures, Feature } from "@/api/featuresApp/getFeatures";
import { editFeature } from "@/api/featuresApp/editFeatures";
import Loading from "../general/Loading";
import toast from "react-hot-toast";
import { deleteFeature } from "@/api/featuresApp/deleteFeature";
import { useTranslation } from "react-i18next";

const FeaturesTable = () => {
  const { t, i18n } = useTranslation("setting");
  const {
    data: features = [],
    isLoading,
    refetch,
  } = useQuery<Feature[]>({
    queryKey: ["features"],
    queryFn: getFeatures,
  });

  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [localFeatures, setLocalFeatures] = useState<Feature[] | undefined>(
    features
  );

  useEffect(() => {
    setLocalFeatures(features);
  }, [features]);

  const handleDelete = async (id: number) => {
    await deleteFeature(id);
    toast.success(t("faetureDeletedSuccessfully"));
    refetch();
  };

  const getErrorMessage = (err: unknown) => {
    if (!err) return t("somethingWentWrong");
    try {
      const e = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      return e.response?.data?.message || e.message || t("somethingWentWrong");
    } catch {
      return t("somethingWentWrong");
    }
  };

  const handleToggle = async (feature: Feature) => {
    setUpdatingId(feature.id);
    // optimistic update
    setLocalFeatures((prev) =>
      prev?.map((f) =>
        f.id === feature.id ? { ...f, is_active: !f.is_active } : f
      )
    );
    try {
      await editFeature(feature.id, {
        description: feature.description,
        // send numeric 0/1 instead of boolean
        is_active: feature.is_active ? 0 : 1,
      });
      toast.success(t("statusUpdated") || "Status updated");
      refetch();
    } catch (err: unknown) {
      // revert on error
      setLocalFeatures((prev) =>
        prev?.map((f) =>
          f.id === feature.id ? { ...f, is_active: feature.is_active } : f
        )
      );
      toast.error(getErrorMessage(err));
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) return <Loading />;

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
        {(localFeatures && localFeatures.length > 0 ? localFeatures : features)
          .length > 0 ? (
          (localFeatures ?? features).map((feature, index) => (
            <TableRow key={feature.id} noBackgroundColumns={1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {(() => {
                  // feature may contain nested image object or top-level url/responsive_urls
                  const top = feature as unknown as Record<string, unknown>;
                  const topUrl =
                    typeof top["url"] === "string"
                      ? (top["url"] as string)
                      : undefined;
                  const topResponsive = Array.isArray(top["responsive_urls"])
                    ? (top["responsive_urls"] as string[])[0]
                    : undefined;
                  const rawUrl =
                    feature.image?.url ||
                    topUrl ||
                    feature.image?.responsive_urls?.[0] ||
                    topResponsive;
                  if (rawUrl) {
                    const url = String(rawUrl).replace(/([^:]\/)\/+/, "$1/");
                    return (
                      <img
                        src={url}
                        alt="feature"
                        className="w-[52.36px] h-[51px] rounded-[7px] object-cover"
                      />
                    );
                  }
                  return <span className="text-gray-400">No Image</span>;
                })()}
              </TableCell>
              <TableCell>
                {feature.description[i18n.language as "ar" | "en"]}
              </TableCell>
              <TableCell className="flex gap-[7px] items-center">
                <Switch
                  isSelected={
                    localFeatures?.find((f) => f.id === feature.id)
                      ?.is_active ?? feature.is_active
                  }
                  isDisabled={updatingId === feature.id}
                  onChange={() => handleToggle(feature)}
                />
                <Link to={`/features/edit/${feature.id}`}>
                  <Edit />
                </Link>
                <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(feature.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500">
              لا توجد ميزات متاحة
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default FeaturesTable;
