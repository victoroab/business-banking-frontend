import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { authRoutes, dashboardRoutes, kybRoutes } from "./routes/routes";
import DashboardLayout from "./layout/Dashboard";
import { RouteProps } from "./interfaces/Global";
import ProgressLayout from "./layout/ProgressLayout";
import { KYCProgressSteps, logoutUser } from "./utils";
import Guard from "./routes/Guard";
import NotFound from "./pages/NotFound/NotFound";
import { useIdleTimer } from "react-idle-timer";
import InactiveContent from "./components/InactiveContent";
import { useEffect, useState } from "react";
import GeneralModal from "./components/PopUps/GeneralModal";
import { useAppDispatch, useAppSelector } from "./hooks";
import { selectAuth } from "./store/slice/authSlice";

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(20);
  const navigate = useNavigate();
  // const userInfoString = localStorage.getItem("persist:alert-business");
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectAuth);
  // const userInfos = userInfoString ? JSON.parse(userInfoString) : null;
  // console.log(userInfos);
  // const accessToken = userInfos !== null ? JSON.parse(userInfos?.auth) : null;
  // console.log(accessToken);

  const onIdle = () => {
    if (userInfo?.access_token) {
      console.log("User is idle. Showing modal...");
      setShowModal(true);
    } else {
      console.log("No user token found. Skipping idle check.");
    }
  };

  const sessionTime = import.meta.env.VITE_REACT_APP_SESSION_TIME;

  useIdleTimer({
    onIdle,
    timeout: sessionTime * 60 * 1000,
    throttle: 500,
  });

  useEffect(() => {
    if (showModal) {
      if (counter > 0) {
        const timer = setTimeout(() => setCounter(counter - 1), 1000);
        console.log(`Counter: ${counter}`);
        return () => clearTimeout(timer);
      } else {
        console.log("Counter reached 0. Logging out...");
        logoutUser(navigate, dispatch);
        setShowModal(false);
      }
    } else {
      setCounter(20);
    }
  }, [showModal, counter, navigate]);

  return (
    <main className="App">
      {showModal && (
        <GeneralModal>
          <InactiveContent
            id="idle-screen"
            close={() => setShowModal(false)}
            counter={counter}
            setShowModal={setShowModal}
            sessionTime={sessionTime.toString()}
          />
        </GeneralModal>
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
