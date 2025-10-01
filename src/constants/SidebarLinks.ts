import ActiiveSupportMsgs from "@/components/icons/dashboard/ActiiveSupportMsgs";
import ActiveAgents from "@/components/icons/dashboard/ActiveAgents";
import ActiveBrands from "@/components/icons/dashboard/ActiveBrands";
import ActiveCars from "@/components/icons/dashboard/ActiveCars";
import ActiveChats from "@/components/icons/dashboard/ActiveChats";
import ActiveContactUs from "@/components/icons/dashboard/ActiveContactUs";
import ActiveCountries from "@/components/icons/dashboard/ActiveCountries";
import ActiveDashboard from "@/components/icons/dashboard/ActiveDashboard";
import ActiveFAQ from "@/components/icons/dashboard/ActiveFAQ";
import ActiveFinancing from "@/components/icons/dashboard/ActiveFinancing";
import ActiveModels from "@/components/icons/dashboard/ActiveModels";
import ActiveNotification from "@/components/icons/dashboard/ActiveNotification";
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

export interface SidebarLink {
  icons: React.ComponentType;
  activeIcon?: React.ComponentType;
  linkAr: string;
  linkEn: string;
  path: string;
  requiredPermissions?: string[]; // List of permissions required to access this link
  requireAny?: boolean; // If true, user needs ANY of the permissions; if false, needs ALL
}

