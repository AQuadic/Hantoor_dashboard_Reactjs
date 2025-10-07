import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import TableDeleteButton from "../../general/dashboard/table/TableDeleteButton";
import Edit from "../../icons/general/Edit";
import { useTranslation } from "react-i18next";
import { useHasPermission } from "@/hooks/usePermissions";
import { getOnboardings, OnboardingItem } from "@/api/onboarding/getProfile";
import Loading from "@/components/general/Loading";
import NoData from "@/components/general/NoData";
import { deleteProfile } from "@/api/onboarding/deleteProfile";
import toast from "react-hot-toast";

interface PortableTextChild {
  text: string;
}

interface PortableTextBlock {
  type: string;
  children: PortableTextChild[];
}

const parseDescription = (desc: string) => {
  try {
    const blocks: PortableTextBlock[] = JSON.parse(desc);
    if (!Array.isArray(blocks)) return desc;
    return blocks
      .map((block) => {
        if (block.type === "paragraph" && Array.isArray(block.children)) {
          return block.children.map((child) => child.text).join("");
        }
        return "";
      })
      .join("\n");
  } catch {
    return desc;
  }
};

interface Props {
  countryId?: string;
}

const ProfileTable = ({ countryId }: Props) => {
  const { t, i18n } = useTranslation("setting");
  const canEdit = useHasPermission("edit_profile");

  const {
    data: profiles,
    isLoading,
    refetch,
  } = useQuery<OnboardingItem[]>({
    queryKey: ["onboardings", countryId],
    queryFn: () =>
      getOnboardings({
        pagination: "none",
        country_id: countryId ? Number(countryId) : undefined,
      }),
  });

  if (isLoading) return <Loading />;
  if (!profiles || profiles.length === 0) return <NoData />;

  const handleDelete = async (id: number) => {
    await deleteProfile(id);
    toast.success(t("profileDeleted"));
    refetch();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("image")}</TableHead>
          <TableHead className="text-right">{t("textTitle")}</TableHead>
          <TableHead className="text-right">{t("country")}</TableHead>
          <TableHead className="text-right">{t("description")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profiles.map((profile: OnboardingItem) => (
          <TableRow key={profile.id} noBackgroundColumns={1}>
            <TableCell>{profile.id}</TableCell>
            <TableCell>
              {profile.image ? (
                typeof profile.image === "string" ? (
                  <img
                    src={profile.image}
                    alt={profile.title.en}
                    className="w-[48px] h-[48px] object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={profile.image.url}
                    alt={profile.title.en}
                    className="w-[48px] h-[48px] object-cover rounded-lg"
                  />
                )
              ) : (
                <div className="text-gray-400">No Image</div>
              )}
            </TableCell>
            <TableCell>
              {i18n.language === "ar" ? profile.title.ar : profile.title.en}
            </TableCell>
            <TableCell>
              {profile.country
                ? i18n.language === "ar"
                  ? profile.country.name.ar
                  : profile.country.name.en
                : "--"}
            </TableCell>
            <TableCell className="w-full">
              {i18n.language === "ar"
                ? parseDescription(profile.description.ar)
                : parseDescription(profile.description.en)}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              {canEdit && (
                <Link to={`/profile/edit/${profile.id}`}>
                  <Edit />
                </Link>
              )}

              <div className="mt-2">
                <TableDeleteButton
                  handleDelete={() => handleDelete(profile.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProfileTable;
