import { HeroUIProvider } from "@heroui/react";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </HeroUIProvider>
  );
};

export default Providers;
