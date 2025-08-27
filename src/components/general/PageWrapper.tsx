import React from "react";
import { motion } from "framer-motion";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageWrapper component that provides consistent page transition animations.
 *
 * This component should be used to wrap the content of each page to ensure
 * consistent entrance and exit animations throughout the application.
 *
 * The animations are:
 * - Initial: Fade in from bottom with slight y offset
 * - Exit: Fade out to top with slight y offset
 * - Duration: 0.4s with easeInOut timing
 */
const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`absolute inset-0 w-full min-h-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
