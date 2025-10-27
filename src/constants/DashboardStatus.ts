import userImg from "/images/userIcon.svg";

export interface DashboardStatusItem {
  icon: string;
  key: string;
  textAr: string;
  textEn: string;
  permission: string;
}

export const DashboardStatus: DashboardStatusItem[] = [
  {
    icon: userImg,
    key: "users_count",
    textAr: "عدد المستخدمين المسجلين",
    textEn: "Number of registered users",
    permission: "view_users_count_dashboard",
  },
  {
    icon: userImg,
    key: "admins_count",
    textAr: "عدد المسؤولين",
    textEn: "Number of admins",
    permission: "view_admins_count_dashboard",
  },
  {
    icon: userImg,
    key: "cars_count",
    textAr: "عدد السيارات",
    textEn: "Number of cars",
    permission: "view_cars_count_dashboard",
  },
  {
    icon: userImg,
    key: "search_count",
    textAr: "عدد مرات البحث المتقدم",
    textEn: "Number of advanced searches",
    permission: "view_advanced_search_count_dashboard",
  },
  {
    icon: userImg,
    key: "brands_count",
    textAr: "عدد الماركات",
    textEn: "Number of brands",
    permission: "view_brand_count_dashboard",
  },
  {
    icon: userImg,
    key: "cars_with_discount_count",
    textAr: "عدد السيارات التي تحتوي على خصم",
    textEn: "Number of cars with discounts",
    permission: "view_cars_has_discounts_count_dashboard",
  },
  {
    icon: userImg,
    key: "cars_with_offers_count",
    textAr: "عدد السيارات التي تحتوي على عروض",
    textEn: "Number of cars with offers",
    permission: "view_cars_has_offers_count_dashboard",
  },
  {
    icon: userImg,
    key: "cars_with_rent_to_own_count",
    textAr: "عدد السيارات الايجار و تنتهي بالتملك",
    textEn: "Number of lease-to-own cars",
    permission: "view_cars_has_rent_to_own_count_dashboard",
  },
  {
    icon: userImg,
    key: "agents_count",
    textAr: "عدد الوكلاء",
    textEn: "Number of agents",
    permission: "view_agents_count_dashboard",
  },
];
