import React, {
  createContext,
  ReactNode,
  useCallback,
  useState,
  useContext,
} from "react";
import {
  type CreateVehiclePayload,
  type UpdateVehiclePayload,
  type VehicleFeature,
  type VehicleOffer,
  type VehicleAccessory,
  type VehiclePackage,
  type VehicleImage,
} from "@/api/vehicles";

interface VehicleFormState extends Omit<CreateVehiclePayload, "name"> {
  id?: number;
  nameAr: string;
  nameEn: string;
  rent_to_own_duration_en?: string; // Additional field for English duration
  rent_to_own_phone_country?: string; // Phone country code for WhatsApp number
  mainImage?: File | string | null;
  videoFile?: File | string | null;
  carImages: VehicleImage[];
  additionalImages: VehicleImage[];
  adsImages: VehicleImage[];
  discount_from_date?: string;
  discount_to_date?: string;
  is_offers_active?: boolean; // Toggle state for offers section
  is_packages_active?: boolean; // Toggle state for packages section
  is_accessories_active?: boolean; // Toggle state for accessories section
}

interface VehicleFormContextType {
  formData: VehicleFormState;
  setFormData: (data: Partial<VehicleFormState>) => void;
  updateField: <K extends keyof VehicleFormState>(
    field: K,
    value: VehicleFormState[K]
  ) => void;
  features: VehicleFeature[];
  addFeature: () => void;
  updateFeature: (index: number, feature: Partial<VehicleFeature>) => void;
  removeFeature: (index: number) => void;
  offers: VehicleOffer[];
  addOffer: () => void;
  updateOffer: (index: number, offer: Partial<VehicleOffer>) => void;
  removeOffer: (index: number) => void;
  clearOffers: () => void;
  accessories: VehicleAccessory[];
  addAccessory: () => void;
  updateAccessory: (
    index: number,
    accessory: Partial<VehicleAccessory>
  ) => void;
  removeAccessory: (index: number) => void;
  clearAccessories: () => void;
  packages: VehiclePackage[];
  addPackage: () => void;
  updatePackage: (index: number, pkg: Partial<VehiclePackage>) => void;
  removePackage: (index: number) => void;
  clearPackages: () => void;
  addCarImage: () => void;
  updateCarImage: (index: number, image: VehicleImage) => void;
  removeCarImage: (index: number) => void;
  addAdditionalImage: () => void;
  updateAdditionalImage: (index: number, image: VehicleImage) => void;
  removeAdditionalImage: (index: number) => void;
  addAdsImage: () => void;
  updateAdsImage: (index: number, image: VehicleImage) => void;
  removeAdsImage: (index: number) => void;
  resetForm: () => void;
  getCreatePayload: () => CreateVehiclePayload;
  getUpdatePayload: () => UpdateVehiclePayload;
}

const initialFormState: VehicleFormState = {
  nameAr: "",
  nameEn: "",
  price: "",
  is_discount: false,
  discount_value: "",
  discount_date: "",
  discount_from_date: "",
  discount_to_date: "",
  is_include_tax: false,
  is_Insurance_warranty: false,
  is_include_warranty: false,
  is_rent_to_own: false,
  rent_to_own_duration: "",
  rent_to_own_duration_en: "",
  rent_to_own_whatsapp: "",
  rent_to_own_phone_country: "",
  rent_to_own_price: "",
  country_id: "",
  brand_id: "",
  agent_id: "",
  vehicle_model_id: "",
  vehicle_body_type_id: "",
  vehicle_type_id: "",
  vehicle_class_id: "",
  brand_origin_id: "",
  number_of_seat_id: "",
  engine_type_id: "",
  engine_volume_id: "",
  mainImage: null,
  videoFile: null,
  carImages: [],
  additionalImages: [],
  adsImages: [],
  offers: [],
  packages: [],
  features: [],
  accessories: [],
  is_offers_active: false,
  is_packages_active: false,
  is_accessories_active: false,
};

const VehicleFormContext = createContext<VehicleFormContextType | null>(null);

export { VehicleFormContext };

interface VehicleFormProviderProps {
  children: ReactNode;
  initialData?: Partial<VehicleFormState>;
}

