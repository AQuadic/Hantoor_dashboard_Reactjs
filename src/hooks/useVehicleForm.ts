import { useContext } from "react";
import { VehicleFormContext } from "../contexts/VehicleFormContext";

export const useVehicleForm = () => {
  const context = useContext(VehicleFormContext);
  if (!context) {
    throw new Error("useVehicleForm must be used within a VehicleFormProvider");
  }
  return context;
};
