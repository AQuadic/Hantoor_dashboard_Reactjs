import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Component that initializes the auth store on app startup
 * This ensures the auth state is restored from cookies/localStorage
 */
const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // Initialize auth state from cookies/localStorage on app startup
    initialize();
  }, [initialize]);

  return <>{children}</>;
};

export default AuthInitializer;
