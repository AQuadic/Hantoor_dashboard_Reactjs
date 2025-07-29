import { SidebarLinks } from "@/constants/SidebarLinks";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const currentLang = i18n.language;

  const getLinkLabel = (link: any) => {
    return currentLang === "ar" ? link.linkAr : link.linkEn;
  };

  return (
    <section className="relative h-screen overflow-auto border-1 ltr:border-l rtl:border-r">
      <img
        src="/images/dashboard/dashboardLogo.svg"
        alt="logo"
        className="hidden p-6 bg-[#F4F4FE] lg:flex"
      />

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
            className="fixed top-0 right-0 z-50 bg-white lg:w-[288px] h-full p-4 shadow-lg lg:hidden"
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
              <NavLink
                to={link.path}
                end={link.path === "/dashboard"}
                key={index}
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
                    <h1 className="text-sm font-normal">{getLinkLabel(link)}</h1>
                  </>
                )}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div
        className="hidden lg:block bg-white w-[288px] py-4 border-l border-[#E1E1E1]"
        style={{ boxShadow: "10.27px 10.27px 51.33px 0px #64748B0A" }}
      >
        {SidebarLinks.map((link, index) => (
          <NavLink
            to={link.path}
            end={link.path === "/dashboard"}
            key={index}
            className={({ isActive }) =>
              `block mt-4 px-4 py-2 rounded-md ${
                isActive
                  ? "bg-[#2A32F8] text-white mx-4"
                  : "hover:bg-blue-100 text-[#606060] mx-4"
              }`
            }
          >
            {({ isActive }) => (
              <div className="flex items-center gap-[5px]">
                {isActive && link.activeIcon ? (
                  <link.activeIcon />
                ) : (
                  <link.icons />
                )}
                <h1 className="text-[15px] font-normal">{getLinkLabel(link)}</h1>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default DashboardSidebar;
