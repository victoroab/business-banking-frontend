import { Toaster } from "react-hot-toast";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  airtimeDataRoutes,
  authRoutes,
  dashboardRoutes,
  kybRoutes,
  payBillDataRoutes,
  posRoutes,
  sendMoneyRoutes,
} from "./routes/routes";
import DashboardLayout from "./layout/Dashboard";
import { RouteProps } from "./interfaces/Global";
import ProgressLayout from "./layout/ProgressLayout";
import {
  airtimeStep,
  androidStep,
  dataStep,
  KYCProgressSteps,
  newBillProgressSteps,
  newTransaction,
} from "./utils";
import { useAppSelector } from "./hooks";
import { selectDashboard } from "./store/slice/dashboardSlice";

function App() {
  const { airtimeDataAction } = useAppSelector(selectDashboard);
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
                navTitle="Send Money"
                navDesc="Sending money has never been easier. ."
              />
            </DashboardLayout>
          }
        >
          {sendMoneyRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route
          path="/airtime-data"
          element={
            <DashboardLayout>
              <ProgressLayout
                progressSteps={
                  airtimeDataAction === "AIRTIME" ? airtimeStep : dataStep
                }
                isDashboard={true}
                navTitle="Airtime & Data"
                navDesc="Easily recharge you phone or prchase data bundles in just a few clicks"
              />
            </DashboardLayout>
          }
        >
          {airtimeDataRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route
          path="/pay-new-bill"
          element={
            <DashboardLayout>
              <ProgressLayout
                progressSteps={newBillProgressSteps}
                isDashboard={true}
                navTitle="Pay Bill"
                navDesc="Settle your bills for utilities, subscriptions, and more—all in one place!"
              />
            </DashboardLayout>
          }
        >
          {payBillDataRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route
          path="/request-pos"
          element={
            <DashboardLayout>
              <ProgressLayout
                progressSteps={androidStep}
                isDashboard={true}
                navTitle="POS"
                navDesc="Here's your your POS Terminals"
              />
            </DashboardLayout>
          }
        >
          {posRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </main>
  );
}

export default App;
