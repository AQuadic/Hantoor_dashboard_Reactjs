import AddAgent from "./AddAgent"; 
import { useState } from "react";

const AddAgentWrapper = () => {
    const [selectedFilter, setSelectedFilter] = useState("Add maintenance centers");

    return (
        <AddAgent
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        />
    );
};

export default AddAgentWrapper;
