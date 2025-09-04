import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import ImageInput from "@/components/general/ImageInput";
import SuccessPopup from "@/components/general/SuccessPopup";
import { Checkbox, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getCountries, Country } from "@/api/countries/getCountry";
import { sendBroadcastNotification, BroadcastNotificationPayload } from "@/api/notifications/createNotification";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getAdminUsers } from "@/api/users/getUsers";

const AddNotification = () => {
  const { t, i18n } = useTranslation("notifications");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [arText, setArText] = useState("");
  const [enText, setEnText] = useState("");
  const [arDescription, setArDescription] = useState("");
  const [enDescription, setEnDescription] = useState("");

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [recieverType, setRecieverType] = useState<"all" | "selected">("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const navigate = useNavigate ();

  const { data: countriesData, isLoading: countriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
  });

  const reciever = [
    { key: "1", label: "الكل" },
    { key: "2", label: "محدد" },
  ];

  const { data: usersData } = useQuery({
  queryKey: ["admin-users", selectedCountry?.id],
  queryFn: () =>
    getAdminUsers({
      country_id: selectedCountry?.id,
    }),
    enabled: !!selectedCountry,
  });



  const handleSend = async () => {
    if (!selectedCountry) {
      toast.error("Please select a country");
      return;
    }

    const payload: BroadcastNotificationPayload = {
      title: { en: enText, ar: arText },
      body: { en: enDescription, ar: arDescription },
      type: recieverType,
      country_id: selectedCountry.id,
      notifiable_ids: recieverType === "selected" ? selectedUsers : undefined,
      image: profileImage || undefined,
    };

    try {
      await sendBroadcastNotification(payload);
      setShowPopup(true);
      toast.success(t('notificationAddedSuccessfully'))
      navigate("/notifications")
      setTimeout(() => setShowPopup(false), 2000);
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Failed to send notification");
      }
    }
  };

  return (
    <section className="relative">
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="اضافة اشعار جديد"
          titleEn="Add new notification"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            {
              titleAr: "الاشعارات",
              titleEn: "Notifications",
              link: "/notifications",
            },
            { titleAr: "اضافة اشعار جديد", titleEn: "Add new notification" },
          ]}
        />
        <div className="px-8">
          <ImageInput image={profileImage} setImage={setProfileImage} />
        </div>
      </div>

      <div className="flex xl:flex-row flex-col gap-[27px] mt-[11px] md:mx-8 mx-2">
        <div className="xl:w-[838px] h-full bg-[#FFFFFF] rounded-[15px] py-6 px-5">
          <div className="flex xl:flex-row flex-col items-center gap-[15px] mt-4">
            {/* Arabic Question */}
            <div className="relative w-full">
              <DashboardInput
                label={t("arText")}
                value={arText}
                onChange={setArText}
                placeholder={t("writeHere")}
              />
            </div>
            {/* English Question */}
            <div className="relative w-full">
              <DashboardInput
                label={t("enText")}
                value={enText}
                onChange={setEnText}
                placeholder={t("writeHere")}
              />
            </div>
          </div>

          <div className="flex xl:flex-row flex-col items-center gap-3 mt-4">
            <div className="relative w-full">
              <textarea
                id="arabic-description"
                value={arDescription}
                onChange={(e) => setArDescription(e.target.value)}
                placeholder={t("lorem")}
                className="peer w-full h-[191px] rounded-[12px] border border-[#E2E2E2] p-4 pt-8 focus:outline-none"
              />
              <label
                htmlFor="arabic-description"
                className="absolute right-4 top-3 text-[#606C7E] text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-focus:top-3 peer-focus:text-sm peer-focus:text-[#606C7E]"
              >
                {t("arDescription")}
              </label>
            </div>
            <div className="relative w-full">
              <textarea
                id="english-description"
                value={enDescription}
                onChange={(e) => setEnDescription(e.target.value)}
                placeholder={t("lorem")}
                className="peer w-full h-[191px] rounded-[12px] border border-[#E2E2E2] p-4 pt-8 focus:outline-none"
              />
              <label
                htmlFor="english-description"
                className="absolute right-4 top-3 text-[#606C7E] text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-focus:top-3 peer-focus:text-sm peer-focus:text-[#606C7E]"
              >
                {t("enDescription")}
              </label>
            </div>
          </div>

          <div className="flex xl:flex-row flex-col items-center gap-3 mt-3">
            {countriesData && (
              <Select
                label={t("country")}
                variant="bordered"
                placeholder={countriesLoading ? "Loading..." : t("choose")}
                value={selectedCountry?.id.toString() || ""}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const val = e.target.value;
                  const country = countriesData?.data.find((c) => c.id.toString() === val);
                  setSelectedCountry(country || null);
                }}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              >
                {(countriesData?.data || []).map((c) => (
                  <SelectItem key={c.id} textValue={c.name.en}>
                    {i18n.language === "ar" ? c.name.ar : c.name.en}
                  </SelectItem>
                ))}
              </Select>
            )}

            <Select
              label={t("selectReciver")}
              variant="bordered"
              placeholder={t("choose")}
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              value={recieverType === "all" ? "1" : "2"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setRecieverType(e.target.value === "1" ? "all" : "selected");
              }}
            >
              {reciever.map((authority) => (
                <SelectItem key={authority.key} textValue={authority.label}>
                  {authority.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="mt-4">
            <DashboardButton
              titleAr="ارسال"
              titleEn="Send"
              onClick={handleSend}
            />
          </div>
        </div>

        <div className="xl:w-[506px] h-full bg-white rounded-[15px] p-[17px] xl:mt-0 mt-4">
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="ابحث..."
              className="bg-[#F3F6F9] w-full pl-4 pr-10 py-[10px] text-sm text-right placeholder-[#606C7E] border border-[#0000001A] rounded-[10px] focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>

          <table className="w-full table-auto border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-[#F0F4F7] h-9 rounded-[8px] text-right">
                <th className="w-[24px]"></th>
                <th className="pr-2 text-[#2A32F8] text-sm font-bold">
                  {t("image")}
                </th>
                <th className="pr-2 text-[#2A32F8] text-sm font-bold">
                  {t("name")}
                </th>
                <th className="pr-2 text-[#2A32F8] text-sm font-bold">
                  {t("phone")}
                </th>
              </tr>
            </thead>

            <tbody>
              {usersData?.data.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b border-[#E3E8EF] text-sm text-right"
                >
                  <td className="align-middle">
                    <Checkbox
                      selected={selectedUsers.includes(user.id.toString())}
                      onChange={(checked) => {
                        if (checked)
                          setSelectedUsers((prev) => [...prev, user.id.toString()]);
                        else
                          setSelectedUsers((prev) =>
                            prev.filter((id) => id !== user.id.toString())
                          );
                      }}
                      disabled={recieverType === "all"}
                    />
                  </td>
                  <td className="py-3 pr-2">
                    <img
                      src="/images/user.svg"
                      alt="user"
                      className="w-[52px] h-[51px] rounded-full"
                    />
                  </td>

                  <td className="py-3 pr-2 text-[#071739] font-normal">
                    {user.name}
                  </td>

                  <td className="py-3 pr-2 text-[#606C7E]" dir="ltr">
                    {user.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}
    </section>
  );
};

export default AddNotification;
