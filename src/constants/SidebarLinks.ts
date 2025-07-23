import Agents from "@/components/icons/dashboard/Agents"
import Brands from "@/components/icons/dashboard/Brands"
import Cars from "@/components/icons/dashboard/Cars"
import CarSections from "@/components/icons/dashboard/CarSections"
import Chats from "@/components/icons/dashboard/Chats"
import Contactus from "@/components/icons/dashboard/Contactus"
import Countries from "@/components/icons/dashboard/Countries"
import DashboardIcon from "@/components/icons/dashboard/DashboardIcon"
import FAQs from "@/components/icons/dashboard/FAQs"
import Financing from "@/components/icons/dashboard/Financing"
import Logout from "@/components/icons/dashboard/Logout"
import Notification from "@/components/icons/dashboard/Notification"
import Setting from "@/components/icons/dashboard/Setting"
import Subordinates from "@/components/icons/dashboard/Subordinates"
import SupportMsgs from "@/components/icons/dashboard/SupportMsgs"
import SupportQuestions from "@/components/icons/dashboard/SupportQuestions"
import Users from "@/components/icons/dashboard/Users"

export const SidebarLinks = [
    {
        icons: DashboardIcon,
        link: 'لوحة التحكم',
        path: '/dashboard',
    },
    {
        icons: Subordinates,
        link: 'المسؤولين الفرعيين',
        path: '/dashboard/subordinates',
    },
    {
        icons: Users,
        link: 'المستخدمين',
        path: '/dashboard/users',
    },
    {
        icons: Countries,
        link: 'البلاد',
        path: '/dashboard/countries',
    },
    {
        icons: Brands,
        link: 'الماركات',
        path: '/dashboard/brands',
    },
    {
        icons: Agents,
        link: 'الوكلاء',
        path: '/dashboard/agents',
    },
    {
        icons: CarSections,
        link: 'اقسام السيارات',
        path: '/dashboard/car-sections',
    },
    {
        icons: Cars,
        link: 'السيارات',
        path: '/dashboard/cars',
    },
    {
        icons: Financing,
        link: 'التمويل',
        path: '/dashboard/financing',
    },
    {
        icons: Chats,
        link: 'المحادثات',
        path: '/dashboard/chats',
    },
    {
        icons: SupportQuestions,
        link: 'اسئلة الدعم الفني',
        path: '/dashboard/support-questions',
    },
    {
        icons: SupportMsgs,
        link: 'رسائل الدعم',
        path: '/dashboard/support-messages',
    },
    {
        icons: FAQs,
        link: 'الاسئلة الشائعة',
        path: '/dashboard/faqs',
    },
    {
        icons: Notification,
        link: 'الاشعارات',
        path: '/dashboard/notifications',
    },
    {
        icons: Contactus,
        link: 'تواصل معنا',
        path: '/dashboard/contact-us',
    },
    {
        icons: Setting,
        link: 'الاعدادات',
        path: '/dashboard/settings',
    },
    {
        icons: Logout,
        link: 'تسجيل الخروج',
        path: '/logout',
    },
];
