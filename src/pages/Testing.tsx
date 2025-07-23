import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import React from "react";

const Testing = () => {
  return (
    <div className=" h-screen">
      <DashboardHeader
        title="Testing Dashboard"
        items={[
          { title: "Home", link: "/" },
          { title: "Music", link: "/music" },
          { title: "Artist", link: "/artist" },
          { title: "Album", link: "/album" },
          { title: "Song", link: "/song" },
        ]}
      />
    </div>
  );
};

export default Testing;
