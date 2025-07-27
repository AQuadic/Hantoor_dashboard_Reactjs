import ActiiveSupportMsgs from "@/components/icons/dashboard/ActiiveSupportMsgs";
import ActiveBrands from "@/components/icons/dashboard/ActiveBrands";
import ActiveContactUs from "@/components/icons/dashboard/ActiveContactUs";
import ActiveCountries from "@/components/icons/dashboard/ActiveCountries";
import ActiveDashboard from "@/components/icons/dashboard/ActiveDashboard";
import ActiveFAQ from "@/components/icons/dashboard/ActiveFAQ";
import ActiveFinancing from "@/components/icons/dashboard/ActiveFinancing";
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
    link: "لوحة التحكم",
    path: "/",
  },
  {
    icons: Subordinates,
    activeIcon: ActiveSubordinates,
    link: "المسؤولين الفرعيين",
    path: "/subordinates",
  },
  {
    icons: Users,
    activeIcon: ActiveUsers,
    link: "المستخدمين",
    path: "/users",
  },
  {
    icons: Countries,
    activeIcon: ActiveCountries,
    link: "البلاد",
    path: "/countries",
  },
  {
    icons: Brands,
    activeIcon: ActiveBrands,
    link: "الماركات",
    path: "/brands",
  },
  {
    icons: Agents,
    link: "الوكلاء",
    path: "/agents",
  },
  {
    icons: CarSections,
    link: "اقسام السيارات",
    path: "/car-sections",
  },
  {
    icons: Cars,
    link: "السيارات",
    path: "/cars",
  },
  {
    icons: Financing,
    activeIcon: ActiveFinancing,
    link: "التمويل",
    path: "/financing",
  },
  {
    icons: Chats,
    link: "المحادثات",
    path: "/chats",
  },
  {
    icons: SupportQuestions,
    activeIcon: ActiveSupportQuestions,
    link: "اسئلة الدعم الفني",
    path: "/technical-support",
  },
  {
    icons: SupportMsgs,
    activeIcon: ActiiveSupportMsgs,
    link: "رسائل الدعم",
    path: "/support-messages",
  },
  {
    icons: FAQs,
    activeIcon: ActiveFAQ,
    link: "الاسئلة الشائعة",
    path: "/faqs",
  },
  {
    icons: Notification,
    link: "الاشعارات",
    path: "/notifications",
  },
  {
    icons: Contactus,
    activeIcon: ActiveContactUs,
    link: "تواصل معنا",
    path: "/contact-us",
  },
  {
    icons: Setting,
    link: "الاعدادات",
    path: "/settings",
  },
  {
    icons: Logout,
    link: "تسجيل الخروج",
    path: "/logout",
  },
];
