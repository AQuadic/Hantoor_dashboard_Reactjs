import DashboardInput from "../general/DashboardInput";
import Add from "../icons/banks/Add";
import { useTranslation } from "react-i18next";
import MobileInput from "../general/MobileInput";
import { AgentCenter } from "@/api/agents/fetchAgents";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CountryType, getCountryByISO2 } from "@/utils/getCountryByPhoneCode";

const DEFAULT_COUNTRY: CountryType = {
  iso2: "AE",
  name: "United Arab Emirates",
  phone: ["971"],
};

interface AddSalesShowroomsProps {
  centers: AgentCenter[];
  setCenters: (centers: AgentCenter[]) => void;
  type: "center" | "show_room";
}

const AddSalesShowrooms: React.FC<AddSalesShowroomsProps> = ({
  centers,
  setCenters,
  type,
}) => {
  const { t } = useTranslation("agents");

  // Country state for WhatsApp input per showroom
  const [whatsappCountries, setWhatsappCountries] = useState<CountryType[]>(
    () =>
      centers.map((c) => {
        if (c?.whatsapp_country) {
          const country = getCountryByISO2(c.whatsapp_country);
          if (country) return country;
        }
        return DEFAULT_COUNTRY;
      })
  );
  const [phoneCountries, setPhoneCountries] = useState<CountryType[]>(() =>
    centers.map((c) => {
      if (c?.phone_country) {
        const country = getCountryByISO2(c.phone_country);
        if (country) return country;
      }
      return DEFAULT_COUNTRY;
    })
  );

  // Sync country arrays when centers are added/removed from parent (length changes)
  // but preserve existing country selections for unchanged indices
  useEffect(() => {
    if (centers.length > whatsappCountries.length) {
      // Centers added - add default countries for new items only
      const newWhatsappCountries = [...whatsappCountries];
      for (let i = whatsappCountries.length; i < centers.length; i++) {
        const center = centers[i];
        if (center?.whatsapp_country) {
          const country = getCountryByISO2(center.whatsapp_country);
          newWhatsappCountries.push(country || DEFAULT_COUNTRY);
        } else {
          newWhatsappCountries.push(DEFAULT_COUNTRY);
        }
      }
      setWhatsappCountries(newWhatsappCountries);
    } else if (centers.length < whatsappCountries.length) {
      // Centers removed - trim the array
      setWhatsappCountries(whatsappCountries.slice(0, centers.length));
    }

    if (centers.length > phoneCountries.length) {
      // Centers added - add default countries for new items only
      const newPhoneCountries = [...phoneCountries];
      for (let i = phoneCountries.length; i < centers.length; i++) {
        const center = centers[i];
        if (center?.phone_country) {
          const country = getCountryByISO2(center.phone_country);
          newPhoneCountries.push(country || DEFAULT_COUNTRY);
        } else {
          newPhoneCountries.push(DEFAULT_COUNTRY);
        }
      }
      setPhoneCountries(newPhoneCountries);
    } else if (centers.length < phoneCountries.length) {
      // Centers removed - trim the array
      setPhoneCountries(phoneCountries.slice(0, centers.length));
    }
  }, [centers.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Add a new empty showroom form
  const handleAddShowroom = () => {
    setCenters([
      ...centers,
      {
        name: { ar: "", en: "" },
        description: { ar: "", en: "" },
        phone: "",
        whatsapp: "",
        type,
        is_active: "1",
      },
    ]);
    setWhatsappCountries([...whatsappCountries, DEFAULT_COUNTRY]);
    setPhoneCountries([...phoneCountries, DEFAULT_COUNTRY]);
  };

  // Update a field in a specific showroom
  const handleShowroomChange = (
    index: number,
    field: string,
    value: string,
    subfield?: string
  ) => {
    setCenters(
      centers.map((center, i) => {
        if (i !== index) return center;
        if (field === "name" || field === "description") {
          return {
            ...center,
            [field]: {
              ...center[field],
              [subfield!]: value,
            },
          };
        }
        return {
          ...center,
          [field]: value,
        };
      })
    );
  };

  // Remove a showroom
  const handleRemoveShowroom = (index: number) => {
    setCenters(centers.filter((_, i) => i !== index));
    setWhatsappCountries(whatsappCountries.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white mt-6 rounded-[15px] ">
      <div className="flex flex-col gap-6">
        {centers.map((center, index) => (
          <div key={index} className="border p-4 rounded-lg relative">
            <button
              type="button"
              className="absolute -top-3 -right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-sm transition-all border border-white"
              onClick={() => handleRemoveShowroom(index)}
              aria-label={t("removeShowroom")}
            >
              <X size={18} strokeWidth={2.2} />
            </button>
            <div className="flex flex-col md:flex-row gap-[15px]">
              <div className="w-full">
                <DashboardInput
                  label={t("arShowRooms")}
                  value={center.name.ar}
                  onChange={(val) =>
                    handleShowroomChange(index, "name", val, "ar")
                  }
                  placeholder={t("placeholderName")}
                />
              </div>
              <div className="w-full">
                <DashboardInput
                  label={t("enShowRooms")}
                  value={center.name.en}
                  onChange={(val) =>
                    handleShowroomChange(index, "name", val, "en")
                  }
                  placeholder={t("placeholderName")}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-[15px] mt-4">
              <div className="w-full">
                <DashboardInput
                  label={t("arAddress")}
                  value={center.description.ar}
                  onChange={(val) =>
                    handleShowroomChange(index, "description", val, "ar")
                  }
                  placeholder={t("writeHere")}
                />
              </div>
              <div className="w-full">
                <DashboardInput
                  label={t("enAddress")}
                  value={center.description.en}
                  onChange={(val) =>
                    handleShowroomChange(index, "description", val, "en")
                  }
                  placeholder={t("writeHere")}
                />
              </div>
            </div>
            {/* Google Map Link */}
            <div className="flex flex-col md:flex-row gap-[15px] mt-4">
              <div className="w-full">
                <DashboardInput
                  label={t("linkGoogleMap")}
                  value={center.link_google_map || ""}
                  onChange={(val) =>
                    handleShowroomChange(index, "link_google_map", val)
                  }
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-[15px] mt-4">
              <div className="relative w-full">
                <MobileInput
                  label={t("phoneNumber", {
                    ns: "agents",
                    defaultValue: "رقم الجوال",
                  })}
                  labelClassName="font-normal"
                  selectedCountry={phoneCountries[index] || DEFAULT_COUNTRY}
                  setSelectedCountry={(country: CountryType) => {
                    const newCountries = [...phoneCountries];
                    newCountries[index] = country;
                    setPhoneCountries(newCountries);
                    // Update phone_country separately
                    handleShowroomChange(index, "phone_country", country.iso2);
                  }}
                  phone={center.phone || ""}
                  setPhone={(val: string) => {
                    handleShowroomChange(index, "phone", val);
                    // Ensure phone_country is set when phone is entered
                    if (!center.phone_country) {
                      handleShowroomChange(
                        index,
                        "phone_country",
                        (phoneCountries[index] || DEFAULT_COUNTRY).iso2
                      );
                    }
                  }}
                />
                <div className="absolute top-9 left-5"></div>
              </div>
              <div className="w-full">
                <MobileInput
                  label={t("whatsApp", {
                    ns: "agents",
                    defaultValue: "رقم الواتساب",
                  })}
                  labelClassName="font-normal"
                  selectedCountry={whatsappCountries[index] || DEFAULT_COUNTRY}
                  setSelectedCountry={(country: {
                    iso2: string;
                    name: string;
                    phone: string[];
                  }) => {
                    const newCountries = [...whatsappCountries];
                    newCountries[index] = country;
                    setWhatsappCountries(newCountries);
                    // Update whatsapp_country separately
                    handleShowroomChange(
                      index,
                      "whatsapp_country",
                      country.iso2
                    );
                  }}
                  phone={center.whatsapp || ""}
                  setPhone={(val: string) => {
                    handleShowroomChange(index, "whatsapp", val);
                    // Ensure whatsapp_country is set when whatsapp is entered
                    if (!center.whatsapp_country) {
                      handleShowroomChange(
                        index,
                        "whatsapp_country",
                        (whatsappCountries[index] || DEFAULT_COUNTRY).iso2
                      );
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="w-full h-[45px] border border-dashed border-[#D1D1D1] rounded-[12px] flex items-center justify-center gap-[10px] cursor-pointer mt-5"
        onClick={handleAddShowroom}
      >
        <Add />
        <p className="text-[#2A32F8] text-base">{t("addShowroom")}</p>
      </div>
    </div>
  );
};

export default AddSalesShowrooms;
