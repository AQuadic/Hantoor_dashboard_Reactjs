import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PermissionProvider } from "@/contexts/PermissionContext";
import AuthInitializer from "@/components/auth/AuthInitializer";

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer>
          <PermissionProvider autoFetch={true}>{children}</PermissionProvider>
        </AuthInitializer>
      </QueryClientProvider>
    </HeroUIProvider>
  );
};

export default Providers;
