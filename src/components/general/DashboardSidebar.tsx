import { SidebarLinks } from "@/constants/SidebarLinks";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DashboardSidebar = () => {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false); // Desktop collapse state
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const currentLang = i18n.language;

  const getLinkLabel = (link: any) => {
    return currentLang === "ar" ? link.linkAr : link.linkEn;
  };
  const toggleDesktopSidebar = () => setIsDesktopCollapsed(!isDesktopCollapsed);

  return (
    <section className="relative h-screen border-1 ltr:border-l rtl:border-r bg-white flex flex-col">
      {/* Desktop Logo and Toggle Button - Made sticky */}
      <div
        className={`hidden lg:flex items-center bg-[#F4F4FE] sticky top-0 z-10 ${isDesktopCollapsed ? "justify-center px-2 py-1.5" : "justify-between px-6 py-1.5"}`}
      >
        <AnimatePresence mode="wait">
          {!isDesktopCollapsed && (
            <motion.img
              className="flex items-center justify-center"
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              src="/images/dashboard/dashboardLogo.svg"
              alt="logo"
            />
          )}
        </AnimatePresence>
        <button
          onClick={toggleDesktopSidebar}
          className="p-1 rounded-md hover:bg-gray-200 transition-colors flex-shrink-0"
        >
          <motion.svg
            key={isDesktopCollapsed ? "collapsed" : "expanded"}
            initial={{ rotate: 0 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isDesktopCollapsed ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            )}
          </motion.svg>
        </button>
      </div>

      {/* Mobile menu toggle */}
      <div className="block px-4 pt-4 lg:hidden">
        <button onClick={toggleSidebar}>
          {isOpen ? (
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-50 bg-white lg:w-[288px] h-full p-4 shadow-lg lg:hidden "
          >
            <div className="flex justify-end">
              <button onClick={toggleSidebar}>
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Nav Links */}
            {SidebarLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <NavLink
                  to={link.path}
                  end={link.path === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-4 mt-6 px-2 py-2 rounded-md ${
                      isActive ? "bg-[#2A32F8] text-white" : "text-gray-600"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && link.activeIcon ? (
                        <link.activeIcon />
                      ) : (
                        <link.icons />
                      )}
                      <h1 className="text-sm font-normal">
                        {getLinkLabel(link)}
                      </h1>
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Made scrollable */}
      <div className="hidden lg:block flex-1 overflow-y-auto bg-white">
        <motion.div
          animate={{
            width: isDesktopCollapsed ? "80px" : "288px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="py-4"
          style={{ boxShadow: "10.27px 10.27px 51.33px 0px #64748B0A" }}
        >
          {SidebarLinks.map((link, index) => (
            <NavLink
              to={link.path}
              end={link.path === "/dashboard"}
              key={index}
              className={({ isActive }) =>
                `block mt-4 rounded-md ${
                  isActive
                    ? "bg-[#2A32F8] text-white mx-4"
                    : "hover:bg-blue-100 text-[#606060] mx-4"
                } ${isDesktopCollapsed ? "px-0 py-2 flex justify-center" : "px-4 py-2"}`
              }
              title={isDesktopCollapsed ? getLinkLabel(link) : ""}
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${isDesktopCollapsed ? "justify-center" : "gap-[5px]"}`}
                >
                  <div className="flex-shrink-0">
                    {isActive && link.activeIcon ? (
                      <link.activeIcon />
                    ) : (
                      <link.icons />
                    )}
                  </div>
                  <AnimatePresence mode="wait">
                    {!isDesktopCollapsed && (
                      <motion.h1
                        key="text"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                          width: { duration: 0.3, ease: "easeInOut" },
                          opacity: {
                            duration: 0.2,
                            delay: isDesktopCollapsed ? 0 : 0.1,
                          },
                        }}
                        className="text-[15px] font-normal whitespace-nowrap overflow-hidden"
                      >
                        {getLinkLabel(link)}
                      </motion.h1>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </NavLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSidebar;
