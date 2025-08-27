import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * AnimatedOutlet component that properly handles exit animations for page transitions.
 *
 * This component solves the common issue where AnimatePresence exit animations
 * don't work properly with React Router's Outlet component. The issue occurs because
 * Outlet wraps route elements with a Provider component, causing AnimatePresence
 * to only be aware of the Provider instead of the actual page components.
 *
 * By using useOutlet hook, we can manually render the route components as direct
 * children of AnimatePresence with unique keys, allowing proper exit animations.
 *
 * The component automatically wraps each page with motion.div to ensure animations
 * work consistently across all pages without requiring individual page modifications.
 */
const AnimatedOutlet: React.FC = () => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="wait">
      {element && (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full min-h-full"
        >
          {React.cloneElement(element)}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
