import DashboardButton from "@/components/general/dashboard/DashboardButton";
import ImageInput from "@/components/general/ImageInput";
import MobileInput from "@/components/general/MobileInput";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { countries } from "countries-list";
import Add from "@/components/icons/banks/Add";
import Delete from "@/components/icons/banks/Delete";
import { useTranslation } from "react-i18next";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { toast } from "react-hot-toast";
import { createRequestFinancing, CreateRequestFinancingParams } from "@/api/financing/addFinancing";
import { getCountries, Country } from "@/api/countries/getCountry";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getRequestFinancingById } from "@/api/financing/getFinancinyById";

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};

const AddBank = () => {
  const { t, i18n } = useTranslation("financing");
  const [selectedCountry, setSelectedCountry] = useState(
    getCountryByIso2("EG")
  );
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const countryIdFromLocation = location.state?.countryId;
  const countryNameFromLocation = location.state?.countryName;

  // Bank name states
  const [arBankName, setArBankName] = useState("");
  const [enBankName, setEnBankName] = useState("");
  
  const [selectedCountryId, setSelectedCountryId] = useState<string>(
    countryIdFromLocation?.toString() || ""
  );

  const [displayCountryName, setDisplayCountryName] = useState<string>(
    countryNameFromLocation || ""
  );

  const [countries, setCountries] = useState<Country[]>([]);
  const [, setCountriesLoading] = useState(true);

  // Visitor data states
  const [visitorSalaryFrom, setVisitorSalaryFrom] = useState("");
  const [visitorSalaryTo, setVisitorSalaryTo] = useState("");
  const [visitorInterestAmount, setVisitorInterestAmount] = useState("");

  // Second visitor data states (for duplicated section)
  const [visitorSalaryFrom2, setVisitorSalaryFrom2] = useState("");
  const [visitorSalaryTo2, setVisitorSalaryTo2] = useState("");
  const [visitorInterestAmount2, setVisitorInterestAmount2] = useState("");

  // Citizen data states
  const [citizenSalaryFrom, setCitizenSalaryFrom] = useState("");
  const [citizenSalaryTo, setCitizenSalaryTo] = useState("");
  const [citizenInterestAmount, setCitizenInterestAmount] = useState("");
  const authorities = [
    { key: "1", label: "1 سنة" },
    { key: "2", label: "سنتين" },
    { key: "3", label: "3 سنوات" },
    { key: "4", label: "4 سنوات" },
    { key: "5", label: "5 سنوات" },
  ];

  const { id } = useParams();

  useEffect(() => {
    const fetchCountriesAndCountryName = async () => {
      try {
        setCountriesLoading(true);
        const response = await getCountries(1, "");
        setCountries(response.data);

        let countryId = countryIdFromLocation;

        if (!countryId && id) {
          try {
            const request = await getRequestFinancingById(Number(id));
            countryId = request[0]?.country_id;
          } catch (error) {
            console.error("Error fetching request financing:", error);
          }
        }

        if (countryId && response.data.length > 0) {
          const foundCountry = response.data.find((c) => c.id === Number(countryId));
          if (foundCountry) {
            const updatedCountryId = foundCountry.id.toString();
            const updatedCountryName = foundCountry.name[i18n.language as "ar" | "en"];
            
            setSelectedCountryId(updatedCountryId);
            setDisplayCountryName(updatedCountryName);
            
            console.log("Selected country ID:", updatedCountryId);
            console.log("Selected country name:", updatedCountryName);
          }
        } else if (response.data.length > 0) {
          const fallbackCountry = response.data[0];
          const fallbackCountryId = fallbackCountry.id.toString();
          const fallbackCountryName = fallbackCountry.name[i18n.language as "ar" | "en"];
          
          setSelectedCountryId(fallbackCountryId);
          setDisplayCountryName(fallbackCountryName);
          
          console.log("Using fallback country ID:", fallbackCountryId);
          console.log("Using fallback country name:", fallbackCountryName);
        }

      } catch (error) {
        console.error("Error fetching countries:", error);
        setSelectedCountryId("21");
        setDisplayCountryName(i18n.language === "ar" ? "مصر" : "Egypt");
      } finally {
        setCountriesLoading(false);
      }
    };

    fetchCountriesAndCountryName();
  }, [id, i18n.language, countryIdFromLocation, countryNameFromLocation]);

  useEffect(() => {
    console.log("Current selectedCountryId:", selectedCountryId);
    console.log("Current displayCountryName:", displayCountryName);
  }, [selectedCountryId, displayCountryName]);

  const entities = [
    { key: "1", label: "جهة حكومية" },
    { key: "2", label: "جهة خاصة" },
  ];

  const Workplaces = [
    { key: "1", label: "جهة حكومية" },
    { key: "2", label: "جهة خاصة" },
  ];

  const validateForm = () => {
    if (!arBankName.trim()) {
      toast.error("Arabic bank name is required");
      return false;
    }
    if (!enBankName.trim()) {
      toast.error("English bank name is required");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (phone.length > 20) {
      toast.error("Phone must not be greater than 20 characters");
      return false;
    }
    if (!selectedCountryId) {
      toast.error("Country is required");
      return false;
    }
    return true;
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  let finalCountryId = selectedCountryId;
  let finalCountryName = displayCountryName;

  if (!finalCountryId && countries.length > 0) {
    finalCountryId = countries[0].id.toString();
    finalCountryName = countries[0].name[i18n.language as "ar" | "en"];
    
    setSelectedCountryId(finalCountryId);
    setDisplayCountryName(finalCountryName);
  }

  if (!finalCountryId) {
    finalCountryId = "21";
    finalCountryName = i18n.language === "ar" ? "مصر" : "Egypt";
  }

  console.log("Final submitting countryId:", finalCountryId);
  console.log("Final submitting countryName:", finalCountryName);

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);
  try {
    const params: CreateRequestFinancingParams = {
      phone,
      country_id: Number(finalCountryId),
      is_active: true,
      name: {
        ar: arBankName,
        en: enBankName,
      },
    };

    const response = await createRequestFinancing(params);
    if (response.success) {
      toast.success(response.message || "Bank added successfully!");
      
      navigate(`/financing/details/${finalCountryId}`, {
        state: {
          country: finalCountryName,
          countryId: Number(finalCountryId),
        },
        replace: true,
      });
      resetForm();
    } else {
      toast.error(response.message || "Failed to add bank");
    }
  } catch (error: any) {
    console.error("Error adding bank:", error);
    toast.error(error.message || "An error occurred while adding the bank");
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  const fetchCountriesAndCountryName = async () => {
    try {
      setCountriesLoading(true);
      const response = await getCountries(1, "");
      setCountries(response.data);

      let countryId = countryIdFromLocation;

      const numericCountryId = countryId ? Number(countryId) : null;

      if (!numericCountryId && id) {
        try {
          const request = await getRequestFinancingById(Number(id));
          countryId = request[0]?.country_id?.toString();
        } catch (error) {
          console.error("Error fetching request financing:", error);
        }
      }

      if (countryId && response.data.length > 0) {
        const foundCountry = response.data.find((c) => c.id === Number(countryId));
        if (foundCountry) {
          const updatedCountryId = foundCountry.id.toString();
          const updatedCountryName = foundCountry.name[i18n.language as "ar" | "en"];
          
          setSelectedCountryId(updatedCountryId);
          setDisplayCountryName(updatedCountryName);
          
          console.log("Selected country ID:", updatedCountryId);
          console.log("Selected country name:", updatedCountryName);
        } else {
          console.warn("Country not found in fetched countries list:", countryId);
        }
      } else if (response.data.length > 0) {
        const fallbackCountry = response.data[0];
        const fallbackCountryId = fallbackCountry.id.toString();
        const fallbackCountryName = fallbackCountry.name[i18n.language as "ar" | "en"];
        
        setSelectedCountryId(fallbackCountryId);
        setDisplayCountryName(fallbackCountryName);
        
        console.log("Using fallback country ID:", fallbackCountryId);
        console.log("Using fallback country name:", fallbackCountryName);
      }

    } catch (error) {
      console.error("Error fetching countries:", error);
      setSelectedCountryId("21");
      setDisplayCountryName(i18n.language === "ar" ? "مصر" : "Egypt");
    } finally {
      setCountriesLoading(false);
    }
  };

  fetchCountriesAndCountryName();
}, [id, i18n.language, countryIdFromLocation, countryNameFromLocation]);

  const resetForm = () => {
    setArBankName("");
    setEnBankName("");
    setPhone("");
    setProfileImage(null);
    setVisitorSalaryFrom("");
    setVisitorSalaryTo("");
    setVisitorInterestAmount("");
    setVisitorSalaryFrom2("");
    setVisitorSalaryTo2("");
    setVisitorInterestAmount2("");
    setCitizenSalaryFrom("");
    setCitizenSalaryTo("");
    setCitizenInterestAmount("");
    setSelectedCountry(getCountryByIso2("EG"));
  };

  return (
    <section>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="اضافة بنك جديد"
          titleEn="Add bank"
          subtitleAr={displayCountryName ? `${displayCountryName}` : ""}
          subtitleEn={displayCountryName ? `${displayCountryName}` : ""}
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "التمويل", titleEn: "Financing", link: "/financing" },
            { titleAr: displayCountryName || "البلد", titleEn: displayCountryName || "Country", link: `/financing/details/${selectedCountryId}` },
            { titleAr: "اضافة بنك جديد", titleEn: "Add bank" },
          ]}
        />
      </div>
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="p-8 bg-white rounded-2xl ">
          <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">
            {t("bankLogo")}
          </h3>
          <ImageInput image={profileImage} setImage={setProfileImage} />
          <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
            {/* Arabic bank */}
            <div className="relative w-full">
              <DashboardInput
                label={t("arbankName")}
                value={arBankName}
                onChange={setArBankName}
                placeholder={t("bankName")}
              />
            </div>
            {/* English bank */}
            <div className="relative w-full">
              <DashboardInput
                label={t("enbankName")}
                value={enBankName}
                onChange={setEnBankName}
                placeholder={t("writeHere")}
              />
            </div>
          </div>
          <div className="mt-[15px]">
            <MobileInput
              label={t("phone")}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              phone={phone}
              setPhone={setPhone}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-6 p-8 mt-8 bg-white rounded-2xl !text-base">
          <div>
            <div className="flex flex-col flex-1 gap-4">
              <h3 className=" text-lg font-bold text-[#2A32F8]">
                {t("visitorData")}
              </h3>
              <h2 className="text-[15px] font-bold text-[#1E1B1B]">
                {t("salaryRang")}
              </h2>
              <div className="flex items-center gap-[9px]">
                <DashboardInput
                  label={t("salaryFrom")}
                  value={visitorSalaryFrom}
                  onChange={setVisitorSalaryFrom}
                  placeholder="5000 درهم"
                />
                <DashboardInput
                  label={t("salaryTo")}
                  value={visitorSalaryTo}
                  onChange={setVisitorSalaryTo}
                  placeholder="5000 درهم"
                />
              </div>
              <Select
                label={t("duration")}
                variant="bordered"
                placeholder="1 سنة"
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
              >
                {authorities.map((authority) => (
                  <SelectItem key={authority.key} textValue={authority.label}>
                    {authority.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label={t("Workplace")}
                variant="bordered"
                placeholder="جهة حكومية"
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
              >
                {entities.map((entitiy) => (
                  <SelectItem key={entitiy.key} textValue={entitiy.label}>
                    {entitiy.label}
                  </SelectItem>
                ))}
              </Select>
              <DashboardInput
                label={t("InterestAmount")}
                value={visitorInterestAmount}
                onChange={setVisitorInterestAmount}
                placeholder="5%"
              />
            </div>
            <hr className="my-4" />
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className=" text-lg font-bold text-[#2A32F8]"></h3>
                  <h2 className="text-[15px] font-bold text-[#1E1B1B] mt-2">
                    {t("salaryRang")}
                  </h2>
                </div>
                <Delete />
              </div>
              <div className="flex items-center gap-[9px]">
                <DashboardInput
                  label={t("salaryFrom")}
                  value={visitorSalaryFrom2}
                  onChange={setVisitorSalaryFrom2}
                  placeholder="5000 درهم"
                />
                <DashboardInput
                  label={t("salaryTo")}
                  value={visitorSalaryTo2}
                  onChange={setVisitorSalaryTo2}
                  placeholder="5000 درهم"
                />
              </div>
              <Select
                label={t("duration")}
                variant="bordered"
                placeholder="1 سنة"
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
              >
                {authorities.map((authority) => (
                  <SelectItem key={authority.key} textValue={authority.label}>
                    {authority.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label={t("Workplace")}
                variant="bordered"
                placeholder="جهة حكومية"
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
              >
                {Workplaces.map((workplace) => (
                  <SelectItem key={workplace.key} textValue={workplace.label}>
                    {workplace.label}
                  </SelectItem>
                ))}
              </Select>
              <DashboardInput
                label={t("InterestAmount")}
                value={visitorInterestAmount2}
                onChange={setVisitorInterestAmount2}
                placeholder="5%"
              />

              <div className="w-full h-[45px] border border-dashed border-[#D1D1D1] rounded-[12px] flex items-center justify-center gap-[10px] cursor-pointer">
                <Add />
                <p className="text-[#2A32F8] text-base">{t("addMoreData")}</p>
              </div>
              <DashboardButton titleAr="اضافة" titleEn="Add" />
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-4">
            <h3 className=" text-lg font-bold text-[#2A32F8]">
              {t("citizenData")}
            </h3>
            <h2 className="text-[15px] font-bold text-[#1E1B1B]">
              {t("salaryRang")}
            </h2>
            <div className="flex items-center gap-[9px]">
              <DashboardInput
                label={t("salaryFrom")}
                value={citizenSalaryFrom}
                onChange={setCitizenSalaryFrom}
                placeholder="5000 درهم"
              />
              <DashboardInput
                label="المرتب الى"
                value={citizenSalaryTo}
                onChange={setCitizenSalaryTo}
                placeholder="5000 درهم"
              />
            </div>
            <Select
              label={t("duration")}
              variant="bordered"
              placeholder="1 سنة"
              classNames={{ label: "mb-2 text-base !text-[#080808]" }}
              size="lg"
            >
              {authorities.map((authority) => (
                <SelectItem key={authority.key} textValue={authority.label}>
                  {authority.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label={t("Workplace")}
              variant="bordered"
              placeholder="جهة حكومية"
              classNames={{ label: "mb-2 text-base !text-[#080808]" }}
              size="lg"
            >
              {Workplaces.map((workplace) => (
                <SelectItem key={workplace.key} textValue={workplace.label}>
                  {workplace.label}
                </SelectItem>
              ))}
            </Select>
            <DashboardInput
              label={t("InterestAmount")}
              value={citizenInterestAmount}
              onChange={setCitizenInterestAmount}
              placeholder="5%"
            />
            <div className="w-full h-[45px] border border-dashed border-[#D1D1D1] rounded-[12px] flex items-center justify-center gap-[10px] cursor-pointer">
              <Add />
              <p className="text-[#2A32F8] text-base">{t("addMoreData")}</p>
            </div>
            <DashboardButton titleAr="اضافة" titleEn="Add" />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <DashboardButton 
            titleAr={isLoading ? "جاري الاضافة..." : "اضافة"} 
            titleEn={isLoading ? "Adding..." : "Add"} 
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default AddBank;
