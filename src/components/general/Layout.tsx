import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import React, { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./LayoutHeader";
import { useScrollRestoration } from "./useScrollRestoration";

const Layout = () => {
  const location = useLocation();
  const isLoginOrRelatedPage =
    location.pathname === "/login" ||
    location.pathname === "/forget-password" ||
    location.pathname === "/verification-code" ||
    location.pathname === "/change-password";

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useScrollRestoration(scrollContainerRef, {
    storageKeyPrefix: "app-scroll",
  });

  return (
    <div className="flex min-h-screen">
      {/* Global Toaster for notifications */}
      <Toaster position="top-right" />
      {!isLoginOrRelatedPage && <DashboardSidebar />}
      <div
        ref={(el) => {
          scrollContainerRef.current = el;
        }}
        className="relative flex-1 overflow-y-auto pb-8"
      >
        {!isLoginOrRelatedPage && <DashboardHeader />}
        {/* Animation container with relative positioning */}
        <div className="relative min-h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 w-full min-h-full"
            >
              <Outlet />
              {!isLoginOrRelatedPage && <div className="pb-8" />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Layout;
