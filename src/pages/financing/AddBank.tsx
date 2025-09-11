import DashboardButton from "@/components/general/dashboard/DashboardButton";
import ImageInput from "@/components/general/ImageInput";
import MobileInput from "@/components/general/MobileInput";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { countries } from "countries-list";
import Delete from "@/components/icons/banks/Delete";
import { useTranslation } from "react-i18next";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { toast } from "react-hot-toast";
import { getCountries } from "@/api/countries/getCountry";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  BankFinance,
  createBank,
  CreateBankPayload,
} from "@/api/bank/postBank";

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
  const params = useParams<{ countryId: string }>();
  console.log("Rendering AddBank", params.countryId);

  // Mirror FinancingDetails: prefer location.state country/countryId, fall back to URL param
  const country = location.state?.country;
  const countryId = location.state?.countryId || params.countryId;

  console.log(countryId);

  const [arBankName, setArBankName] = useState("");
  const [enBankName, setEnBankName] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState<string>(
    countryId ? String(countryId) : ""
  );
  const [displayCountryName, setDisplayCountryName] = useState<string>(
    country || ""
  );

  // Visitor Data
  const [visitorSalaryFrom, setVisitorSalaryFrom] = useState("");
  const [visitorSalaryTo, setVisitorSalaryTo] = useState("");
  const [visitorInterestAmount, setVisitorInterestAmount] = useState("");
  const [visitorDuration, setVisitorDuration] = useState("");
  const [visitorWorkplace, setVisitorWorkplace] = useState("");

  const [visitorSalaryFrom2, setVisitorSalaryFrom2] = useState("");
  const [visitorSalaryTo2, setVisitorSalaryTo2] = useState("");
  const [visitorInterestAmount2, setVisitorInterestAmount2] = useState("");
  const [visitorDuration2, setVisitorDuration2] = useState("");
  const [visitorWorkplace2, setVisitorWorkplace2] = useState("");

  // Citizen Data
  const [citizenSalaryFrom, setCitizenSalaryFrom] = useState("");
  const [citizenSalaryTo, setCitizenSalaryTo] = useState("");
  const [citizenInterestAmount, setCitizenInterestAmount] = useState("");
  const [citizenDuration, setCitizenDuration] = useState("");
  const [citizenWorkplace, setCitizenWorkplace] = useState("");

  const authorities = [
    { key: "1", label: "1 سنة" },
    { key: "2", label: "سنتين" },
    { key: "3", label: "3 سنوات" },
    { key: "4", label: "4 سنوات" },
    { key: "5", label: "5 سنوات" },
  ];

  const Workplaces = [
    { key: "1", label: "جهة حكومية" },
    { key: "2", label: "جهة خاصة" },
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries(1, "");

        if (countryId) {
          const found = response.data.find((c) => c.id === Number(countryId));
          if (found) {
            setDisplayCountryName(found.name[i18n.language as "ar" | "en"]);
          }
          setSelectedCountryId(String(countryId));
          return;
        }

        if (response.data.length > 0) {
          const fallbackCountry = response.data[0];
          setSelectedCountryId(fallbackCountry.id.toString());
          setDisplayCountryName(
            fallbackCountry.name[i18n.language as "ar" | "en"]
          );
        }
      } catch {
        setSelectedCountryId("21");
        setDisplayCountryName(i18n.language === "ar" ? "مصر" : "Egypt");
      }
    };
    fetchCountries();
  }, [countryId, i18n.language]);

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

  const buildFinanceArray = () => {
    const finance: BankFinance[] = [];

    // helpers
    const parseInteger = (val: string) => {
      if (!val && val !== "0") return undefined;
      const digits = String(val).replace(/\D/g, "");
      if (!digits) return undefined;
      const n = Number(digits);
      return Number.isFinite(n) ? n : undefined;
    };

    const resolveOption = (
      list: { key: string; label: string }[],
      selected?: string
    ) => {
      if (!selected) return undefined;
      const found = list.find(
        (l) => l.key === selected || l.label === selected
      );
      if (found) return { key: found.key, label: found.label };
      // fallback: treat selected as key
      return { key: selected, label: selected };
    };

    // Add expatriate 1 if fields are filled
    const v1_from = parseInteger(visitorSalaryFrom);
    const v1_to = parseInteger(visitorSalaryTo);
    const v1_duration =
      resolveOption(authorities, visitorDuration) ||
      resolveOption(authorities, authorities[0].key);
    const v1_employer =
      resolveOption(Workplaces, visitorWorkplace) ||
      resolveOption(Workplaces, Workplaces[0].key);

    if (
      v1_from !== undefined ||
      v1_to !== undefined ||
      visitorInterestAmount ||
      visitorDuration ||
      visitorWorkplace
    ) {
      const entry: BankFinance = {
        type: "expatriate",
        salary_from: v1_from,
        salary_to: v1_to,
        duration: v1_duration
          ? { key: v1_duration.key, label: v1_duration.label }
          : "",
        employer: v1_employer
          ? { key: v1_employer.key, label: v1_employer.label }
          : "",
        value: visitorInterestAmount || undefined,
        is_active: true,
      };
      finance.push(entry);
    }

    // Add expatriate 2 if fields are filled
    const v2_from = parseInteger(visitorSalaryFrom2);
    const v2_to = parseInteger(visitorSalaryTo2);
    const v2_duration =
      resolveOption(authorities, visitorDuration2) ||
      resolveOption(authorities, authorities[0].key);
    const v2_employer =
      resolveOption(Workplaces, visitorWorkplace2) ||
      resolveOption(Workplaces, Workplaces[0].key);

    if (
      v2_from !== undefined ||
      v2_to !== undefined ||
      visitorInterestAmount2 ||
      visitorDuration2 ||
      visitorWorkplace2
    ) {
      const entry: BankFinance = {
        type: "expatriate",
        salary_from: v2_from,
        salary_to: v2_to,
        duration: v2_duration
          ? { key: v2_duration.key, label: v2_duration.label }
          : "",
        employer: v2_employer
          ? { key: v2_employer.key, label: v2_employer.label }
          : "",
        value: visitorInterestAmount2 || undefined,
        is_active: true,
      };
      finance.push(entry);
    }

    // Add citizen if fields are filled
    const c_from = parseInteger(citizenSalaryFrom);
    const c_to = parseInteger(citizenSalaryTo);
    const c_duration =
      resolveOption(authorities, citizenDuration) ||
      resolveOption(authorities, authorities[0].key);
    const c_employer =
      resolveOption(Workplaces, citizenWorkplace) ||
      resolveOption(Workplaces, Workplaces[0].key);

    if (
      c_from !== undefined ||
      c_to !== undefined ||
      citizenInterestAmount ||
      citizenDuration ||
      citizenWorkplace
    ) {
      const entry: BankFinance = {
        type: "citizen",
        salary_from: c_from,
        salary_to: c_to,
        duration: c_duration
          ? { key: c_duration.key, label: c_duration.label }
          : "",
        employer: c_employer
          ? { key: c_employer.key, label: c_employer.label }
          : "",
        value: citizenInterestAmount || undefined,
        is_active: true,
      };
      finance.push(entry);
    }

    return finance;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const finance = buildFinanceArray();

      const payload: CreateBankPayload = {
        name: { ar: arBankName, en: enBankName },
        country_id: Number(selectedCountryId),
        phone,
        phone_country: selectedCountry.iso2,
        is_active: true,
        image: profileImage,
        finance,
      };

      // Debug: log payload being sent
      console.debug("AddBank:submitting payload", payload);

      const response = await createBank(payload);

      // Debug: log response
      console.debug("AddBank:createBank:response", response);

      if (response.success) {
        toast.success(response.message || "Bank added successfully!");
        navigate(`/financing/details/${selectedCountryId}`, {
          state: {
            country: displayCountryName,
            countryId: Number(selectedCountryId),
          },
        });
        resetForm();
      } else {
        toast.error(response.message || "Failed to add bank");
      }
    } catch (error) {
      toast.error(
        (error as Error).message || "An error occurred while adding the bank"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setArBankName("");
    setEnBankName("");
    setPhone("");
    setProfileImage(null);
    setVisitorSalaryFrom("");
    setVisitorSalaryTo("");
    setVisitorInterestAmount("");
    setVisitorDuration("");
    setVisitorWorkplace("");
    setVisitorSalaryFrom2("");
    setVisitorSalaryTo2("");
    setVisitorInterestAmount2("");
    setVisitorDuration2("");
    setVisitorWorkplace2("");
    setCitizenSalaryFrom("");
    setCitizenSalaryTo("");
    setCitizenInterestAmount("");
    setCitizenDuration("");
    setCitizenWorkplace("");
    setSelectedCountry(getCountryByIso2("EG"));
  };

  return (
    <section>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="اضافة بنك جديد"
          titleEn="Add bank"
          subtitleAr={displayCountryName}
          subtitleEn={displayCountryName}
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "التمويل", titleEn: "Financing", link: "/financing" },
            {
              titleAr: displayCountryName || "البلد",
              titleEn: displayCountryName || "Country",
              link: `/financing/details/${selectedCountryId}`,
            },
            { titleAr: "اضافة بنك جديد", titleEn: "Add bank" },
          ]}
        />
      </div>
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="p-8 bg-white rounded-2xl">
          <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">
            {t("bankLogo")}
          </h3>
          <ImageInput image={profileImage} setImage={setProfileImage} />
          <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
            <DashboardInput
              label={t("arbankName")}
              value={arBankName}
              onChange={setArBankName}
              placeholder={t("bankName")}
            />
            <DashboardInput
              label={t("enbankName")}
              value={enBankName}
              onChange={setEnBankName}
              placeholder={t("writeHere")}
            />
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
                value={visitorDuration}
                onChange={(e) => setVisitorDuration(e.target.value)}
              >
                {authorities.map((a) => (
                  <SelectItem key={a.key} textValue={a.label}>
                    {a.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label={t("Workplace")}
                variant="bordered"
                placeholder="جهة حكومية"
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
                value={visitorWorkplace}
                onChange={(e) => setVisitorWorkplace(e.target.value)}
              >
                {Workplaces.map((w) => (
                  <SelectItem key={w.key} textValue={w.label}>
                    {w.label}
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
                  <h3 className=" text-lg font-bold text-[#2A32F8]">
                    Expatriate 2
                  </h3>
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
                value={visitorDuration2}
                onChange={(e) => setVisitorDuration2(e.target.value)}
              >
                {authorities.map((a) => (
                  <SelectItem key={a.key} textValue={a.label}>
                    {a.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label={t("Workplace")}
                variant="bordered"
                placeholder="جهة حكومية"
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
                value={visitorWorkplace2}
                onChange={(e) => setVisitorWorkplace2(e.target.value)}
              >
                {Workplaces.map((w) => (
                  <SelectItem key={w.key} textValue={w.label}>
                    {w.label}
                  </SelectItem>
                ))}
              </Select>
              <DashboardInput
                label={t("InterestAmount")}
                value={visitorInterestAmount2}
                onChange={setVisitorInterestAmount2}
                placeholder="5%"
              />
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
                label={t("salaryTo")}
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
              value={citizenDuration}
              onChange={(e) => setCitizenDuration(e.target.value)}
            >
              {authorities.map((a) => (
                <SelectItem key={a.key} textValue={a.label}>
                  {a.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label={t("Workplace")}
              variant="bordered"
              placeholder="جهة حكومية"
              classNames={{ label: "mb-2 text-base !text-[#080808]" }}
              size="lg"
              value={citizenWorkplace}
              onChange={(e) => setCitizenWorkplace(e.target.value)}
            >
              {Workplaces.map((w) => (
                <SelectItem key={w.key} textValue={w.label}>
                  {w.label}
                </SelectItem>
              ))}
            </Select>
            <DashboardInput
              label={t("InterestAmount")}
              value={citizenInterestAmount}
              onChange={setCitizenInterestAmount}
              placeholder="5%"
            />
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
