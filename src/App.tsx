import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  authRoutes,
  // bulkUploadRoutes,
  dashboardRoutes,
  kybRoutes,
  // payBillDataRoutes,
} from "./routes/routes";
import DashboardLayout from "./layout/Dashboard";
import { RouteProps } from "./interfaces/Global";
import ProgressLayout from "./layout/ProgressLayout";
import { KYCProgressSteps } from "./utils";
// import Upload from "./pages/Dashboard/Upload/Upload";
import Guard from "./routes/Guard";
import NotFound from "./pages/NotFound/NotFound";
import { useIdleTimer } from "react-idle-timer";
import InactiveContent from "./components/InactiveContent";
import { useEffect, useState } from "react";
import { useGlobalHooks } from "./hooks/globalHooks";
import { useAppSelector } from "./hooks";
import { selectAuth } from "./store/slice/authSlice";
import { selectGlobal } from "./store/slice/globalSlice";
import { useAuthHook } from "./hooks/authHook";
function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(60);
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectAuth);
  const { logoutUser } = useAuthHook();

  const onIdle = () => {
    if (userInfo?.access_token) {
      handleShow("idle-screen");
      setShowModal(true);
    }
  };

  const sessionTime = import.meta.env.VITE_REACT_APP_SESSION_TIME;

  useIdleTimer({
    onIdle,
    timeout: parseInt(sessionTime) * 60 * 1000,
    throttle: 500,
  });

  useEffect(() => {
    if (showModal) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setCounter(60);
    }

    if (counter === 0) {
      handleShow("idle-screen");
      logoutUser();
    }
  }, [showModal, counter, navigate]);

  return (
    <main className="App">
      {toggle["idle-screen"] && (
        <InactiveContent
          id="idle-screen"
          close={() => handleShow("idle-screen")}
          counter={counter}
          setShowModal={setShowModal}
          sessionTime={sessionTime.toString()}
        />
      )}

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

        {/* <Route
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
        </Route> */}

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

        {/* <Route
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
        </Route> */}
        {/* <Route
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
        </Route> */}

        {/* <Route
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
        </Route> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
