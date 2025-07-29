import { Link } from "react-router"
import DashboardButton from "../general/dashboard/DashboardButton"

const FeaturesHeader = () => {
    return (
        <div className="flex justify-end">
            <Link to="/features/add" >
                <DashboardButton title={"اضافة مميزات جديدة"} variant="add" />
            </Link>
        </div>
    )
}

export default FeaturesHeader
