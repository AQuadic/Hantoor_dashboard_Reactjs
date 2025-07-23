import React, { useState } from 'react';
import { SidebarLinks } from '@/constants/SidebarLinks';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom'; 

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <section className="relative">
      <img src="/images/dashboard/dashboardLogo.svg" alt="logo" className="lg:flex hidden py-8 px-8" />

      {/* Mobile menu toggle */}
      <div className="block lg:hidden px-4 pt-4">
        <button onClick={toggleSidebar}>
          {isOpen ? (
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-50 bg-white lg:w-[288px] h-full p-4 shadow-lg lg:hidden"
          >
            <div className="flex justify-end">
              <button onClick={toggleSidebar}>
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Nav Links */}
            {SidebarLinks.map((link, index) => (
              <NavLink
                to={link.path}
                end={link.path === '/dashboard'}
                key={index}
                className={({ isActive }) =>
                  `flex items-center gap-4 mt-6 px-2 py-2 rounded-md ${
                    isActive ? 'bg-[#2A32F8] text-white' : 'text-gray-600'
                  }`
                }
              >
                {({ isActive }) =>
                  <>
                    {isActive && link.activeIcon ? <link.activeIcon /> : <link.icons />}
                    <h1 className="text-sm font-normal">{link.link}</h1>
                  </>
                }
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div
        className="hidden lg:block bg-white w-[288px] py-4 border-l border-[#E1E1E1]"
        style={{ boxShadow: '10.27px 10.27px 51.33px 0px #64748B0A' }}
      >
        {SidebarLinks.map((link, index) => (
          <NavLink
            to={link.path}
            end={link.path === '/dashboard'}
            key={index}
            className={({ isActive }) =>
              `block mt-4 px-4 py-2 rounded-md ${
                isActive ? 'bg-[#2A32F8] text-white mx-4' : 'hover:bg-blue-100 text-[#606060] mx-4'
              }`
            }
          >
            {({ isActive }) => (
              <div className="flex items-center gap-[5px]">
                {isActive && link.activeIcon ? <link.activeIcon /> : <link.icons />}
                <h1 className="text-[15px] font-normal">{link.link}</h1>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default DashboardSidebar;
