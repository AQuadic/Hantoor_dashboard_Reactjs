import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto">
        <DashboardHeader />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="p-4">
              <Outlet />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Layout;
