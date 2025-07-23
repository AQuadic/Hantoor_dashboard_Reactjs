import { privateRoutes } from "@/routes/privateRoutes";
import { publicRoutes } from "@/routes/publicRoutes";
import { RouteTypes } from "@/types/general/RouteTypes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouteGuard from "./guards/PrivateRouteGuard";
import PublicRouteGuard from "./guards/PublicRouteGuard";
import Providers from "./Providers";

function App() {
  // Helper function to render routes recursively
  const renderRoutes = (routes: RouteTypes[]) => {
    return routes.map((route, index) => (
      <Route
        key={`${route.path}-${index}`}
        path={route.path}
        element={route.element}
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          {/* Public Routes - wrapped with PublicRouteGuard */}
          <Route element={<PublicRouteGuard />}>
            {renderRoutes(publicRoutes)}
          </Route>

          {/* Private Routes - wrapped with PrivateRouteGuard */}
          <Route element={<PrivateRouteGuard />}>
            {renderRoutes(privateRoutes)}
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
