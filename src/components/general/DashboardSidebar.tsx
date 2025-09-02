import { SidebarLinks } from "@/constants/SidebarLinks";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const DashboardSidebar = () => {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false); // Desktop collapse state
  const [isOpen, setIsOpen] = useState(false);
  const mobileSidebarRef = useRef<HTMLDivElement | null>(null);
  const { i18n } = useTranslation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const currentLang = i18n.language;

  type SidebarLink = {
    path: string;
    linkAr: string;
    linkEn: string;
    icons: React.ComponentType;
    activeIcon?: React.ComponentType;
  };
  const getLinkLabel = (link: SidebarLink) => {
    return currentLang === "ar" ? link.linkAr : link.linkEn;
  };
  const toggleDesktopSidebar = () => setIsDesktopCollapsed(!isDesktopCollapsed);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove common auth keys from both storages
    const keys = [
      "token",
      "accessToken",
      "refreshToken",
      "user",
      "userData",
      "auth",
      "authToken",
    ];
    keys.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {
        void 0;
      }
      try {
        sessionStorage.removeItem(k);
      } catch {
        void 0;
      }
    });
    // As a fallback, remove any possible persisted auth state prefixes
    try {
      Object.keys(localStorage).forEach((k) => {
        if (
          k.toLowerCase().includes("auth") ||
          k.toLowerCase().includes("token") ||
          k.toLowerCase().includes("user")
        ) {
          localStorage.removeItem(k);
        }
      });
    } catch {
      void 0;
    }

    // Remove cookie-based tokens (used by axios.ts)
    try {
      Cookies.remove("hantoor_token");
      Cookies.remove("hantoorToken");
      Cookies.remove("hantoor-token");
    } catch {
      void 0;
    }

    navigate("/login");
  };

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <section className="relative h-screen border-1 ltr:border-l rtl:border-r bg-white flex flex-col">
      {/* Desktop Logo and Toggle Button - Made sticky */}
      <div
        className={`hidden lg:flex items-center bg-[#F4F4FE] h-16 sticky top-0 z-10 ${
          isDesktopCollapsed
            ? "justify-center px-2 py-1.5"
            : "justify-between px-6 py-1.5"
        }`}
      >
        <AnimatePresence mode="wait">
          {!isDesktopCollapsed && (
            <motion.img
              className="flex items-center justify-center mx-auto h-full"
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              src="/images/hantoorLogo.gif"
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
                d="M15 19l-7-7 7-7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
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
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-[120] lg:hidden"
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
            />
            {/* Sidebar */}
            <motion.div
              ref={mobileSidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 bg-white lg:w-[288px] w-4/5 max-w-xs h-full p-4 shadow-lg lg:hidden z-[130] overflow-y-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* Mobile Logo and Close Button */}
              <div className="flex items-center justify-between h-16 mb-2">
                <motion.img
                  className="h-10"
                  key="mobile-logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  src="/images/dashboard/dashboardLogo.svg"
                  alt="logo"
                />
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
                  {link.linkEn === "Logout" ? (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className={`flex items-center gap-4 mt-6 px-2 py-2 rounded-md text-gray-600 w-full text-left`}
                    >
                      {link.icons && <link.icons />}
                      <h1 className="text-sm font-normal">
                        {getLinkLabel(link)}
                      </h1>
                    </button>
                  ) : (
                    <NavLink
                      to={link.path}
                      end={link.path === "/dashboard"}
                      className={({ isActive }) =>
                        `flex items-center gap-4 mt-6 px-2 py-2 rounded-md ${
                          isActive ? "bg-[#2A32F8] text-white" : "text-gray-600"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
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
                  )}
                </motion.div>
              ))}
            </motion.div>
          </>
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
          {SidebarLinks.map((link, index) =>
            link.linkEn === "Logout" ? (
              <div
                key={index}
                className={`block mt-4 rounded-md ${
                  isDesktopCollapsed
                    ? "px-0 py-2 flex justify-center"
                    : "px-8"
                }`}
                title={isDesktopCollapsed ? getLinkLabel(link) : ""}
              >
                <button
                  onClick={handleLogout}
                  className={`w-full text-left ${
                    isDesktopCollapsed
                      ? "flex justify-center"
                      : "flex items-center gap-[5px]"
                  } text-[#606060] px-0 py-2 rounded-md hover:bg-blue-100`}
                >
                  <div className="flex-shrink-0">
                    {link.icons && <link.icons />}
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
                </button>
              </div>
            ) : (
              <NavLink
                to={link.path}
                end={link.path === "/dashboard"}
                key={index}
                className={({ isActive }) =>
                  `block mt-4 rounded-md ${
                    isActive
                      ? "bg-[#2A32F8] text-white mx-4"
                      : "hover:bg-blue-100 text-[#606060] mx-4"
                  } ${
                    isDesktopCollapsed
                      ? "px-0 py-2 flex justify-center"
                      : "px-4 py-2"
                  }`
                }
                title={isDesktopCollapsed ? getLinkLabel(link) : ""}
              >
                {({ isActive }) => (
                  <div
                    className={`flex items-center ${
                      isDesktopCollapsed ? "justify-center" : "gap-[5px]"
                    }`}
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
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSidebar;
