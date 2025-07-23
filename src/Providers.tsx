import { HeroUIProvider } from "@heroui/react";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <div>
      <HeroUIProvider>{children}</HeroUIProvider>
    </div>
  );
};

export default Providers;
