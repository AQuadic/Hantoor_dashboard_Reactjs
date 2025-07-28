import { useState } from "react";
import EditAgent from "./EditAgent";

const EditAgentWrapper = () => {
    const [selectedFilter, setSelectedFilter] = useState("Add maintenance centers");

    return (
        <EditAgent
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        />
    );
};

export default EditAgentWrapper;
