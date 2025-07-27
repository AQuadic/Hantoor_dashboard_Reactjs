import AddUsers from "@/components/users/AddUsers";
import ChangePassword from "@/components/users/ChangePassword";
import EditUsers from "@/components/users/EditUsers";
import AddBrand from "@/pages/brands/AddBrand";
import BrandsPage from "@/pages/brands/BrandsPage";
import AddCountries from "@/pages/countries/AddCountries";
import CountriesPage from "@/pages/countries/CountriesPage";
import EditCountries from "@/pages/countries/EditCountries";
import DashboardPage from "@/pages/DashboardPage";
import DashboardUsers from "@/pages/DashboardUsers";
import AddFaq from "@/pages/faqs/AddFaq";
import EditFaq from "@/pages/faqs/EditFaq";
import FaqDetails from "@/pages/faqs/FaqDetails";
import FAQsPage from "@/pages/faqs/FAQsPage";
import FinancingDetails from "@/pages/financing/FinancingDetails";
import FinancingPage from "@/pages/financing/FinancingPage";
import ProfilePage from "@/pages/ProfilePage";
import AddSubordinatePage from "@/pages/subordinates/AddSubordinatePage";
import SubordinatesPage from "@/pages/subordinates/SubordinatesPage";
import AddQuestions from "@/pages/technicalsupport/AddQuestion";
import EditQuestion from "@/pages/technicalsupport/EditQuestion";
import TechnicalSupport from "@/pages/technicalsupport/TechnicalSupport";
import Testing from "@/pages/Testing";
import { RouteTypes } from "@/types/general/RouteTypes";
export const privateRoutes: RouteTypes[] = [
  {
    path: "/testing",
    element: <Testing />,
  },
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
    path: "/users/edit",
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
    path: "/technical-support/edit",
    element: <EditQuestion />,
  },

  // Countries route
  {
    path: "/countries",
    element: <CountriesPage />,
  },
  {
    path: "/countries/edit",
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
    path:'/faqs',
    element: <FAQsPage />
  },
  {
    path:'/faq/add',
    element: <AddFaq />
  },
    {
    path: "/faq/edit/:id",
    element: <EditFaq />
  },
  {
    path: "/faq/details/:id",
    element: <FaqDetails />
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
    element: <FinancingPage/>
  },
  {
    path: "/financing/details/:id",
    element: <FinancingDetails />
  }
];
