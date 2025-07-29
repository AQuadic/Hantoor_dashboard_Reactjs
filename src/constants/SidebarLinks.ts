import ActiiveSupportMsgs from "@/components/icons/dashboard/ActiiveSupportMsgs";
import ActiveAgents from "@/components/icons/dashboard/ActiveAgents";
import ActiveBrands from "@/components/icons/dashboard/ActiveBrands";
import ActiveChats from "@/components/icons/dashboard/ActiveChats";
import ActiveContactUs from "@/components/icons/dashboard/ActiveContactUs";
import ActiveCountries from "@/components/icons/dashboard/ActiveCountries";
import ActiveDashboard from "@/components/icons/dashboard/ActiveDashboard";
import ActiveFAQ from "@/components/icons/dashboard/ActiveFAQ";
import ActiveFinancing from "@/components/icons/dashboard/ActiveFinancing";
import ActiveModels from "@/components/icons/dashboard/ActiveModels";
import ActiveSetting from "@/components/icons/dashboard/ActiveSetting";
import ActiveSubordinates from "@/components/icons/dashboard/ActiveSubordinates";
import ActiveSupportQuestions from "@/components/icons/dashboard/ActiveSupportQuestions";
import ActiveUsers from "@/components/icons/dashboard/ActiveUsers";
import Agents from "@/components/icons/dashboard/Agents";
import Brands from "@/components/icons/dashboard/Brands";
import Cars from "@/components/icons/dashboard/Cars";
import CarSections from "@/components/icons/dashboard/CarSections";
import Chats from "@/components/icons/dashboard/Chats";
import Contactus from "@/components/icons/dashboard/Contactus";
import Countries from "@/components/icons/dashboard/Countries";
import DashboardIcon from "@/components/icons/dashboard/DashboardIcon";
import FAQs from "@/components/icons/dashboard/FAQs";
import Financing from "@/components/icons/dashboard/Financing";
import Logout from "@/components/icons/dashboard/Logout";
import Notification from "@/components/icons/dashboard/Notification";
import Setting from "@/components/icons/dashboard/Setting";
import Subordinates from "@/components/icons/dashboard/Subordinates";
import SupportMsgs from "@/components/icons/dashboard/SupportMsgs";
import SupportQuestions from "@/components/icons/dashboard/SupportQuestions";
import Users from "@/components/icons/dashboard/Users";

export const SidebarLinks = [
  {
    icons: DashboardIcon,
    activeIcon: ActiveDashboard,
    linkAr: "لوحة التحكم",
    linkEn: "Dashboard",
    path: "/",
  },
  {
    icons: Subordinates,
    activeIcon: ActiveSubordinates,
    linkAr: "المسؤولين الفرعيين",
    linkEn: "Subordinates",
    path: "/subordinates",
  },
  {
    icons: Users,
    activeIcon: ActiveUsers,
    linkAr: "المستخدمين",
    linkEn: "Users",
    path: "/users",
  },
  {
    icons: Countries,
    activeIcon: ActiveCountries,
    linkAr: "البلاد",
    linkEn: "Countries",
    path: "/countries",
  },
  {
    icons: Brands,
    activeIcon: ActiveBrands,
    linkAr: "الماركات",
    linkEn: "Brands",
    path: "/brands",
  },
  {
    icons: Agents,
    activeIcon: ActiveAgents,
    linkAr: "الوكلاء",
    linkEn: "Agents",
    path: "/agents",
  },
  {
    icons: CarSections,
    activeIcon: ActiveModels,
    linkAr: "اقسام السيارات",
    linkEn: "Car Sections",
    path: "/models",
  },
  {
    icons: Cars,
    linkAr: "السيارات",
    linkEn: "Cars",
    path: "/cars",
  },
  {
    icons: Financing,
    activeIcon: ActiveFinancing,
    linkAr: "التمويل",
    linkEn: "Financing",
    path: "/financing",
  },
  {
    icons: Chats,
    activeIcon: ActiveChats,
    linkAr: "المحادثات",
    linkEn: "Chats",
    path: "/chats",
  },
  {
    icons: SupportQuestions,
    activeIcon: ActiveSupportQuestions,
    linkAr: "اسئلة الدعم الفني",
    linkEn: "Support Questions",
    path: "/technical-support",
  },
  {
    icons: SupportMsgs,
    activeIcon: ActiiveSupportMsgs,
    linkAr: "رسائل الدعم",
    linkEn: "Support Messages",
    path: "/support-messages",
  },
  {
    icons: FAQs,
    activeIcon: ActiveFAQ,
    linkAr: "الاسئلة الشائعة",
    linkEn: "FAQs",
    path: "/faqs",
  },
  {
    icons: Notification,
    linkAr: "الاشعارات",
    linkEn: "Notifications",
    path: "/notifications",
  },
  {
    icons: Contactus,
    activeIcon: ActiveContactUs,
    linkAr: "تواصل معنا",
    linkEn: "Contact Us",
    path: "/contact-us",
  },
  {
    icons: Setting,
    activeIcon: ActiveSetting,
    linkAr: "الاعدادات",
    linkEn: "Settings",
    path: "/settings",
  },
  {
    icons: Logout,
    linkAr: "تسجيل الخروج",
    linkEn: "Logout",
    path: "/logout",
  },
];
