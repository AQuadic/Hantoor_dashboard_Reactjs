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
import SupportMsgsConversation from "@/pages/supportmessages/SupportMsgsConversation";
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
import { useParams } from "react-router";
export const privateRoutes: RouteTypes[] = [
  {
    path: "/",
    element: <DashboardPage />,
  },
  // Users routes - flattened
  {
    path: "/users",
    element: <DashboardUsers />,
  },
  {
    path: "/users/add",
    element: <AddUsers />,
  },
  {
    path: "/users/edit/:id",
    element: <EditUsers />,
  },
  {
    path: "/users/change-password",
    element: <ChangePassword />,
  },
  // Brands routes - flattened
  {
    path: "/brands",
    element: <BrandsPage />,
  },
  {
    path: "/brands/add",
    element: <AddBrand />,
  },
  {
    path: "/brands/:id",
    element: <AddBrand />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },

  // Technical Support route
  {
    path: "/technical-support",
    element: <TechnicalSupport />,
  },
  {
    path: "/technical-support/add",
    element: <AddQuestions />,
  },
  {
    path: "/technical-support/edit/:id",
    element: <EditQuestion />,
  },

  // Countries route
  {
    path: "/countries",
    element: <CountriesPage />,
  },
  {
    path: "/countries/edit/:id",
    element: <EditCountries />,
  },
  {
    path: "/countries/add",
    element: <AddCountries />,
  },
  // Subordinates route
  {
    path: "/subordinates",
    element: <SubordinatesPage />,
  },

  // FAQs route
  {
    path: "/faqs",
    element: <FAQsPage />,
  },
  {
    path: "/faq/add",
    element: <AddFaq />,
  },
  {
    path: "/faq/edit/:id",
    element: <EditFaq />,
  },
  {
  path: "/faq/details/:id",
  element: (() => {
    const { id } = useParams<{ id: string }>();
    return id ? <FaqDetails faqId={Number(id)} /> : <p>FAQ ID not found</p>;
  })(),
},
  {
    path: "/subordinates/add",
    element: <AddSubordinatePage />,
  },
  {
    path: "/subordinates/:id",
    element: <AddSubordinatePage />,
  },

  // Financing route
  {
    path: "/financing",
    element: <FinancingPage />,
  },
  {
    path: "/financing/details/:id",
    element: <FinancingDetails />,
  },
  {
    path: "/bank/add/:countryId",
    element: <AddBank />,
  },
  {
    path: "/bank/edit/:id",
    element: <EditBank />,
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
    path: "/support-messages/view",
    element: <SupportMsgsConversation />,
  },

  // Contact-us route
  {
    path: "/contact-us",
    element: <ContactUsPage />,
  },
  {
    path: "/contact-us/view",
    element: <ContactUsView />,
  },

  // Agents route
  {
    path: "/agents",
    element: <AgentPage />,
  },
  {
    path: "/agent/add",
    element: <AddAgentWrapper />,
  },
  {
    path: "/agent/edit/:id",
    element: <EditAgentWrapper />,
  },
  {
    path: "/agent/details/:id",
    element: <AgentsDetailsPage />,
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

  // Models route
  {
    path: "/models",
    element: <ModelPage />,
  },
  {
    path: "/models/add",
    element: <AddModel />,
  },
  {
    path: "/models/:id",
    element: <AddModel />,
  },
  {
    path: "/models/edit/:id",
    element: <EditModel />,
  },
  {
    path: "/structure-types/add",
    element: <AddBodyType />,
  },
  {
    path: "/structure-types/edit/:id",
    element: <EditBodyType />,
  },
  {
    path: "/car-types/add",
    element: <AddCarTypes />,
  },
  {
    path: "/car-types/:id",
    element: <EditCarTypes />,
  },
  {
    path: "/categories/add",
    element: <AddCategories />,
  },
  {
    path: "/categories/:id",
    element: <EditCategory />,
  },
  {
    path: "/brand-origins/add",
    element: <AddBrandOrigins />,
  },
  {
    path: "/brand-origins/:id",
    element: <EditBrandOrigins />,
  },
  {
    path: "/seat-numbers/add",
    element: <AddSeats />,
  },
  {
    path: "/seats/edit/:id",
    element: <EditSeats />,
  },
  {
    path: "/engine-types/add",
    element: <AddEngineType />,
  },
  {
    path: "/engin-type/edit/:id",
    element: <EditEnginType />,
  },
  {
    path: "/engine-sizes/add",
    element: <AddEnginSize />,
  },
  {
    path: "/engine-size/edit/:id",
    element: <EditEngineSize />,
  },
  {
    path: "/price-from/add",
    element: <AddPriceFrom />,
  },
  {
    path: "/price-from/edit/:id",
    element: <EditPriceFrom />,
  },
  {
    path: "/price-to/add",
    element: <AddPriceTo />,
  },
  {
    path: "/price-to/edit/:id",
    element: <EditPriceTo />,
  },

  // Setting route
  {
    path: "/settings",
    element: <SettingPage />,
  },
  {
    path: "/setting/add-whatsapp",
    element: <AddWhatsappNumber />,
  },
  {
    path: "/setting/edit-whatsapp/:id",
    element: <EditWhatsappNumber />,
  },
  {
    path: "/setting/add-profile",
    element: <AddProfile />,
  },
  {
    path: "/profile/edit/:id",
    element: <EditProfile />,
  },
  {
    path: "/setting/add-terms",
    element: <AddTerms />,
  },
  {
    path: "/profile/edit-termsandconditions",
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
  },
  {
    path: "/cars/add",
    element: <AddCars />,
  },
  {
    path: "/cars/edit/:id",
    element: <AddCars />,
  },
  {
    path: "/cars/:id",
    element: <ViewCars />,
  },
  {
    path: "/cars/agent/:id",
    element: <ViewAgent />,
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
];
