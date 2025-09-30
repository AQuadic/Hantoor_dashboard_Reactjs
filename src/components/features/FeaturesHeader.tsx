import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import { useHasPermission } from "@/hooks/usePermissions";

const FeaturesHeader = () => {
  const canCreate = useHasPermission("create_app_feature");
  return (
    <div className="flex justify-end">
      {canCreate && (
        <Link to="/features/add">
          <DashboardButton
            titleAr={"اضافة مميزات جديدة"}
            titleEn="Add new features"
            variant="add"
          />
        </Link>
      )}
    </div>
  );
};

export default FeaturesHeader;
