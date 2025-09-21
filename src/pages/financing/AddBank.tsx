import DashboardButton from "@/components/general/dashboard/DashboardButton";
import ImageInput from "@/components/general/ImageInput";
import MobileInput from "@/components/general/MobileInput";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import React, { useEffect, useRef, useState } from "react";
import { countries } from "countries-list";

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
import DeleteModal from "@/components/general/DeleteModal";

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
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: "visitor" | "citizen";
    id: string;
  }>({ isOpen: false, type: "visitor", id: "" });

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

  // Visitor Data - Dynamic Array
  interface VisitorData {
    id: string;
    salaryFrom: string;
    salaryTo: string;
    interestAmount: string;
    duration: string;
    workplace: string;
  }

  const [visitorDataList, setVisitorDataList] = useState<VisitorData[]>([
    {
      id: "visitor-1",
      salaryFrom: "",
      salaryTo: "",
      interestAmount: "",
      duration: "",
      workplace: "",
    },
  ]);

  // Citizen Data - Dynamic Array
  interface CitizenData {
    id: string;
    salaryFrom: string;
    salaryTo: string;
    interestAmount: string;
    duration: string;
    workplace: string;
  }

  const [citizenDataList, setCitizenDataList] = useState<CitizenData[]>([
    {
      id: "citizen-1",
      salaryFrom: "",
      salaryTo: "",
      interestAmount: "",
      duration: "",
      workplace: "",
    },
  ]);

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

  // Functions to manage visitor data
  const isDeletingRef = useRef(false);

  const addVisitorData = () => {
    const newVisitorData: VisitorData = {
      id: `visitor-${Date.now()}`,
      salaryFrom: "",
      salaryTo: "",
      interestAmount: "",
      duration: "",
      workplace: "",
    };
    setVisitorDataList([...visitorDataList, newVisitorData]);
  };

  const showDeleteModal = (type: "visitor" | "citizen", id: string) => {
    setDeleteModal({ isOpen: true, type, id });
  };

  const handleDelete = () => {
    isDeletingRef.current = true;

    if (deleteModal.type === "visitor" && visitorDataList.length > 1) {
      setVisitorDataList(
        visitorDataList.filter((item) => item.id !== deleteModal.id)
      );
    } else if (deleteModal.type === "citizen" && citizenDataList.length > 1) {
      setCitizenDataList(
        citizenDataList.filter((item) => item.id !== deleteModal.id)
      );
    }

    setTimeout(() => {
      isDeletingRef.current = false;
    }, 50);
  };

  const updateVisitorData = (
    id: string,
    field: keyof VisitorData,
    value: string
  ) => {
    setVisitorDataList(
      visitorDataList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Functions to manage citizen data
  const addCitizenData = () => {
    const newCitizenData: CitizenData = {
      id: `citizen-${Date.now()}`,
      salaryFrom: "",
      salaryTo: "",
      interestAmount: "",
      duration: "",
      workplace: "",
    };
    setCitizenDataList([...citizenDataList, newCitizenData]);
  };

  const updateCitizenData = (
    id: string,
    field: keyof CitizenData,
    value: string
  ) => {
    setCitizenDataList(
      citizenDataList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

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
    // Basic bank information validation
    if (!arBankName.trim()) {
      toast.dismiss();
      toast.error(t("arabicBankName"));
      return false;
    }
    if (!enBankName.trim()) {
      toast.dismiss();
      toast.error(t("englishBankName"));
      return false;
    }
    if (!phone.trim()) {
      toast.dismiss();
      toast.error(t("phoneRequired"));
      return false;
    }
    if (phone.length > 20) {
      toast.dismiss();
      toast.error(t("phoneGreaterThan"));
      return false;
    }
    if (!selectedCountryId) {
      toast.dismiss();
      toast.error(t("countryRequired"));
      return false;
    }

    // Validate visitor data
    for (let i = 0; i < visitorDataList.length; i++) {
      const visitor = visitorDataList[i];
      const position = i + 1;

      if (!visitor.salaryFrom.trim()) {
        toast.dismiss();
        toast.error(t("visitorSalaryFromRequired", { position }));
        return false;
      }
      if (!visitor.salaryTo.trim()) {
        toast.dismiss();
        toast.error(t("visitorSalaryToRequired", { position }));
        return false;
      }

      // Check if salary fields are numeric
      const salaryFrom = parseInt(visitor.salaryFrom.replace(/\D/g, ""));
      const salaryTo = parseInt(visitor.salaryTo.replace(/\D/g, ""));

      if (isNaN(salaryFrom) || salaryFrom <= 0) {
        toast.dismiss();
        toast.error(t("visitorSalaryFromNumeric", { position }));
        return false;
      }
      if (isNaN(salaryTo) || salaryTo <= 0) {
        toast.dismiss();
        toast.error(t("visitorSalaryToNumeric", { position }));
        return false;
      }
      if (salaryFrom >= salaryTo) {
        toast.dismiss();
        toast.error(t("salaryFromLessThanTo", { position }));
        return false;
      }

      if (!visitor.duration) {
        toast.dismiss();
        toast.error(t("visitorDurationRequired", { position }));
        return false;
      }
      if (!visitor.workplace) {
        toast.dismiss();
        toast.error(t("visitorWorkplaceRequired", { position }));
        return false;
      }
      if (!visitor.interestAmount.trim()) {
        toast.dismiss();
        toast.error(t("visitorInterestRequired", { position }));
        return false;
      }
    }

    // Validate citizen data
    for (let i = 0; i < citizenDataList.length; i++) {
      const citizen = citizenDataList[i];
      const position = i + 1;

      if (!citizen.salaryFrom.trim()) {
        toast.dismiss();
        toast.error(t("citizenSalaryFromRequired", { position }));
        return false;
      }
      if (!citizen.salaryTo.trim()) {
        toast.dismiss();
        toast.error(t("citizenSalaryToRequired", { position }));
        return false;
      }

      // Check if salary fields are numeric
      const salaryFrom = parseInt(citizen.salaryFrom.replace(/\D/g, ""));
      const salaryTo = parseInt(citizen.salaryTo.replace(/\D/g, ""));

      if (isNaN(salaryFrom) || salaryFrom <= 0) {
        toast.dismiss();
        toast.error(t("citizenSalaryFromNumeric", { position }));
        return false;
      }
      if (isNaN(salaryTo) || salaryTo <= 0) {
        toast.dismiss();
        toast.error(t("citizenSalaryToNumeric", { position }));
        return false;
      }
      if (salaryFrom >= salaryTo) {
        toast.dismiss();
        toast.error(t("salaryFromLessThanTo", { position }));
        return false;
      }

      if (!citizen.duration) {
        toast.dismiss();
        toast.error(t("citizenDurationRequired", { position }));
        return false;
      }
      if (!citizen.workplace) {
        toast.dismiss();
        toast.error(t("citizenWorkplaceRequired", { position }));
        return false;
      }
      if (!citizen.interestAmount.trim()) {
        toast.dismiss();
        toast.error(t("citizenInterestRequired", { position }));
        return false;
      }
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

    // Add all visitor data entries as expatriate entries
    visitorDataList.forEach((visitorData) => {
      const v_from = parseInteger(visitorData.salaryFrom);
      const v_to = parseInteger(visitorData.salaryTo);
      const v_duration =
        resolveOption(authorities, visitorData.duration) ||
        resolveOption(authorities, authorities[0].key);
      const v_employer =
        resolveOption(Workplaces, visitorData.workplace) ||
        resolveOption(Workplaces, Workplaces[0].key);

      if (
        v_from !== undefined ||
        v_to !== undefined ||
        visitorData.interestAmount ||
        visitorData.duration ||
        visitorData.workplace
      ) {
        const entry: BankFinance = {
          type: "expatriate",
          salary_from: v_from,
          salary_to: v_to,
          duration: v_duration
            ? { key: v_duration.key, label: v_duration.label }
            : "",
          employer: v_employer
            ? { key: v_employer.key, label: v_employer.label }
            : "",
          value: visitorData.interestAmount || undefined,
          is_active: true,
        };
        finance.push(entry);
      }
    });

    // Add all citizen data entries
    citizenDataList.forEach((citizenData) => {
      const c_from = parseInteger(citizenData.salaryFrom);
      const c_to = parseInteger(citizenData.salaryTo);
      const c_duration =
        resolveOption(authorities, citizenData.duration) ||
        resolveOption(authorities, authorities[0].key);
      const c_employer =
        resolveOption(Workplaces, citizenData.workplace) ||
        resolveOption(Workplaces, Workplaces[0].key);

      if (
        c_from !== undefined ||
        c_to !== undefined ||
        citizenData.interestAmount ||
        citizenData.duration ||
        citizenData.workplace
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
          value: citizenData.interestAmount || undefined,
          is_active: true,
        };
        finance.push(entry);
      }
    });

    return finance;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if a delete action just happened from a delete button, ignore this submit
    if (isDeletingRef.current) {
      return;
    }

    if (!validateForm()) {
      return;
    }

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
        toast.success(response.message || t("bankAddedSuccessfully"));
        navigate(`/financing/details/${selectedCountryId}`, {
          state: {
            country: displayCountryName,
            countryId: Number(selectedCountryId),
          },
        });
        resetForm();
      } else {
        toast.error(response.message || t("failedToAddBank"));
      }
    } catch (error) {
      console.error("AddBank error:", error);
      toast.error(t("addBankError"));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setArBankName("");
    setEnBankName("");
    setPhone("");
    setProfileImage(null);
    setVisitorDataList([
      {
        id: "visitor-1",
        salaryFrom: "",
        salaryTo: "",
        interestAmount: "",
        duration: "",
        workplace: "",
      },
    ]);
    setCitizenDataList([
      {
        id: "citizen-1",
        salaryFrom: "",
        salaryTo: "",
        interestAmount: "",
        duration: "",
        workplace: "",
      },
    ]);
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
          {/* Dynamic Visitor Data Sections */}
          {visitorDataList.map((visitorData, index) => (
            <div
              key={visitorData.id}
              className="flex flex-col gap-4 max-w-[47%] flex-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className=" text-lg font-bold text-[#2A32F8]">
                    {t("visitorData")}{" "}
                    {visitorDataList.length > 1 && `(${index + 1})`}
                  </h3>
                  <h2 className="text-[15px] font-bold text-[#1E1B1B]">
                    {t("salaryRang")}
                  </h2>
                </div>
                {visitorDataList.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      showDeleteModal("visitor", visitorData.id);
                    }}
                    className="flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-[9px]">
                <DashboardInput
                  label={t("salaryFrom")}
                  value={visitorData.salaryFrom}
                  onChange={(value) =>
                    updateVisitorData(visitorData.id, "salaryFrom", value)
                  }
                  placeholder="5000 درهم"
                />
                <DashboardInput
                  label={t("salaryTo")}
                  value={visitorData.salaryTo}
                  onChange={(value) =>
                    updateVisitorData(visitorData.id, "salaryTo", value)
                  }
                  placeholder="5000 درهم"
                />
              </div>
              <Select
                label={t("duration")}
                variant="bordered"
                placeholder="1 سنة"
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
                value={visitorData.duration}
                onChange={(e) =>
                  updateVisitorData(visitorData.id, "duration", e.target.value)
                }
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
                value={visitorData.workplace}
                onChange={(e) =>
                  updateVisitorData(visitorData.id, "workplace", e.target.value)
                }
              >
                {Workplaces.map((w) => (
                  <SelectItem key={w.key} textValue={w.label}>
                    {w.label}
                  </SelectItem>
                ))}
              </Select>
              <DashboardInput
                label={t("InterestAmount")}
                value={visitorData.interestAmount}
                onChange={(value) =>
                  updateVisitorData(visitorData.id, "interestAmount", value)
                }
                placeholder="5%"
              />
            </div>
          ))}

          {/* Add New Visitor Data Button */}
          <div className="flex justify-center w-full mt-6">
            <button
              type="button"
              onClick={addVisitorData}
              className="px-4 py-2 text-sm font-medium text-[#2A32F8] bg-white border border-[#2A32F8] rounded-lg hover:bg-[#2A32F8] hover:text-white transition-colors duration-200"
            >
              {i18n.language === "ar"
                ? "+ إضافة بيانات وافد جديد"
                : "+ Add visitor data"}
            </button>
          </div>

          {/* Dynamic Citizen Data Sections */}
          {citizenDataList.map((citizenData, index) => (
            <div
              key={citizenData.id}
              className="flex flex-col gap-4 max-w-[47%] flex-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className=" text-lg font-bold text-[#2A32F8]">
                    {t("citizenData")}{" "}
                    {citizenDataList.length > 1 && `(${index + 1})`}
                  </h3>
                  <h2 className="text-[15px] font-bold text-[#1E1B1B]">
                    {t("salaryRang")}
                  </h2>
                </div>
                {citizenDataList.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      showDeleteModal("citizen", citizenData.id);
                    }}
                    className="flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-[9px]">
                <DashboardInput
                  label={t("salaryFrom")}
                  value={citizenData.salaryFrom}
                  onChange={(value) =>
                    updateCitizenData(citizenData.id, "salaryFrom", value)
                  }
                  placeholder="5000 درهم"
                />
                <DashboardInput
                  label={t("salaryTo")}
                  value={citizenData.salaryTo}
                  onChange={(value) =>
                    updateCitizenData(citizenData.id, "salaryTo", value)
                  }
                  placeholder="5000 درهم"
                />
              </div>
              <Select
                label={t("duration")}
                variant="bordered"
                placeholder="1 سنة"
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
                value={citizenData.duration}
                onChange={(e) =>
                  updateCitizenData(citizenData.id, "duration", e.target.value)
                }
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
                value={citizenData.workplace}
                onChange={(e) =>
                  updateCitizenData(citizenData.id, "workplace", e.target.value)
                }
              >
                {Workplaces.map((w) => (
                  <SelectItem key={w.key} textValue={w.label}>
                    {w.label}
                  </SelectItem>
                ))}
              </Select>
              <DashboardInput
                label={t("InterestAmount")}
                value={citizenData.interestAmount}
                onChange={(value) =>
                  updateCitizenData(citizenData.id, "interestAmount", value)
                }
                placeholder="5%"
              />
            </div>
          ))}

          {/* Add New Citizen Data Button */}
          <div className="flex justify-center w-full mt-6">
            <button
              type="button"
              onClick={addCitizenData}
              className="px-4 py-2 text-sm font-medium text-[#2A32F8] bg-white border border-[#2A32F8] rounded-lg hover:bg-[#2A32F8] hover:text-white transition-colors duration-200"
            >
              {i18n.language === "ar"
                ? "+ إضافة بيانات مواطن جديد"
                : "+ Add citizen data"}
            </button>
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

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onOpenChange={(isOpen) => setDeleteModal({ ...deleteModal, isOpen })}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default AddBank;
