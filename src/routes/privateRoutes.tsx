import AddProfile from "@/components/setting/profile/AddProfile";
import EditProfile from "@/components/setting/profile/EditProfile";
import AddTerms from "@/components/termsandconditions/AddTerms";
import EditTerms from "@/components/termsandconditions/EditTerms";
import AddUsers from "@/components/users/AddUsers";
import ChangePassword from "@/components/users/ChangePassword";
import EditUsers from "@/components/users/EditUsers";
import AddAgentWrapper from "@/pages/agents/AddAgentWrapper";
import AgentPage from "@/pages/agents/AgentPage";
import EditAgentWrapper from "@/pages/agents/EditAgentWrapper";
import AddBrand from "@/pages/brands/AddBrand";
import BrandsPage from "@/pages/brands/BrandsPage";
import ChatPage from "@/pages/chats/ChatPage";
import ConversationPageWrapper from "@/components/chats/ConversationPageWrapper";
import ContactUsPage from "@/pages/contactus/ContactUsPage";
import ContactUsView from "@/pages/contactus/ContactUsView";
import AddCountries from "@/pages/countries/AddCountries";
import CountriesPage from "@/pages/countries/CountriesPage";
import EditCountries from "@/pages/countries/EditCountries";
import DashboardPage from "@/pages/dashboardpage/DashboardPage";
import DashboardUsers from "@/pages/DashboardUsers";
import AddFaq from "@/pages/faqs/AddFaq";
import EditFaq from "@/pages/faqs/EditFaq";
import FaqDetails from "@/pages/faqs/FaqDetails";
import FAQsPage from "@/pages/faqs/FAQsPage";
import AddBank from "@/pages/financing/AddBank";
import EditBank from "@/pages/financing/EditBank";
import FinancingDetails from "@/pages/financing/FinancingDetails";
import FinancingPage from "@/pages/financing/FinancingPage";
import ModelPage from "@/pages/models/ModelPage";
import ProfilePage from "@/pages/ProfilePage";
import AddWhatsappNumber from "@/pages/setting/AddWhatsappNumber";
import EditWhatsappNumber from "@/pages/setting/EditWhatsappNumber";
import SettingPage from "@/pages/setting/SettingPage";
import AddPermissionPage from "@/pages/subordinates/AddPermissionPage";
import AddSubordinatePage from "@/pages/subordinates/AddSubordinatePage";
import SubordinatesChangePassword from "@/pages/subordinates/SubordinateChangePasswordPage";
import SubordinatesPage from "@/pages/subordinates/SubordinatesPage";
import SupportMessagesPage from "@/pages/supportmessages/SupportMessagesPage";
import AddQuestions from "@/pages/technicalsupport/AddQuestion";
import EditQuestion from "@/pages/technicalsupport/EditQuestion";
import TechnicalSupport from "@/pages/technicalsupport/TechnicalSupport";
import { RouteTypes } from "@/types/general/RouteTypes";
import AddModel from "@/pages/models/AddModel";
import AddFeatures from "@/pages/features/AddFeatures";
import EditFeatures from "@/pages/features/EditFeatures";
import CarsPage from "@/pages/cars/CarsPage";
import AddCars from "@/pages/cars/AddCars";
import EditModel from "@/pages/models/EditModel";
import AddBodyType from "@/pages/models/AddBodyType";
import EditBodyType from "@/pages/models/EditBodyType";
import AddCarTypes from "@/pages/models/AddCarTypes";
import EditCarTypes from "@/pages/models/EditCarTypes";
import AddCategories from "@/pages/models/AddCategories";
import EditCategory from "@/pages/models/EditCategory";
import AddBrandOrigins from "@/pages/models/AddBrandOrigins";
import EditBrandOrigins from "@/pages/models/EditBrandOrigins";
import AddSeats from "@/pages/models/AddSeats";
import EditSeats from "@/pages/models/EditSeats";
import AddEngineType from "@/pages/models/AddEngineType";
import EditEnginType from "@/pages/models/EditEnginType";
import AddEnginSize from "@/pages/models/AddEnginSize";
import EditEngineSize from "@/pages/models/EditEnginSize";
import AddPriceFrom from "@/pages/models/AddPriceFrom";
import EditPriceFrom from "@/pages/models/EditPriceFrom";
import AddPriceTo from "@/pages/models/AddPriceTo";
import EditPriceTo from "@/pages/models/EditPriceTo";
import AgentsDetailsPage from "@/pages/agents/AgentsDetailsPage";
import NotificationPage from "@/pages/notification/NotificationPage";
import NotificationDetails from "@/pages/notification/NotificationDetails";
import AddNotification from "@/pages/notification/AddNotification";
import ViewCars from "@/pages/cars/ViewCars";
import ViewAgent from "@/pages/cars/ViewAgent";
import SupportMsgsConversationWrapper from "@/pages/supportmessages/SupportMsgsConversationWrapper";
import ForbiddenPage from "@/pages/errors/ForbiddenPage";
export const privateRoutes: RouteTypes[] = [
  {
    path: "/",
    element: <DashboardPage />,
    // Dashboard - no specific permissions required
  },
  // Users routes - flattened
  {
    path: "/users",
    element: <DashboardUsers />,
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
    path: "/users/add",
    element: <AddUsers />,
    requiredPermissions: ["create_user"],
    requireAny: false,
  },
  {
    path: "/users/edit/:id",
    element: <EditUsers />,
    requiredPermissions: ["edit_user"],
    requireAny: false,
  },
  {
    path: "/users/change-password/:id",
    element: <ChangePassword />,
    requiredPermissions: ["edit_user"],
    requireAny: false,
  },
  // Brands routes - flattened
  {
    path: "/brands",
    element: <BrandsPage />,
    requiredPermissions: [
      "view_brand",
      "create_brand",
      "edit_brand",
      "delete_brand",
    ],
    requireAny: true,
  },
  {
    path: "/brands/add",
    element: <AddBrand />,
    requiredPermissions: ["create_brand"],
    requireAny: false,
  },
  {
    path: "/brands/:id",
    element: <AddBrand />,
    requiredPermissions: ["edit_brand"],
    requireAny: false,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },

  // Technical Support route
  {
    path: "/technical-support",
    element: <TechnicalSupport />,
    requiredPermissions: [
      "view_support_question",
      "create_support_question",
      "edit_support_question",
      "delete_support_question",
    ],
    requireAny: true,
  },
  {
    path: "/technical-support/add",
    element: <AddQuestions />,
    requiredPermissions: ["create_support_question"],
    requireAny: false,
  },
  {
    path: "/technical-support/edit/:id",
    element: <EditQuestion />,
    requiredPermissions: ["edit_support_question"],
    requireAny: false,
  },

  // Countries route
  {
    path: "/countries",
    element: <CountriesPage />,
    requiredPermissions: [
      "view_country",
      "create_country",
      "edit_country",
      "delete_country",
    ],
    requireAny: true,
  },
  {
    path: "/countries/edit/:id",
    element: <EditCountries />,
    requiredPermissions: ["edit_country"],
    requireAny: false,
  },
  {
    path: "/countries/add",
    element: <AddCountries />,
    requiredPermissions: ["create_country"],
    requireAny: false,
  },
  // Subordinates route
  {
    path: "/subordinates",
    element: <SubordinatesPage />,
    requiredPermissions: [
      "view_admin",
      "create_admin",
      "edit_admin",
      "delete_admin",
    ],
    requireAny: true,
  },

  // FAQs route
  {
    path: "/faqs",
    element: <FAQsPage />,
    requiredPermissions: ["view_faq", "create_faq", "edit_faq", "delete_faq"],
    requireAny: true,
  },
  {
    path: "/faq/add",
    element: <AddFaq />,
    requiredPermissions: ["create_faq"],
    requireAny: false,
  },
  {
    path: "/faq/edit/:id",
    element: <EditFaq />,
    requiredPermissions: ["edit_faq"],
    requireAny: false,
  },
  {
    path: "/faq/details/:id",
    element: <FaqDetails faqId={0} />,
    requiredPermissions: ["view_faq"],
    requireAny: false,
  },
  {
    path: "/subordinates/add",
    element: <AddSubordinatePage />,
    requiredPermissions: ["create_admin"],
    requireAny: false,
  },
  {
    path: "/subordinates/:id",
    element: <AddSubordinatePage />,
    requiredPermissions: ["edit_admin"],
    requireAny: false,
  },

  // Financing route
  {
    path: "/financing",
    element: <FinancingPage />,
    requiredPermissions: [
      "view_finance",
      "create_finance",
      "edit_finance",
      "delete_finance",
    ],
    requireAny: true,
  },
  {
    path: "/financing/details/:id",
    element: <FinancingDetails />,
    requiredPermissions: ["view_finance"],
    requireAny: false,
  },
  {
    path: "/bank/add/:countryId",
    element: <AddBank />,
    requiredPermissions: ["create_bank"],
    requireAny: false,
  },
  {
    path: "/bank/edit/:id",
    element: <EditBank />,
    requiredPermissions: ["edit_bank"],
    requireAny: false,
  },

  {
    path: "/subordinates/change_password/:id",
    element: <SubordinatesChangePassword />,
  },
  {
    path: "/subordinates/permissions/add",
    element: <AddPermissionPage />,
  },
  {
    path: "/subordinates/permissions/:id",
    element: <AddPermissionPage />,
  },

  // Support messages route
  {
    path: "/support-messages",
    element: <SupportMessagesPage />,
  },
  {
    path: "/support-messages/view/:id",
    element: <SupportMsgsConversationWrapper />,
  },

  // Contact-us route
  {
    path: "/contact-us",
    element: <ContactUsPage />,
    requiredPermissions: [
      "view_contact_us",
      "create_contact_us",
      "edit_contact_us",
      "delete_contact_us",
    ],
    requireAny: true,
  },
  {
    path: "/contact-us/view",
    element: <ContactUsView />,
    requiredPermissions: ["view_contact_us"],
    requireAny: false,
  },

  // Agents route
  {
    path: "/agents",
    element: <AgentPage />,
    requiredPermissions: [
      "view_agent",
      "create_agent",
      "edit_agent",
      "delete_agent",
      "link_agent",
    ],
    requireAny: true,
  },
  {
    path: "/agent/add",
    element: <AddAgentWrapper />,
    requiredPermissions: ["create_agent"],
    requireAny: false,
  },
  {
    path: "/agent/edit/:id",
    element: <EditAgentWrapper />,
    requiredPermissions: ["edit_agent"],
    requireAny: false,
  },
  {
    path: "/agent/details/:id",
    element: <AgentsDetailsPage />,
    requiredPermissions: ["view_agent"],
    requireAny: false,
  },

  // Chats route
  {
    path: "/chats",
    element: <ChatPage />,
  },
  {
    path: "/chats/:id",
    element: <ConversationPageWrapper />,
  },

  // Models route (Car Sections)
  {
    path: "/models",
    element: <ModelPage />,
    requiredPermissions: [
      "view_vehicle_model",
      "create_vehicle_model",
      "edit_vehicle_model",
      "delete_vehicle_model",
      "view_vehicle_class",
      "create_vehicle_class",
      "edit_vehicle_class",
      "delete_vehicle_class",
      "view_vehicle_type",
      "create_vehicle_type",
      "edit_vehicle_type",
      "delete_vehicle_type",
      "view_category",
      "create_category",
      "edit_category",
      "delete_category",
      "view_brand_origin",
      "create_brand_origin",
      "edit_brand_origin",
      "delete_brand_origin",
      "view_seat_count",
      "create_seat_count",
      "edit_seat_count",
      "delete_seat_count",
      "view_engine_type",
      "create_engine_type",
      "edit_engine_type",
      "delete_engine_type",
      "view_engine_size",
      "create_engine_size",
      "edit_engine_size",
      "delete_engine_size",
      "view_price_from",
      "create_price_from",
      "edit_price_from",
      "delete_price_from",
      "view_price_to",
      "create_price_to",
      "edit_price_to",
      "delete_price_to",
    ],
    requireAny: true,
  },
  {
    path: "/models/add",
    element: <AddModel />,
    requiredPermissions: ["create_vehicle_model"],
    requireAny: false,
  },
  {
    path: "/models/:id",
    element: <AddModel />,
    requiredPermissions: ["edit_vehicle_model"],
    requireAny: false,
  },
  {
    path: "/models/edit/:id",
    element: <EditModel />,
    requiredPermissions: ["edit_vehicle_model"],
    requireAny: false,
  },
  {
    path: "/structure-types/add",
    element: <AddBodyType />,
    requiredPermissions: ["create_vehicle_class"],
    requireAny: false,
  },
  {
    path: "/structure-types/edit/:id",
    element: <EditBodyType />,
    requiredPermissions: ["edit_vehicle_class"],
    requireAny: false,
  },
  {
    path: "/car-types/add",
    element: <AddCarTypes />,
    requiredPermissions: ["create_vehicle_type"],
    requireAny: false,
  },
  {
    path: "/car-types/:id",
    element: <EditCarTypes />,
    requiredPermissions: ["edit_vehicle_type"],
    requireAny: false,
  },
  {
    path: "/categories/add",
    element: <AddCategories />,
    requiredPermissions: ["create_category"],
    requireAny: false,
  },
  {
    path: "/categories/:id",
    element: <EditCategory />,
    requiredPermissions: ["edit_category"],
    requireAny: false,
  },
  {
    path: "/brand-origins/add",
    element: <AddBrandOrigins />,
    requiredPermissions: ["create_brand_origin"],
    requireAny: false,
  },
  {
    path: "/brand-origins/:id",
    element: <EditBrandOrigins />,
    requiredPermissions: ["edit_brand_origin"],
    requireAny: false,
  },
  {
    path: "/seat-numbers/add",
    element: <AddSeats />,
    requiredPermissions: ["create_seat_count"],
    requireAny: false,
  },
  {
    path: "/seats/edit/:id",
    element: <EditSeats />,
    requiredPermissions: ["edit_seat_count"],
    requireAny: false,
  },
  {
    path: "/engine-types/add",
    element: <AddEngineType />,
    requiredPermissions: ["create_engine_type"],
    requireAny: false,
  },
  {
    path: "/engin-type/edit/:id",
    element: <EditEnginType />,
    requiredPermissions: ["edit_engine_type"],
    requireAny: false,
  },
  {
    path: "/engine-sizes/add",
    element: <AddEnginSize />,
    requiredPermissions: ["create_engine_size"],
    requireAny: false,
  },
  {
    path: "/engine-size/edit/:id",
    element: <EditEngineSize />,
    requiredPermissions: ["edit_engine_size"],
    requireAny: false,
  },
  {
    path: "/price-from/add",
    element: <AddPriceFrom />,
    requiredPermissions: ["create_price_from"],
    requireAny: false,
  },
  {
    path: "/price-from/edit/:id",
    element: <EditPriceFrom />,
    requiredPermissions: ["edit_price_from"],
    requireAny: false,
  },
  {
    path: "/price-to/add",
    element: <AddPriceTo />,
    requiredPermissions: ["create_price_to"],
    requireAny: false,
  },
  {
    path: "/price-to/edit/:id",
    element: <EditPriceTo />,
    requiredPermissions: ["edit_price_to"],
    requireAny: false,
  },

  // Setting route
  {
    path: "/settings",
    element: <SettingPage />,
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
    path: "/setting/add-whatsapp",
    element: <AddWhatsappNumber />,
    requiredPermissions: ["edit_social_link"],
    requireAny: false,
  },
  {
    path: "/setting/edit-whatsapp/:id",
    element: <EditWhatsappNumber />,
    requiredPermissions: ["edit_social_link"],
    requireAny: false,
  },
  {
    path: "/setting/add-onboarding",
    element: <AddProfile />,
    requiredPermissions: ["create_info_page"],
    requireAny: false,
  },
  {
    path: "/profile/edit/:id",
    element: <EditProfile />,
    requiredPermissions: ["edit_info_page"],
    requireAny: false,
  },
  {
    path: "/setting/add-terms",
    element: <AddTerms />,
  },
  {
    path: "/profile/edit-termsandconditions/:id",
    element: <EditTerms />,
  },
  {
    path: "/features/add",
    element: <AddFeatures />,
  },
  {
    path: "/features/edit/:id",
    element: <EditFeatures />,
  },

  // Cars route
  {
    path: "/cars",
    element: <CarsPage />,
    requiredPermissions: [
      "view_vehicle",
      "create_vehicle",
      "edit_vehicle",
      "delete_vehicle",
    ],
    requireAny: true,
  },
  {
    path: "/cars/add",
    element: <AddCars />,
    requiredPermissions: ["create_vehicle"],
    requireAny: false,
  },
  {
    path: "/cars/edit/:id",
    element: <AddCars />,
    requiredPermissions: ["edit_vehicle"],
    requireAny: false,
  },
  {
    path: "/cars/:id",
    element: <ViewCars />,
    requiredPermissions: ["view_vehicle"],
    requireAny: false,
  },
  {
    path: "/cars/agent/:id",
    element: <ViewAgent />,
    requiredPermissions: ["view_vehicle"],
    requireAny: false,
  },

  // Notification route
  {
    path: "/notifications",
    element: <NotificationPage />,
  },
  {
    path: "/notifications/details/:id",
    element: <NotificationDetails />,
  },
  {
    path: "/notifications/add/",
    element: <AddNotification />,
  },
  {
    path: "/403",
    element: <ForbiddenPage />,
  },
];
