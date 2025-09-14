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
  type VehicleImage,
} from "@/api/vehicles";
import Loading from "@/components/general/Loading";

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
  console.log("vehicle", vehicle);

  // Load vehicle data into form when editing
  React.useEffect(() => {
    if (vehicle && isEdit) {
      console.log("Loading vehicle data:", vehicle); // Debug log

      // Helper function to convert VehicleImageObject to VehicleImage array
      const convertToVehicleImages = (images: unknown[]): VehicleImage[] => {
        if (!Array.isArray(images)) return [];
        return images.map((img, index) => {
          // Handle VehicleImageObject structure
          if (img && typeof img === "object" && "url" in img) {
            const imageObj = img as { id?: number; url?: string };
            return {
              id: imageObj.id || index,
              image: imageObj.url || "",
            };
          }
          // Handle direct string URLs
          return {
            id: index,
            image: String(img),
          };
        });
      };

      // Helper function to get video URL from VehicleImageObject
      const getVideoFile = (videoObj: unknown): string | null => {
        if (videoObj && typeof videoObj === "object" && "url" in videoObj) {
          const video = videoObj as { url?: string };
          return video.url || null;
        }
        return null;
      };

      // Helper function to get main image URL from VehicleImageObject
      const getMainImageUrl = (imageObj: unknown): string | null => {
        if (imageObj && typeof imageObj === "object" && "url" in imageObj) {
          const image = imageObj as { url?: string };
          return image.url || null;
        }
        return null;
      };

      // Helper function to safely convert to string
      const safeToString = (value: unknown): string => {
        if (value === null || value === undefined) return "";
        return String(value);
      };

      // Handle name field - API returns name as string or VehicleName object
      let nameAr = "";
      let nameEn = "";

      // Extract the vehicle name properly (handles both string and object types)
      if (typeof vehicle.name === "string") {
        nameAr = vehicle.name || "";
        nameEn = ""; // English name not available for string format
      } else if (vehicle.name && typeof vehicle.name === "object") {
        nameAr = vehicle.name.ar || "";
        nameEn = vehicle.name.en || "";
      }

      const formDataToSet = {
        id: vehicle.id,
        nameAr,
        nameEn,
        price: safeToString(vehicle.price),
        is_discount: Boolean(vehicle.is_discount),
        discount_value: vehicle.discount_value
          ? safeToString(vehicle.discount_value)
          : "",
        discount_date: vehicle.discount_date
          ? safeToString(vehicle.discount_date)
          : "",
        is_include_tax: Boolean(vehicle.is_include_tax),
        is_Insurance_warranty: Boolean(vehicle.is_Insurance_warranty),
        is_include_warranty: Boolean(vehicle.is_include_warranty),
        is_rent_to_own: Boolean(vehicle.is_rent_to_own),
        rent_to_own_duration: vehicle.rent_to_own_duration
          ? safeToString(vehicle.rent_to_own_duration)
          : "",
        rent_to_own_whatsapp: vehicle.rent_to_own_whatsapp
          ? safeToString(vehicle.rent_to_own_whatsapp)
          : "",
        rent_to_own_price: vehicle.rent_to_own_price
          ? safeToString(vehicle.rent_to_own_price)
          : "",
        country_id: vehicle.country_id ? safeToString(vehicle.country_id) : "",
        brand_id: vehicle.brand_id ? safeToString(vehicle.brand_id) : "",
        agent_id: vehicle.agent_id ? safeToString(vehicle.agent_id) : "",
        vehicle_model_id: vehicle.vehicle_model_id
          ? safeToString(vehicle.vehicle_model_id)
          : "",
        vehicle_body_type_id: vehicle.vehicle_body_type_id
          ? safeToString(vehicle.vehicle_body_type_id)
          : "",
        vehicle_type_id: vehicle.vehicle_type_id
          ? safeToString(vehicle.vehicle_type_id)
          : "",
        vehicle_class_id: vehicle.vehicle_class_id
          ? safeToString(vehicle.vehicle_class_id)
          : "",
        brand_origin_id: vehicle.brand_origin_id
          ? safeToString(vehicle.brand_origin_id)
          : "",
        number_of_seat_id: vehicle.number_of_seat_id
          ? safeToString(vehicle.number_of_seat_id)
          : "",
        engine_type_id: vehicle.engine_type_id
          ? safeToString(vehicle.engine_type_id)
          : "",
        engine_volume_id: vehicle.engine_volume_id
          ? safeToString(vehicle.engine_volume_id)
          : "",
        mainImage: getMainImageUrl(vehicle.image),
        videoFile: getVideoFile(vehicle.video),
        offers: vehicle.offers || [],
        packages: vehicle.packages || [],
        features: vehicle.features || [],
        accessories: vehicle.accessories || [],
        carImages: [], // Not used anymore
        additionalImages: convertToVehicleImages(
          vehicle.additional_images || []
        ), // PhotosAndVideos MultiImageInput -> additional_images API field
        adsImages: convertToVehicleImages(vehicle.images_ads || []),
      };

      console.log("Setting form data:", formDataToSet); // Debug log
      setFormData(formDataToSet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle, isEdit]);

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
      // Prefer server-provided message for 422 validation errors
      let errorMessage = t("vehicleCreationError") || "Error creating vehicle";
      try {
        const maybeErr = error as { response?: unknown } | undefined;
        const resp = maybeErr?.response as
          | { status?: number; data?: unknown }
          | undefined;
        if (resp?.status === 422) {
          const data = resp.data as Record<string, unknown> | undefined;
          if (typeof data?.message === "string") {
            errorMessage = data.message;
          } else if (data?.errors && typeof data.errors === "object") {
            const values = Object.values(data.errors as Record<string, unknown>)
              .flat()
              .map((v) => (Array.isArray(v) ? v.join(" ") : String(v)));
            errorMessage = values.join(" ");
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          const data = resp?.data as Record<string, unknown> | undefined;
          if (typeof data?.message === "string") errorMessage = data.message;
        }
      } catch {
        /* ignore and fall back to default message */
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
      // Prefer server-provided message for 422 validation errors
      let errorMessage = t("vehicleUpdateError") || "Error updating vehicle";
      try {
        const maybeErr = error as { response?: unknown } | undefined;
        const resp = maybeErr?.response as
          | { status?: number; data?: unknown }
          | undefined;
        if (resp?.status === 422) {
          const data = resp.data as Record<string, unknown> | undefined;
          const serverMessage = data?.message as string | undefined;
          if (serverMessage) {
            errorMessage = serverMessage;
          } else if (data?.errors && typeof data.errors === "object") {
            const values = Object.values(data.errors as Record<string, unknown>)
              .flat()
              .map((v) => (Array.isArray(v) ? v.join(" ") : String(v)));
            errorMessage = values.join(" ");
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          const data = resp?.data as Record<string, unknown> | undefined;
          if (typeof data?.message === "string") errorMessage = data.message;
        }
      } catch {
        /* ignore and fall back to default message */
      }
      toast.error(errorMessage);
    },
  });

  const handleSubmit = () => {
    if (!formData.nameAr || !formData.nameEn) {
      toast.error(
        t("pleaseFillAllFields") || "Please complete all required fields"
      );
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
    return <Loading />;
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
