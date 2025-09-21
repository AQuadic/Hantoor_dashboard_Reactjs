import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PermissionProvider } from "@/contexts/PermissionContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <PermissionProvider autoFetch={true}>{children}</PermissionProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
};

export default Providers;
