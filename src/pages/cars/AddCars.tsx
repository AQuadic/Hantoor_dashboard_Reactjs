import AddCarsHeader from "@/components/cars/addcars/AddCarsHeader";
import CarDetails from "@/components/cars/addcars/CarDetails";
import PhotosAndVideos from "@/components/cars/addcars/PhotosAndVideos";
import React from "react";
import CarPrices from "@/components/cars/addcars/CarPrices";
import CarPackages from "@/components/cars/addcars/CarPackages";
import CarAccessories from "@/components/cars/addcars/CarAccessories";
import CarOffers from "@/components/cars/addcars/CarOffers";
import RentToOwn from "@/components/cars/addcars/RentToOwn";
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
  type VehicleAccessory,
  type VehicleOffer,
  type VehicleName,
  type VehicleDescription,
} from "@/api/vehicles";
import Loading from "@/components/general/Loading";
import CarAdvertisingImages from "@/components/cars/addcars/CarAdvertisingImages";

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
      const normalizeDate = (date: unknown): string => {
        if (!date) return "";
        const str = String(date);
        if (str.includes("T")) return str;
        return str.split(" ")[0];
      };

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
      // Return empty string when not available so the field is optional
      const getVideoFile = (videoObj: unknown): string => {
        if (!videoObj) return "";

        // Handle direct string URL
        if (typeof videoObj === "string") {
          return videoObj;
        }

        // Handle object with url property
        if (videoObj && typeof videoObj === "object" && "url" in videoObj) {
          const video = videoObj as { url?: string };
          return video.url || "";
        }

        return "";
      };

      // Helper function to get main image URL from VehicleImageObject
      // Return empty string when not available so the field is optional
      const getMainImageUrl = (imageObj: unknown): string => {
        if (imageObj && typeof imageObj === "object" && "url" in imageObj) {
          const image = imageObj as { url?: string };
          return image.url || "";
        }
        return "";
      };

      // Helper function to extract image URL from VehicleImageObject or File
      const getImageUrl = (image: unknown): string | null => {
        if (!image) return null;
        if (typeof image === "string") return image;
        if (image && typeof image === "object" && "url" in image) {
          const imageObj = image as { url?: string };
          return imageObj.url || null;
        }
        return null;
      };

      // Helper function to convert accessories with proper image URLs
      const convertAccessories = (
        accessories: unknown[]
      ): VehicleAccessory[] => {
        if (!Array.isArray(accessories)) return [];
        return accessories.map((acc) => {
          const accessory = acc as Record<string, unknown>;
          return {
            id: accessory.id as number | undefined,
            vehicle_id: accessory.vehicle_id as number | undefined,
            name: accessory.name as VehicleName,
            price: safeToString(accessory.price),
            is_active:
              accessory.is_active !== undefined
                ? Boolean(accessory.is_active)
                : true,
            image: getImageUrl(accessory.image),
            created_at: accessory.created_at as string | undefined,
            updated_at: accessory.updated_at as string | undefined,
          };
        });
      };

      // Helper function to convert offers with proper image URLs
      const convertOffers = (offers: unknown[]): VehicleOffer[] => {
        if (!Array.isArray(offers)) return [];
        return offers.map((off) => {
          const offer = off as Record<string, unknown>;
          return {
            id: offer.id as number | undefined,
            vehicle_id: offer.vehicle_id as number | undefined,
            name: offer.name as VehicleName,
            description: offer.description as VehicleDescription | undefined,
            is_active:
              offer.is_active !== undefined ? Boolean(offer.is_active) : true,
            image: getImageUrl(offer.image),
            created_at: offer.created_at as string | undefined,
            updated_at: offer.updated_at as string | undefined,
          };
        });
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

      // Helper function to extract localized duration
      const getDurationAr = (): string => {
        if (
          vehicle.rent_to_own_duration &&
          typeof vehicle.rent_to_own_duration === "object"
        ) {
          const duration = vehicle.rent_to_own_duration as {
            ar?: string;
            en?: string;
          };
          return duration.ar || "";
        }
        return vehicle.rent_to_own_duration
          ? safeToString(vehicle.rent_to_own_duration)
          : "";
      };

      const getDurationEn = (): string => {
        if (
          vehicle.rent_to_own_duration &&
          typeof vehicle.rent_to_own_duration === "object"
        ) {
          const duration = vehicle.rent_to_own_duration as {
            ar?: string;
            en?: string;
          };
          return duration.en || "";
        }
        return ""; // If duration is a number/string, English version not available
      };

      const formDataToSet = {
        id: vehicle.id,
        nameAr,
        nameEn,
        price: safeToString(vehicle.price),
        is_discount: Boolean(vehicle.is_discount),
        discount_value: vehicle.discount_value
          ? safeToString(vehicle.discount_value)
          : "",
        discount_date: normalizeDate(vehicle.discount_date),
        discount_from_date: normalizeDate(vehicle.discount_from_date),
        discount_to_date: normalizeDate(vehicle.discount_to_date),
        is_include_tax: Boolean(vehicle.is_include_tax),
        is_Insurance_warranty: Boolean(vehicle.is_Insurance_warranty),
        is_include_warranty: Boolean(vehicle.is_include_warranty),
        is_rent_to_own: Boolean(vehicle.is_rent_to_own),
        rent_to_own_duration: getDurationAr(),
        rent_to_own_duration_en: getDurationEn(),
        rent_to_own_whatsapp: vehicle.rent_to_own_whatsapp
          ? safeToString(vehicle.rent_to_own_whatsapp)
          : "",
        rent_to_own_phone_country: vehicle.rent_to_own_phone_country
          ? safeToString(vehicle.rent_to_own_phone_country)
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
        // Make main image and video optional (empty string when missing)
        mainImage: getMainImageUrl(vehicle.image) || "",
        videoFile: getVideoFile(vehicle.video) || "",
        offers: convertOffers(vehicle.offers || []),
        packages: vehicle.packages || [],
        features: vehicle.features || [],
        accessories: convertAccessories(vehicle.accessories || []),
        carImages: [], // Not used anymore
        additionalImages: convertToVehicleImages(
          vehicle.additional_images || []
        ), // PhotosAndVideos MultiImageInput -> additional_images API field
        adsImages: convertToVehicleImages(vehicle.images_ads || []), // Advertising images from images_ads API field
        // Set toggle states based on whether data exists
        is_offers_active:
          (vehicle.offers && vehicle.offers.length > 0) || false,
        is_packages_active:
          (vehicle.packages && vehicle.packages.length > 0) || false,
        is_accessories_active:
          (vehicle.accessories && vehicle.accessories.length > 0) || false,
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
    // Validate بيانات السيارة (Car Details) - All fields required
    if (!formData.nameAr) {
      toast.error(t("pleaseEnterCarNameAr"));
      return;
    }

    if (!formData.nameEn) {
      toast.error(t("pleaseEnterCarNameEn"));
      return;
    }

    if (!formData.country_id) {
      toast.error(t("pleaseSelectCountry"));
      return;
    }

    if (!formData.brand_id) {
      toast.error(t("pleaseSelectBrand"));
      return;
    }

    if (!formData.agent_id) {
      toast.error(t("pleaseSelectAgent"));
      return;
    }

    if (!formData.vehicle_model_id) {
      toast.error(t("pleaseSelectModel"));
      return;
    }

    if (!formData.vehicle_body_type_id) {
      toast.error(t("pleaseSelectStructureType"));
      return;
    }

    if (!formData.vehicle_type_id) {
      toast.error(t("pleaseSelectType"));
      return;
    }

    if (!formData.vehicle_class_id) {
      toast.error(t("pleaseSelectCategory"));
      return;
    }

    if (!formData.brand_origin_id) {
      toast.error(t("pleaseSelectBrandOrigin"));
      return;
    }

    if (!formData.number_of_seat_id) {
      toast.error(t("pleaseSelectSeats"));
      return;
    }

    if (!formData.engine_type_id) {
      toast.error(t("pleaseSelectEngineType"));
      return;
    }

    if (!formData.engine_volume_id) {
      toast.error(t("pleaseSelectEngineSize"));
      return;
    }

    // Validate سعر السيارة (Car Price) - Required
    if (!formData.price) {
      toast.error(t("pleaseEnterPrice"));
      return;
    }

    // Validate باقات الصيانة (Maintenance Packages) - Required when active
    if (formData.is_packages_active) {
      if (!formData.packages || formData.packages.length === 0) {
        toast.error(t("pleaseCompletePackages"));
        return;
      }

      // Check each package has required fields
      for (const pkg of formData.packages) {
        if (!pkg.name?.ar || !pkg.name?.en || !pkg.price) {
          toast.error(t("pleaseCompletePackages"));
          return;
        }
      }
    }

    // Validate الاكسسوارات (Accessories) - Required when active
    if (formData.is_accessories_active) {
      if (!formData.accessories || formData.accessories.length === 0) {
        toast.error(t("pleaseCompleteAccessories"));
        return;
      }

      // Check each accessory has required fields
      for (const accessory of formData.accessories) {
        if (!accessory.name?.ar || !accessory.name?.en || !accessory.price) {
          toast.error(t("pleaseCompleteAccessories"));
          return;
        }
      }
    }

    // Validate العروض (Offers) - Required when active
    if (formData.is_offers_active) {
      if (!formData.offers || formData.offers.length === 0) {
        toast.error(t("pleaseCompleteOffers"));
        return;
      }

      // Check each offer has required fields
      for (const offer of formData.offers) {
        if (!offer.name?.ar || !offer.name?.en) {
          toast.error(t("pleaseCompleteOffers"));
          return;
        }
      }
    }

    // Validate إيجار منتهي بالتملك (Rent to Own) - Required when active
    if (formData.is_rent_to_own) {
      if (
        !formData.rent_to_own_duration ||
        !formData.rent_to_own_duration_en ||
        !formData.rent_to_own_whatsapp ||
        !formData.rent_to_own_price
      ) {
        toast.error(t("pleaseCompleteRentToOwn"));
        return;
      }
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
