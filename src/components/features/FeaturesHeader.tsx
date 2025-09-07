import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import ChangeLanguage from "../general/ChangeLanguage";

const FeaturesHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <ChangeLanguage />
      <Link to="/features/add">
        <DashboardButton
          titleAr={"اضافة مميزات جديدة"}
          titleEn="Add new features"
          variant="add"
        />
      </Link>
    </div>
  );
};

export default FeaturesHeader;
