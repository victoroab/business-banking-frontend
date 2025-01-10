import { Toaster } from "react-hot-toast";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  authRoutes,
  dashboardRoutes,
  kybRoutes,
  sendMoneyRoutes,
} from "./routes/routes";
import DashboardLayout from "./layout/Dashboard";
import { RouteProps } from "./interfaces/Global";
import ProgressLayout from "./layout/ProgressLayout";
import { KYCProgressSteps, newTransaction } from "./utils";

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
          element={
            <ProgressLayout
              progressSteps={KYCProgressSteps}
              isDashboard={false}
            />
          }
        >
          {kybRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route
          path="/send-money"
          element={
            <DashboardLayout>
              <ProgressLayout
                progressSteps={newTransaction}
                isDashboard={true}
              />
            </DashboardLayout>
          }
        >
          {sendMoneyRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </main>
  );
}

export default App;
