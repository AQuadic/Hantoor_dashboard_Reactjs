import DashboardInput from "../general/DashboardInput";
import Add from "../icons/banks/Add";
import { useTranslation } from "react-i18next";
import MobileInput from "../general/MobileInput";
import { useState } from "react";
import { countries } from "countries-list";
import { AgentCenter } from "@/api/agents/fetchAgents";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};

interface AddSalesShowroomsProps {
  onAddCenter: (center: AgentCenter) => void;
  onRemoveCenter: (index: number) => void;
  centers: AgentCenter[];
  type: "center" | "show_room";
}

const AddSalesShowrooms: React.FC<AddSalesShowroomsProps> = ({
  onAddCenter,
  onRemoveCenter,
  centers,
  type,
}) => {
  const { t } = useTranslation("agents");
  const [selectedCountry, setSelectedCountry] = useState(
    getCountryByIso2("EG")
  );
  const [phone, setPhone] = useState("");
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [arDescription, setArDescription] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const handleAddShowroom = () => {
    if (!arName || !enName || !phone || !arDescription || !enDescription) {
      toast.error(t("pleaseCompleteAllFields"));
      return;
    }

    const newShowroom: AgentCenter = {
      name: {
        ar: arName,
        en: enName,
      },
      description: {
        ar: arDescription,
        en: enDescription,
      },
      phone,
      whatsapp: whatsapp || phone,
      type,
      is_active: "1",
    };

    onAddCenter(newShowroom);

    // Reset form
    setArName("");
    setEnName("");
    setArDescription("");
    setEnDescription("");
    setPhone("");
    setWhatsapp("");
  };
  return (
    <div className="bg-white mt-6 rounded-[15px]">
      <div className="flex flex-col md:flex-row gap-[15px]">
        <div className="w-full">
          <DashboardInput
            label={t("arShowRooms")}
            value={arName}
            onChange={setArName}
            placeholder={t("placeholderName")}
          />
        </div>
        <div className="w-full">
          <DashboardInput
            label={t("enShowRooms")}
            value={enName}
            onChange={setEnName}
            placeholder={t("placeholderName")}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-[15px] mt-4">
        <div className="w-full">
          <DashboardInput
            label={t("arAddress")}
            value={arDescription}
            onChange={setArDescription}
            placeholder={t("writeHere")}
          />
        </div>
        <div className="w-full">
          <DashboardInput
            label={t("enAddress")}
            value={enDescription}
            onChange={setEnDescription}
            placeholder={t("writeHere")}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-[15px] mt-4">
        <div className="relative w-full">
          <MobileInput
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            phone={phone}
            setPhone={setPhone}
          />
          <div className="absolute top-9 left-5"></div>
        </div>
        <div className="w-full">
          <DashboardInput
            label={t("whatsApp")}
            value={whatsapp}
            onChange={setWhatsapp}
            placeholder="123456789"
          />
        </div>
      </div>

      <div
        className="w-full h-[45px] border border-dashed border-[#D1D1D1] rounded-[12px] flex items-center justify-center gap-[10px] cursor-pointer mt-5"
        onClick={handleAddShowroom}
      >
        <Add />
        <p className="text-[#2A32F8] text-base">{t("addShowroom")}</p>
      </div>

      {/* Display added showrooms */}
      {centers.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-semibold">{t("addedShowrooms")}</h4>
          {centers.map((center, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">
                  {center.name.ar} / {center.name.en}
                </p>
                <p className="text-sm text-gray-600">{center.phone}</p>
              </div>
              <button
                onClick={() => onRemoveCenter(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddSalesShowrooms;
