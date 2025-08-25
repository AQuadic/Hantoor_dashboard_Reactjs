import AddCarsHeader from "@/components/cars/addcars/AddCarsHeader";
import CarDetails from "@/components/cars/addcars/CarDetails";
import PhotosAndVideos from "@/components/cars/addcars/PhotosAndVideos";
import React from "react";
import CarPrices from "@/components/cars/addcars/CarPrices";
import CarPackages from "@/components/cars/addcars/CarPackages";
import CarAccessories from "@/components/cars/addcars/CarAccessories";
import CarOffers from "@/components/cars/addcars/CarOffers";
import RentToOwn from "@/components/cars/addcars/RentToOwn";
import CarAdvertisingImages from "@/components/cars/addcars/CarAdvertisingImages";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { VehicleFormProvider } from "@/contexts/VehicleFormContext";
import { useVehicleForm } from "@/hooks/useVehicleForm";
import {
  createVehicle,
  updateVehicle,
  fetchVehicleById,
  type UpdateVehiclePayload,
} from "@/api/vehicles";

const AddCarsForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("cars");
  const queryClient = useQueryClient();
  const vehicleId = params.id;
  const isEdit = Boolean(vehicleId);

  const { formData, getCreatePayload, getUpdatePayload, setFormData } =
    useVehicleForm();

  // Fetch vehicle data for editing
  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: () => fetchVehicleById(Number(vehicleId)),
    enabled: isEdit && !!vehicleId,
  });

  // Load vehicle data into form when editing
  React.useEffect(() => {
    if (vehicle && isEdit) {
      // Helper function to safely extract vehicle name
      const getVehicleNameValue = (
        name: string | { ar: string; en: string }
      ) => {
        if (typeof name === "string") {
          return name;
        } else if (name && typeof name === "object") {
          return name.ar || name.en || "";
        }
        return "";
      };

      setFormData({
        id: vehicle.id,
        nameAr:
          typeof vehicle.name === "object"
            ? vehicle.name.ar || ""
            : getVehicleNameValue(vehicle.name),
        nameEn:
          typeof vehicle.name === "object"
            ? vehicle.name.en || ""
            : getVehicleNameValue(vehicle.name),
        price: vehicle.price,
        is_discount: vehicle.is_discount || false,
        discount_value: vehicle.discount_value || undefined,
        discount_date: vehicle.discount_date || undefined,
        is_include_tax: vehicle.is_include_tax,
        is_Insurance_warranty: vehicle.is_Insurance_warranty,
        is_include_warranty: vehicle.is_include_warranty,
        is_rent_to_own: vehicle.is_rent_to_own,
        rent_to_own_duration:
          vehicle.rent_to_own_duration?.toString() || undefined,
        rent_to_own_whatsapp: vehicle.rent_to_own_whatsapp || undefined,
        rent_to_own_price: vehicle.rent_to_own_price || undefined,
        country_id: vehicle.country_id?.toString(),
        brand_id: vehicle.brand_id?.toString(),
        agent_id: vehicle.agent_id?.toString(),
        vehicle_model_id: vehicle.vehicle_model_id?.toString(),
        vehicle_body_type_id: vehicle.vehicle_body_type_id?.toString(),
        vehicle_type_id: vehicle.vehicle_type_id?.toString(),
        vehicle_class_id: vehicle.vehicle_class_id?.toString(),
        brand_origin_id: vehicle.brand_origin_id?.toString(),
        number_of_seat_id: vehicle.number_of_seat_id?.toString(),
        engine_type_id: vehicle.engine_type_id?.toString(),
        engine_volume_id: vehicle.engine_volume_id?.toString(),
        mainImage: vehicle.image,
        offers: vehicle.offers || [],
        packages: vehicle.packages || [],
        features: vehicle.features || [],
        accessories: vehicle.accessories || [],
        carImages: vehicle.images || [],
        additionalImages: vehicle.additional_images || [],
        adsImages: vehicle.images_ads || [],
      });
    }
  }, [vehicle, isEdit, setFormData]);

  // Create vehicle mutation
  const createVehicleMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      toast.success(
        t("vehicleCreatedSuccess") || "Vehicle created successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      navigate("/cars");
    },
    onError: (error: unknown) => {
      let errorMessage = t("vehicleCreationError") || "Error creating vehicle";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const responseError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = responseError.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    },
  });

  // Update vehicle mutation
  const updateVehicleMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateVehiclePayload }) =>
      updateVehicle(id, data),
    onSuccess: () => {
      toast.success(
        t("vehicleUpdatedSuccess") || "Vehicle updated successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["vehicle", vehicleId] });
      navigate("/cars");
    },
    onError: (error: unknown) => {
      let errorMessage = t("vehicleUpdateError") || "Error updating vehicle";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });

  const handleSubmit = () => {
    if (!formData.nameAr || !formData.nameEn) {
      toast.error(t("pleaseFilAllFields") || "Please fill all required fields");
      return;
    }

    if (!formData.price) {
      toast.error(t("pleaseEnterPrice") || "Please enter a price");
      return;
    }

    if (isEdit && vehicleId) {
      const payload = getUpdatePayload();
      updateVehicleMutation.mutate({ id: Number(vehicleId), data: payload });
    } else {
      const payload = getCreatePayload();
      createVehicleMutation.mutate(payload);
    }
  };

  if (isLoading && isEdit) {
    return (
      <div className="flex justify-center items-center h-64">
        {t("loading") || "Loading..."}
      </div>
    );
  }

  return (
    <div>
      <AddCarsHeader isEdit={isEdit} />
      <div className="md:px-8 px-2">
        <PhotosAndVideos />
        <CarDetails />
        <CarPrices />
        <CarPackages />
        <CarAccessories />
        <CarOffers />
        <RentToOwn />
        <CarAdvertisingImages />
        <div className="mt-6">
          <DashboardButton
            titleAr={isEdit ? "تحديث" : "اضافة"}
            titleEn={isEdit ? "Update" : "Add"}
            onClick={handleSubmit}
            isLoading={
              createVehicleMutation.isPending || updateVehicleMutation.isPending
            }
          />
        </div>
      </div>
    </div>
  );
};

const AddCars = () => {
  return (
    <VehicleFormProvider>
      <AddCarsForm />
    </VehicleFormProvider>
  );
};

export default AddCars;
