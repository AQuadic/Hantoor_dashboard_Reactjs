import DashboardButton from "@/components/general/dashboard/DashboardButton";
import ImageInput from "@/components/general/ImageInput";
import MobileInput from "@/components/general/MobileInput";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import React, { useState, useEffect } from "react";
import { countries } from "countries-list";
import DeleteModal from "@/components/general/DeleteModal";
import { useTranslation } from "react-i18next";
import i18n from "../../hooks/i18n";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getBankById, Bank } from "@/api/bank/getBankById";
import Loading from "@/components/general/Loading";
import NoData from "@/components/general/NoData";
import { updateBankById, UpdateBankPayload } from "@/api/bank/editBank";
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

const EditBank = () => {
  const { t } = useTranslation("financing");
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  // Typing as any because backend response shape is used directly in multiple places below
  const { data, isLoading, error } = useQuery<Bank>({
    queryKey: ["bank", Number(id)],
    queryFn: () => getBankById(Number(id)),
    enabled: !!id,
  });

  const [selectedCountry, setSelectedCountry] = useState(
    getCountryByIso2("EG")
  );
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  // Bank name states
  const [arBankName, setArBankName] = useState("");
  const [enBankName, setEnBankName] = useState("");

  // Dynamic arrays for visitor data
  type RowData = {
    salaryFrom: string;
    salaryTo: string;
    employerName: string;
    value: string;
    duration: string;
    type?: "citizen" | "expatriate";
  };

  const [visitorDataList, setVisitorDataList] = useState<RowData[]>([
    {
      salaryFrom: "",
      salaryTo: "",
      employerName: "",
      value: "",
      duration: "",
      type: "expatriate",
    },
  ]);

  // Dynamic arrays for citizen data
  const [citizenDataList, setCitizenDataList] = useState<RowData[]>([
    {
      salaryFrom: "",
      salaryTo: "",
      employerName: "",
      value: "",
      duration: "",
      type: "citizen",
    },
  ]);

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<"visitor" | "citizen" | null>(
    null
  );

  const navigate = useNavigate();
  const authorities = [
    { key: "1", label: "1 سنة" },
    { key: "2", label: "سنتين" },
    { key: "3", label: "3 سنوات" },
    { key: "4", label: "4 سنوات" },
    { key: "5", label: "5 سنوات" },
  ];

  // typesOptions removed — render labels inline to avoid unused variable

  // Workplace/entity lists removed; employer is now a free-text field and type is explicit.

  useEffect(() => {
    if (data) {
      setArBankName(data.name.ar || "");
      setEnBankName(data.name.en || "");
      setPhone(data.phone || "");
      setSelectedCountry(getCountryByIso2(data.phone_country || "EG"));
      setExistingImageUrl(data.image?.url || null);

      const expatriates =
        data.finance?.filter((f) => f.type === "expatriate") || [];
      const citizens = data.finance?.filter((f) => f.type === "citizen") || [];

      // Map expatriate data to visitor array
      if (expatriates.length > 0) {
        const mappedVisitorData = expatriates.map((exp) => ({
          salaryFrom: exp.salary_from?.toString() || "",
          salaryTo: exp.salary_to?.toString() || "",
          employerName: exp.employer || "",
          value: exp.value?.toString() || "",
          duration: exp.duration || "",
          type: exp.type || "expatriate",
        }));
        setVisitorDataList(mappedVisitorData);
      } else {
        setVisitorDataList([
          {
            salaryFrom: "",
            salaryTo: "",
            employerName: "",
            value: "",
            duration: "",
            type: "expatriate",
          },
        ]);
      }

      // Map citizen data to citizen array
      if (citizens.length > 0) {
        const mappedCitizenData = citizens.map((citizen) => ({
          salaryFrom: citizen.salary_from?.toString() || "",
          salaryTo: citizen.salary_to?.toString() || "",
          employerName: citizen.employer || "",
          value: citizen.value?.toString() || "",
          duration: citizen.duration || "",
          type: citizen.type || "citizen",
        }));
        setCitizenDataList(mappedCitizenData);
      } else {
        setCitizenDataList([
          {
            salaryFrom: "",
            salaryTo: "",
            employerName: "",
            value: "",
            duration: "",
            type: "citizen",
          },
        ]);
      }

      // Note: image is handled by ImageInput component directly
    }
  }, [data]);

  // Handler functions for visitor data
  const addVisitorData = () => {
    setVisitorDataList([
      ...visitorDataList,
      {
        salaryFrom: "",
        salaryTo: "",
        employerName: "",
        value: "",
        duration: "",
        type: "expatriate",
      },
    ]);
  };

  const removeVisitorData = (index: number) => {
    if (visitorDataList.length > 1) {
      const updatedList = visitorDataList.filter((_, i) => i !== index);
      setVisitorDataList(updatedList);
    }
  };

  const updateVisitorData = (index: number, field: string, value: string) => {
    const updatedList = visitorDataList.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setVisitorDataList(updatedList);
  };

  // Handler functions for citizen data
  const addCitizenData = () => {
    setCitizenDataList([
      ...citizenDataList,
      {
        salaryFrom: "",
        salaryTo: "",
        employerName: "",
        value: "",
        duration: "",
        type: "citizen",
      },
    ]);
  };

  const removeCitizenData = (index: number) => {
    if (citizenDataList.length > 1) {
      const updatedList = citizenDataList.filter((_, i) => i !== index);
      setCitizenDataList(updatedList);
    }
  };

  const updateCitizenData = (index: number, field: string, value: string) => {
    const updatedList = citizenDataList.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setCitizenDataList(updatedList);
  };

  // Delete modal handlers
  const handleDeleteClick = (index: number, type: "visitor" | "citizen") => {
    setDeleteIndex(index);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteIndex !== null && deleteType) {
      if (deleteType === "visitor") {
        removeVisitorData(deleteIndex);
      } else {
        removeCitizenData(deleteIndex);
      }
    }
    setShowDeleteModal(false);
    setDeleteIndex(null);
    setDeleteType(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
    setDeleteType(null);
  };

  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // helpers moved out of validateForm to reduce complexity
  const parseSalary = (s: string) => {
    const n = parseInt(s.replace(/\D/g, ""));
    if (isNaN(n) || n <= 0) return null;
    return n;
  };

  const validateList = (
    list: typeof visitorDataList | typeof citizenDataList,
    kind: "visitor" | "citizen"
  ) => {
    const checkSalaryRange = (
      salaryFromStr: string,
      salaryToStr: string,
      position: number
    ) => {
      const salaryFrom = parseSalary(salaryFromStr);
      const salaryTo = parseSalary(salaryToStr);

      if (salaryFrom === null) {
        toast.error(t(`${kind}SalaryFromNumeric`, { position }));
        return false;
      }
      if (salaryTo === null) {
        toast.error(t(`${kind}SalaryToNumeric`, { position }));
        return false;
      }
      if (salaryFrom >= salaryTo) {
        toast.error(t("salaryFromLessThanTo", { position }));
        return false;
      }
      return true;
    };

    const checkTextFields = (
      duration: string,
      employerName: string,
      value: string,
      position: number
    ) => {
      if (!duration) {
        toast.error(t(`${kind}DurationRequired`, { position }));
        return false;
      }
      if (!employerName.trim()) {
        toast.error(t(`${kind}WorkplaceRequired`, { position }));
        return false;
      }
      if (!value.trim()) {
        toast.error(t(`${kind}InterestRequired`, { position }));
        return false;
      }
      return true;
    };

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const position = i + 1;

      if (!item.salaryFrom.trim()) {
        toast.error(t(`${kind}SalaryFromRequired`, { position }));
        return false;
      }
      if (!item.salaryTo.trim()) {
        toast.error(t(`${kind}SalaryToRequired`, { position }));
        return false;
      }

      if (!checkSalaryRange(item.salaryFrom, item.salaryTo, position))
        return false;
      if (
        !checkTextFields(item.duration, item.employerName, item.value, position)
      )
        return false;

      // Validate type presence
      // item may come from fetched data; ensure it has a valid type
      // type is derived from which list (visitor => expatriate, citizen => citizen)
    }

    return true;
  };

  const validateForm = () => {
    // Basic bank information validation
    if (!arBankName.trim()) {
      toast.error(t("arabicBankName"));
      return false;
    }
    if (!enBankName.trim()) {
      toast.error(t("englishBankName"));
      return false;
    }
    if (!phone.trim()) {
      toast.error(t("phoneRequired"));
      return false;
    }
    if (phone.length > 20) {
      toast.error(t("phoneGreaterThan"));
      return false;
    }
    if (!data?.country_id) {
      toast.error(t("countryRequired") || "Country is required");
      return false;
    }

    // Require an image: either a newly selected file or the existing image URL
    if (!profileImage && !existingImageUrl) {
      toast.error(t("imageRequired") || "Image is required");
      return false;
    }

    if (!validateList(visitorDataList, "visitor")) return false;
    if (!validateList(citizenDataList, "citizen")) return false;

    return true;
  };

  const handleUpdateBank = async () => {
    if (isSubmitting) return;
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    // Build finance array from dynamic arrays (type derived from which list)
    const financeArray = [
      ...visitorDataList.map((visitor) => ({
        type: "expatriate" as const,
        salary_from: Number(visitor.salaryFrom) || 0,
        salary_to: Number(visitor.salaryTo) || 0,
        duration: visitor.duration,
        employer: visitor.employerName,
        value: visitor.value,
      })),
      ...citizenDataList.map((citizen) => ({
        type: "citizen" as const,
        salary_from: Number(citizen.salaryFrom) || 0,
        salary_to: Number(citizen.salaryTo) || 0,
        duration: citizen.duration,
        employer: citizen.employerName,
        value: citizen.value,
      })),
    ];

    const payload: UpdateBankPayload = {
      name: { ar: arBankName, en: enBankName },
      country_id: data?.country_id || 1,
      phone,
      phone_country: selectedCountry.iso2,
      image: profileImage,
      finance: financeArray,
    };

    try {
      const res = await updateBankById(Number(id), payload);

      if (res.message === "Updated successfully") {
        toast.success(t("bankUpdatedSuccessfully"));

        queryClient.setQueryData(["bank", Number(id)], res.data);

        const fromDetailsId = location.state?.fromDetailsId;
        const backId = fromDetailsId || id;
        navigate(`/financing/details/${backId}`);
      } else {
        toast.error(res.message || t("failedToUpdateBank"));
      }
    } catch (error: unknown) {
      console.error("Update bank error:", error);
      // try to read axios-like error shape safely
      type AxiosLike = {
        response?: { data?: { errors?: Record<string, string[] | string> } };
      };
      const axiosErr = error as AxiosLike;
      if (axiosErr?.response?.data?.errors) {
        toast.error(
          Object.values(axiosErr.response.data.errors).flat().join(", ")
        );
      } else {
        toast.error(t("updateBankError"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <NoData />;

  return (
    <section>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="تعديل البنك"
          titleEn="Edit bank"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الوكلاء", titleEn: "Agents", link: "/" },
            { titleAr: "البنوك", titleEn: "Banks", link: "/" },
            { titleAr: "تعديل البنك", titleEn: "Edit bank" },
          ]}
        />
      </div>
      <form className="p-8">
        <div className="p-8 bg-white rounded-2xl ">
          <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">
            {t("bankLogo")}
          </h3>
          <ImageInput
            image={profileImage}
            setImage={setProfileImage}
            existingImageUrl={existingImageUrl || undefined}
            onRemoveImage={() => {
              // Clear both the selected file and the existing image url without reloading
              setProfileImage(null);
              setExistingImageUrl(null);
            }}
          />
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
          {/* Dynamic Visitor Data Sections */}
          {visitorDataList.map((visitor, index) => (
            <div
              key={`visitor-${index}-${visitor.salaryFrom}-${visitor.employerName}`}
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
                      handleDeleteClick(index, "visitor");
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
                  value={visitor.salaryFrom}
                  onChange={(value) =>
                    updateVisitorData(index, "salaryFrom", value)
                  }
                  placeholder="5000 درهم"
                />
                <DashboardInput
                  label={t("salaryTo")}
                  value={visitor.salaryTo}
                  onChange={(value) =>
                    updateVisitorData(index, "salaryTo", value)
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
                selectedKeys={visitor.duration ? [visitor.duration] : []}
                onChange={(e) =>
                  updateVisitorData(index, "duration", e.target.value)
                }
              >
                {authorities.map((authority) => (
                  <SelectItem key={authority.key} textValue={authority.key}>
                    {authority.label}
                  </SelectItem>
                ))}
              </Select>
              {/* Employer select (translated) */}
              <Select
                label={t("Workplace")}
                variant="bordered"
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
                selectedKeys={
                  visitor.employerName ? [visitor.employerName] : []
                }
                onChange={(e) =>
                  updateVisitorData(index, "employerName", e.target.value)
                }
              >
                <SelectItem key="private_party" >
                  {i18n.language === "ar" ? "قطاع خاص" : "Private party"}
                </SelectItem>
                <SelectItem key="government">
                  {i18n.language === "ar" ? "حكومي" : "Government"}
                </SelectItem>
              </Select>
              <DashboardInput
                label={t("InterestAmount")}
                value={visitor.value}
                onChange={(value) => updateVisitorData(index, "value", value)}
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
          {citizenDataList.map((citizen, index) => (
            <div
              key={`citizen-${index}-${citizen.salaryFrom}-${citizen.employerName}`}
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
                      handleDeleteClick(index, "citizen");
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
                  value={citizen.salaryFrom}
                  onChange={(value) =>
                    updateCitizenData(index, "salaryFrom", value)
                  }
                  placeholder="5000 درهم"
                />
                <DashboardInput
                  label={t("salaryTo")}
                  value={citizen.salaryTo}
                  onChange={(value) =>
                    updateCitizenData(index, "salaryTo", value)
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
                selectedKeys={citizen.duration ? [citizen.duration] : []}
                onChange={(e) =>
                  updateCitizenData(index, "duration", e.target.value)
                }
              >
                {authorities.map((authority) => (
                  <SelectItem key={authority.key} textValue={authority.key}>
                    {authority.label}
                  </SelectItem>
                ))}
              </Select>
              {/* Employer select (translated) */}
              <Select
                label={t("Workplace")}
                variant="bordered"
                classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                size="lg"
                selectedKeys={
                  citizen.employerName ? [citizen.employerName] : []
                }
                onChange={(e) =>
                  updateCitizenData(index, "employerName", e.target.value)
                }
              >
                <SelectItem key="private_party">
                  {i18n.language === "ar" ? "قطاع خاص" : "Private party"}
                </SelectItem>
                <SelectItem key="government" >
                  {i18n.language === "ar" ? "حكومي" : "Government"}
                </SelectItem>
              </Select>
              <DashboardInput
                label={t("InterestAmount")}
                value={citizen.value}
                onChange={(value) => updateCitizenData(index, "value", value)}
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
            titleAr={isSubmitting ? "جاري التعديل..." : "تعديل"}
            titleEn={isSubmitting ? "Editing..." : "Edit"}
            isLoading={isSubmitting}
            onClick={handleUpdateBank}
          />
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleDeleteCancel();
          }
        }}
        handleDelete={handleDeleteConfirm}
      />
    </section>
  );
};

export default EditBank;
