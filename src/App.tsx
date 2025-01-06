import { Toaster } from "react-hot-toast";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { authRoutes, dashboardRoutes, kybRoutes } from "./routes/routes";
import DashboardLayout from "./layout/Dashboard";
import { RouteProps } from "./interfaces/Global";
import ProgressLayout from "./layout/ProgressLayout";
import { KYCProgressSteps } from "./utils";

function App() {
  return (
    <main className="App">
      <Toaster position="top-center" />

      <Routes>
        {authRoutes.map((route: RouteProps, idx: number) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
        {dashboardRoutes.map((route, idx: number) => (
          <Route
            key={idx}
            path={route.path}
            element={<DashboardLayout>{route.element}</DashboardLayout>}
          />
        ))}
        <Route
          path="/kyb"
          element={<ProgressLayout progressSteps={KYCProgressSteps} />}
        >
          {kybRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </main>
  );
}

export default App;
