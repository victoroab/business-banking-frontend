import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  authRoutes,
  bulkUploadRoutes,
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
import Upload from "./pages/Dashboard/Upload/Upload";
import Guard from "./routes/Guard";
import NotFound from "./pages/NotFound/NotFound";
import { selectBillPayment } from "./store/slice/billPaymentSlice";
function App() {
  const { airtimeDataAction } = useAppSelector(selectBillPayment);

  return (
    <main className="App">
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        {authRoutes.map((route: RouteProps, idx: number) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
        {dashboardRoutes.map((route, idx: number) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Guard>
                <DashboardLayout>{route.element}</DashboardLayout>
              </Guard>
            }
          />
        ))}

        <Route
          path="/kyb"
          element={
            <Guard>
              <ProgressLayout
                progressSteps={KYCProgressSteps}
                isDashboard={false}
              />
            </Guard>
          }
        >
          {kybRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route
          path="/send-money"
          element={
            <Guard>
              <DashboardLayout>
                <ProgressLayout
                  progressSteps={newTransaction}
                  isDashboard={true}
                  navTitle="Send Money"
                  navDesc="Sending money has never been easier. ."
                />
              </DashboardLayout>
            </Guard>
          }
        >
          {sendMoneyRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* <Route
          path="/utility"
          element={
            <Guard>
              <DashboardLayout>
                <ProgressLayout
               
                  isDashboard={true}
            
                />
              </DashboardLayout>
            </Guard>
          }
        >
          {airtimeDataRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route> */}

        <Route
          path="/utility/pay-new-bill"
          element={
            <Guard>
              <DashboardLayout>
                <ProgressLayout
                  progressSteps={newBillProgressSteps}
                  isDashboard={true}
                  navTitle="Pay Bill"
                  navDesc="Settle your bills for utilities, subscriptions, and more—all in one place!"
                />
              </DashboardLayout>
            </Guard>
          }
        >
          {payBillDataRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route
          path="/request-pos"
          element={
            <Guard>
              <DashboardLayout>
                <ProgressLayout
                  progressSteps={androidStep}
                  isDashboard={true}
                  navTitle="POS"
                  navDesc="Here's your your POS Terminals"
                />
              </DashboardLayout>
            </Guard>
          }
        >
          {posRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route
          path="send-money/uploads"
          element={
            <Guard>
              <DashboardLayout>
                <Upload />
              </DashboardLayout>
            </Guard>
          }
        >
          {bulkUploadRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
