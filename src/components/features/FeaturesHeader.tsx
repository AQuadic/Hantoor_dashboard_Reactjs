import { Link } from "react-router"
import DashboardButton from "../general/dashboard/DashboardButton"

const FeaturesHeader = () => {
    return (
        <div className="flex justify-end">
            <Link to="/features/add" >
                <DashboardButton titleAr={"اضافة مميزات جديدة"} titleEn="Add new features" variant="add" />
            </Link>
        </div>
    )
}

export default FeaturesHeader
