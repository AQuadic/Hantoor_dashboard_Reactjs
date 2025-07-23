import React from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "./DashboardSidebar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
