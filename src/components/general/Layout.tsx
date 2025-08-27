import { Toaster } from "react-hot-toast";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./LayoutHeader";
import { useScrollRestoration } from "./useScrollRestoration";
import AnimatedOutlet from "./AnimatedOutlet";

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
          <AnimatedOutlet />
          {!isLoginOrRelatedPage && <div className="pb-8" />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
