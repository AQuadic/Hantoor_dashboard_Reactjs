import DashboardInput from "../general/DashboardInput";
import Add from "../icons/banks/Add";
import { useTranslation } from "react-i18next";
import MobileInput from "../general/MobileInput";
import { AgentCenter } from "@/api/agents/fetchAgents";
import { useState } from "react";
import { X } from "lucide-react";

type CountryType = {
  iso2: string;
  name: string;
  phone: string[];
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
  const defaultCountry: CountryType = { iso2: "EG", name: "Egypt", phone: ["20"] };
  const [whatsappCountries, setWhatsappCountries] = useState<CountryType[]>(centers.map(() => defaultCountry));
  const [phoneCountries, setPhoneCountries] = useState<CountryType[]>(
    centers.map(() => defaultCountry)
  );

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
    setWhatsappCountries([...whatsappCountries, defaultCountry]);
    setPhoneCountries([...phoneCountries, defaultCountry]);
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
                  selectedCountry={phoneCountries[index] || defaultCountry}
                  setSelectedCountry={(country: CountryType) => {
                    const newCountries = [...phoneCountries];
                    newCountries[index] = country;
                    setPhoneCountries(newCountries);

                    if (centers[index].phone) {
                      const number = String(centers[index].phone).replace(/^\d+\s+/, "");
                      handleShowroomChange(
                        index,
                        "phone",
                        `${country.phone[0]} ${number}`
                      );
                    }
                  }}
                  phone={(center.phone || "").replace(/^\d+\s+/, "")}
                  setPhone={(val: string) =>
                    handleShowroomChange(
                      index,
                      "phone",
                      `${(phoneCountries[index] || defaultCountry).phone[0]} ${val}`
                    )
                  }
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
                  selectedCountry={whatsappCountries[index] || defaultCountry}
                  setSelectedCountry={(country: {
                    iso2: string;
                    name: string;
                    phone: string[];
                  }) => {
                    const newCountries = [...whatsappCountries];
                    newCountries[index] = country;
                    setWhatsappCountries(newCountries);
                    // If a number is already present, update the value with new country code
                    if (centers[index].whatsapp) {
                      const number = centers[index].whatsapp.replace(
                        /^\d+\s*/,
                        ""
                      );
                      handleShowroomChange(
                        index,
                        "whatsapp",
                        `${country.phone[0]} ${number}`
                      );
                    }
                  }}
                  phone={(center.whatsapp || "").replace(/^\d+\s*/, "")}
                  setPhone={(val: string) =>
                    handleShowroomChange(
                      index,
                      "whatsapp",
                      `${
                        (whatsappCountries[index] || defaultCountry).phone[0]
                      } ${val}`
                    )
                  }
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