export const SidebarLinks: SidebarLink[] = [
  {
    icons: DashboardIcon,
    activeIcon: ActiveDashboard,
    linkAr: "لوحة التحكم",
    linkEn: "Dashboard",
    path: "/",
    // Dashboard is always accessible - no permissions required
  },
  {
    icons: Subordinates,
    activeIcon: ActiveSubordinates,
    linkAr: "المسؤولين الفرعيين",
    linkEn: "Subordinates",
    path: "/subordinates",
    requiredPermissions: [
      "view_admin",
      "create_admin",
      "edit_admin",
      "delete_admin",
    ],
    requireAny: true,
  },
  {
    icons: Users,
    activeIcon: ActiveUsers,
    linkAr: "المستخدمين",
    linkEn: "Users",
    path: "/users",
    requiredPermissions: [
      "view_user",
      "create_user",
      "edit_user",
      "delete_user",
      "block_user",
    ],
    requireAny: true,
  },
  {
    icons: Countries,
    activeIcon: ActiveCountries,
    linkAr: "البلاد",
    linkEn: "Countries",
    path: "/countries",
    requiredPermissions: [
      "view_country",
      "create_country",
      "edit_country",
      "delete_country",
    ],
    requireAny: true,
  },
  {
    icons: Brands,
    activeIcon: ActiveBrands,
    linkAr: "الماركات",
    linkEn: "Brands",
    path: "/brands",
    requiredPermissions: [
      "view_brand",
      "create_brand",
      "edit_brand",
      "delete_brand",
    ],
    requireAny: true,
  },
  {
    icons: Agents,
    activeIcon: ActiveAgents,
    linkAr: "الوكلاء",
    linkEn: "Agents",
    path: "/agents",
    requiredPermissions: [
      "view_agent",
      "create_agent",
      "edit_agent",
      "delete_agent",
    ],
    requireAny: true,
  },
  {
    icons: CarSections,
    activeIcon: ActiveModels,
    linkAr: "اقسام السيارات",
    linkEn: "Car Sections",
    path: "/models",
    requiredPermissions: [
      // Models section
      "view_vehicle_model",
      "create_vehicle_model",
      "edit_vehicle_model",
      "delete_vehicle_model",
      // Structure Types (Body Types)
      "view_vehicle_class",
      "create_vehicle_class",
      "edit_vehicle_class",
      "delete_vehicle_class",
      // Vehicle Types
      "view_vehicle_type",
      "create_vehicle_type",
      "edit_vehicle_type",
      "delete_vehicle_type",
      // Categories
      "view_category",
      "create_category",
      "edit_category",
      "delete_category",
      // Brand Origins
      "view_brand_origin",
      "create_brand_origin",
      "edit_brand_origin",
      "delete_brand_origin",
      // Number of Seats
      "view_seat_count",
      "create_seat_count",
      "edit_seat_count",
      "delete_seat_count",
      // Engine Types
      "view_engine_type",
      "create_engine_type",
      "edit_engine_type",
      "delete_engine_type",
      // Engine Sizes
      "view_engine_size",
      "create_engine_size",
      "edit_engine_size",
      "delete_engine_size",
      // Price From
      "view_price_from",
      "create_price_from",
      "edit_price_from",
      "delete_price_from",
      // Price To
      "view_price_to",
      "create_price_to",
      "edit_price_to",
      "delete_price_to",
    ],
    requireAny: true,
  },
  {
    icons: Cars,
    activeIcon: ActiveCars,
    linkAr: "السيارات",
    linkEn: "Cars",
    path: "/cars",
    requiredPermissions: [
      "view_vehicle",
      "create_vehicle",
      "edit_vehicle",
      "delete_vehicle",
    ],
    requireAny: true,
  },
  {
    icons: Financing,
    activeIcon: ActiveFinancing,
    linkAr: "التمويل",
    linkEn: "Financing",
    path: "/financing",
    requiredPermissions: [
      "view_finance",
      "create_finance",
      "edit_finance",
      "delete_finance",
      "view_bank",
      "create_bank",
      "edit_bank",
      "delete_bank",
    ],
    requireAny: true,
  },
  {
    icons: Chats,
    activeIcon: ActiveChats,
    linkAr: "المحادثات",
    linkEn: "Chats",
    path: "/chats",
    requiredPermissions: [
      "view_chat",
      "create_chat",
      "edit_chat",
      "delete_chat",
    ],
    requireAny: true,
  },
  {
    icons: SupportQuestions,
    activeIcon: ActiveSupportQuestions,
    linkAr: "اسئلة الدعم الفني",
    linkEn: "Support Questions",
    path: "/technical-support",
    requiredPermissions: [
      "view_support_question",
      "create_support_question",
      "edit_support_question",
      "delete_support_question",
    ],
    requireAny: true,
  },
  {
    icons: SupportMsgs,
    activeIcon: ActiiveSupportMsgs,
    linkAr: "رسائل الدعم",
    linkEn: "Support Messages",
    path: "/support-messages",
    requiredPermissions: [
      "view_support_message",
      "create_support_message",
      "edit_support_message",
      "delete_support_message",
    ],
    requireAny: true,
  },
  {
    icons: FAQs,
    activeIcon: ActiveFAQ,
    linkAr: "الاسئلة الشائعة",
    linkEn: "FAQs",
    path: "/faqs",
    requiredPermissions: ["view_faq", "create_faq", "edit_faq", "delete_faq"],
    requireAny: true,
  },
  {
    icons: Notification,
    activeIcon: ActiveNotification,
    linkAr: "الاشعارات",
    linkEn: "Notifications",
    path: "/notifications",
    requiredPermissions: [
      "view_notification",
      "create_notification",
      "edit_notification",
      "delete_notification",
    ],
    requireAny: true,
  },
  {
    icons: Contactus,
    activeIcon: ActiveContactUs,
    linkAr: "تواصل معنا",
    linkEn: "Contact Us",
    path: "/contact-us",
    requiredPermissions: [
      "view_contact_us",
      "create_contact_us",
      "edit_contact_us",
      "delete_contact_us",
    ],
    requireAny: true,
  },
  {
    icons: Setting,
    activeIcon: ActiveSetting,
    linkAr: "الاعدادات",
    linkEn: "Settings",
    path: "/settings",
    requiredPermissions: [
      "view_general_setting",
      "view_request_financing",
      "view_info_page",
      "view_ad_image",
      "view_terms",
      "view_app_feature",
    ],
    requireAny: true,
  },
  {
    icons: Logout,
    linkAr: "تسجيل الخروج",
    linkEn: "Logout",
    path: "/logout",
    // Logout is always accessible - no permissions required
  },
];