export const VehicleFormProvider: React.FC<VehicleFormProviderProps> = ({
  children,
  initialData,
}) => {
  const [formData, setFormDataState] = useState<VehicleFormState>({
    ...initialFormState,
    ...initialData,
  });

  const setFormData = useCallback((data: Partial<VehicleFormState>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  }, []);

  const updateField = useCallback(
    <K extends keyof VehicleFormState>(
      field: K,
      value: VehicleFormState[K]
    ) => {
      setFormDataState((prev) => {
        // When disabling certain toggles we want to also clear their related data
        if (field === "is_offers_active" && value === false) {
          return { ...prev, [field]: value, offers: [] } as VehicleFormState;
        }
        if (field === "is_packages_active" && value === false) {
          return { ...prev, [field]: value, packages: [] } as VehicleFormState;
        }
        if (field === "is_accessories_active" && value === false) {
          return {
            ...prev,
            [field]: value,
            accessories: [],
          } as VehicleFormState;
        }
        if (field === "is_rent_to_own" && value === false) {
          return {
            ...prev,
            [field]: value,
            rent_to_own_duration: "",
            rent_to_own_duration_en: "",
            rent_to_own_whatsapp: "",
            rent_to_own_phone_country: "",
            rent_to_own_price: "",
          } as VehicleFormState;
        }
        return { ...prev, [field]: value } as VehicleFormState;
      });
    },
    []
  );

  // Features management
  const addFeature = useCallback(() => {
    const newFeature: VehicleFeature = {
      name: { ar: "", en: "" },
      description: { ar: "", en: "" },
      is_active: true,
      image: null,
    };
    setFormDataState((prev) => ({
      ...prev,
      features: [...(prev.features || []), newFeature],
    }));
  }, []);

  const updateFeature = useCallback(
    (index: number, feature: Partial<VehicleFeature>) => {
      setFormDataState((prev) => ({
        ...prev,
        features:
          prev.features?.map((f, i) =>
            i === index ? { ...f, ...feature } : f
          ) || [],
      }));
    },
    []
  );

  const removeFeature = useCallback((index: number) => {
    setFormDataState((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || [],
    }));
  }, []);

  // Offers management
  const addOffer = useCallback(() => {
    const newOffer: VehicleOffer = {
      name: { ar: "", en: "" },
      description: { ar: "", en: "" },
      is_active: true,
      image: null,
    };
    setFormDataState((prev) => ({
      ...prev,
      offers: [...(prev.offers || []), newOffer],
    }));
  }, []);

  const updateOffer = useCallback(
    (index: number, offer: Partial<VehicleOffer>) => {
      setFormDataState((prev) => ({
        ...prev,
        offers:
          prev.offers?.map((o, i) => (i === index ? { ...o, ...offer } : o)) ||
          [],
      }));
    },
    []
  );

  const removeOffer = useCallback((index: number) => {
    setFormDataState((prev) => ({
      ...prev,
      offers: prev.offers?.filter((_, i) => i !== index) || [],
    }));
  }, []);

  const clearOffers = useCallback(() => {
    setFormDataState((prev) => ({
      ...prev,
      offers: [],
    }));
  }, []);

  // Accessories management
  const addAccessory = useCallback(() => {
    const newAccessory: VehicleAccessory = {
      name: { ar: "", en: "" },
      price: "",
      is_active: true,
      image: null,
    };
    setFormDataState((prev) => ({
      ...prev,
      accessories: [...(prev.accessories || []), newAccessory],
    }));
  }, []);

  const updateAccessory = useCallback(
    (index: number, accessory: Partial<VehicleAccessory>) => {
      setFormDataState((prev) => ({
        ...prev,
        accessories:
          prev.accessories?.map((a, i) =>
            i === index ? { ...a, ...accessory } : a
          ) || [],
      }));
    },
    []
  );

  const removeAccessory = useCallback((index: number) => {
    setFormDataState((prev) => ({
      ...prev,
      accessories: prev.accessories?.filter((_, i) => i !== index) || [],
    }));
  }, []);

  const clearAccessories = useCallback(() => {
    setFormDataState((prev) => ({
      ...prev,
      accessories: [],
    }));
  }, []);

  // Packages management
  const addPackage = useCallback(() => {
    const newPackage: VehiclePackage = {
      name: { ar: "", en: "" },
      price: "",
      is_active: true,
    };
    setFormDataState((prev) => ({
      ...prev,
      packages: [...(prev.packages || []), newPackage],
    }));
  }, []);

  const updatePackage = useCallback(
    (index: number, pkg: Partial<VehiclePackage>) => {
      setFormDataState((prev) => ({
        ...prev,
        packages:
          prev.packages?.map((p, i) => (i === index ? { ...p, ...pkg } : p)) ||
          [],
      }));
    },
    []
  );

  const removePackage = useCallback((index: number) => {
    setFormDataState((prev) => ({
      ...prev,
      packages: prev.packages?.filter((_, i) => i !== index) || [],
    }));
  }, []);

  const clearPackages = useCallback(() => {
    setFormDataState((prev) => ({
      ...prev,
      packages: [],
    }));
  }, []);

  // Car images management
  const addCarImage = useCallback(() => {
    const newImage: VehicleImage = { image: "" };
    setFormDataState((prev) => ({
      ...prev,
      carImages: [...prev.carImages, newImage],
    }));
  }, []);

  const updateCarImage = useCallback((index: number, image: VehicleImage) => {
    setFormDataState((prev) => ({
      ...prev,
      carImages: prev.carImages.map((img, i) => (i === index ? image : img)),
    }));
  }, []);

  const removeCarImage = useCallback((index: number) => {
    setFormDataState((prev) => ({
      ...prev,
      carImages: prev.carImages.filter((_, i) => i !== index),
    }));
  }, []);

  // Additional images management
  const addAdditionalImage = useCallback(() => {
    const newImage: VehicleImage = { image: "" };
    setFormDataState((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, newImage],
    }));
  }, []);

  const updateAdditionalImage = useCallback(
    (index: number, image: VehicleImage) => {
      setFormDataState((prev) => ({
        ...prev,
        additionalImages: prev.additionalImages.map((img, i) =>
          i === index ? image : img
        ),
      }));
    },
    []
  );

  const removeAdditionalImage = useCallback((index: number) => {
    setFormDataState((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  }, []);

  // Ads images management
  const addAdsImage = useCallback(() => {
    const newImage: VehicleImage = { image: "" };
    setFormDataState((prev) => ({
      ...prev,
      adsImages: [...prev.adsImages, newImage],
    }));
  }, []);

  const updateAdsImage = useCallback((index: number, image: VehicleImage) => {
    setFormDataState((prev) => ({
      ...prev,
      adsImages: prev.adsImages.map((img, i) => (i === index ? image : img)),
    }));
  }, []);

  const removeAdsImage = useCallback((index: number) => {
    setFormDataState((prev) => ({
      ...prev,
      adsImages: prev.adsImages.filter((_, i) => i !== index),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormDataState(initialFormState);
  }, []);

  const getCreatePayload = useCallback((): CreateVehiclePayload => {
    // Build payload as a flexible object so we can include explicit nulls
    const payload: any = {
      name: { ar: formData.nameAr, en: formData.nameEn },
      country_id: formData.country_id,
      brand_id: formData.brand_id,
      agent_id: formData.agent_id,
      vehicle_model_id: formData.vehicle_model_id,
      vehicle_body_type_id: formData.vehicle_body_type_id,
      vehicle_type_id: formData.vehicle_type_id,
      vehicle_class_id: formData.vehicle_class_id,
      brand_origin_id: formData.brand_origin_id,
      number_of_seat_id: formData.number_of_seat_id,
      engine_type_id: formData.engine_type_id,
      engine_volume_id: formData.engine_volume_id,
      price: formData.price,
      is_discount: formData.is_discount,
      discount_value: formData.discount_value,
      is_include_tax: formData.is_include_tax,
      is_Insurance_warranty: formData.is_Insurance_warranty,
      is_include_warranty: formData.is_include_warranty,
      is_rent_to_own: formData.is_rent_to_own,
      image:
        formData.mainImage instanceof File ? formData.mainImage : undefined,
      video:
        formData.videoFile instanceof File ? formData.videoFile : undefined,
      images: formData.carImages,
      additional_images: formData.additionalImages,
      ads_images: formData.adsImages,
      features: formData.features,
    };

    // Optional discount dates only when discount is active
    if (formData.is_discount) {
      if (formData.discount_from_date)
        payload.discount_from_date = formData.discount_from_date;
      if (formData.discount_to_date)
        payload.discount_to_date = formData.discount_to_date;
    }

    // Rent-to-own fields: send localized durations and other fields only when enabled,
    // otherwise explicitly send null so backend can remove them.
    if (formData.is_rent_to_own) {
      payload["rent_to_own_duration[ar]"] =
        formData.rent_to_own_duration || undefined;
      payload["rent_to_own_duration[en]"] =
        formData.rent_to_own_duration_en || undefined;
      if (formData.rent_to_own_whatsapp)
        payload.rent_to_own_whatsapp = formData.rent_to_own_whatsapp;
      if (formData.rent_to_own_phone_country)
        payload.rent_to_own_phone_country = formData.rent_to_own_phone_country;
      if (formData.rent_to_own_price)
        payload.rent_to_own_price = formData.rent_to_own_price;
    } else {
      payload["rent_to_own_duration[ar]"] = null;
      payload["rent_to_own_duration[en]"] = null;
      payload.rent_to_own_whatsapp = null;
      payload.rent_to_own_phone_country = null;
      payload.rent_to_own_price = null;
    }

    // Offers / packages / accessories: send empty arrays when toggles disabled so server removes them
    payload.offers = formData.is_offers_active ? formData.offers : [];
    payload.packages = formData.is_packages_active ? formData.packages : [];
    payload.accessories = formData.is_accessories_active
      ? formData.accessories
      : [];

    return payload as CreateVehiclePayload;
  }, [formData]);

  const getUpdatePayload = useCallback((): UpdateVehiclePayload => {
    const createPayload = getCreatePayload();

    // Filter additional_images to only include NEW File uploads (not existing URLs)
    const newAdditionalImages = formData.additionalImages.filter(
      (img) => img.image instanceof File
    );

    // Filter ads_images to only include NEW File uploads (not existing URLs)
    const newAdsImages = formData.adsImages.filter(
      (img) => img.image instanceof File
    );

    return {
      ...createPayload,
      additional_images: newAdditionalImages,
      ads_images: newAdsImages,
      id: formData.id || 0,
    };
  }, [
    getCreatePayload,
    formData.id,
    formData.additionalImages,
    formData.adsImages,
  ]);

  const value: VehicleFormContextType = React.useMemo(
    () => ({
      formData,
      setFormData,
      updateField,
      features: formData.features || [],
      addFeature,
      updateFeature,
      removeFeature,
      offers: formData.offers || [],
      addOffer,
      updateOffer,
      removeOffer,
      clearOffers,
      accessories: formData.accessories || [],
      addAccessory,
      updateAccessory,
      removeAccessory,
      clearAccessories,
      packages: formData.packages || [],
      addPackage,
      updatePackage,
      removePackage,
      clearPackages,
      addCarImage,
      updateCarImage,
      removeCarImage,
      addAdditionalImage,
      updateAdditionalImage,
      removeAdditionalImage,
      addAdsImage,
      updateAdsImage,
      removeAdsImage,
      resetForm,
      getCreatePayload,
      getUpdatePayload,
    }),
    [
      formData,
      setFormData,
      updateField,
      addFeature,
      updateFeature,
      removeFeature,
      addOffer,
      updateOffer,
      removeOffer,
      clearOffers,
      addAccessory,
      updateAccessory,
      removeAccessory,
      clearAccessories,
      addPackage,
      updatePackage,
      removePackage,
      clearPackages,
      addCarImage,
      updateCarImage,
      removeCarImage,
      addAdditionalImage,
      updateAdditionalImage,
      removeAdditionalImage,
      addAdsImage,
      updateAdsImage,
      removeAdsImage,
      resetForm,
      getCreatePayload,
      getUpdatePayload,
    ]
  );

  return (
    <VehicleFormContext.Provider value={value}>
      {children}
    </VehicleFormContext.Provider>
  );
};

// Note: a separate hook `src/hooks/useVehicleForm.ts` provides the consumer hook.

// Provide a convenience export so code importing from the context file still works
export const useVehicleForm = () => {
  const context = useContext(VehicleFormContext);
  if (context === null) {
    throw new Error("useVehicleForm must be used within a VehicleFormProvider");
  }
  return context;
};
