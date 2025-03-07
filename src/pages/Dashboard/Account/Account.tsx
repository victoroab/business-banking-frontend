// import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { accountSettingsSteps } from "../../../utils";
// import Profile from "./Profile";
// import TransactionLimit from "./TransactionLimit/TransactionLimit";
// import Verification from "./Verification";
// import NotificationPreference from "./NotificationPreference";
// import ResetPasscode from "./ResetPasscode";
// import SecurityQuestion from "./SecurityQuestion";
// import BankStatement from "./BankStatement";
// import ContactUs from "./ContactUs";
// import DeviceMgt from "./DeviceMgt";
// // import ManageBeneficiary from "./ManagementBeneficiary/ManageBeneficiary";
// import TransactionPin from "./TransactionPin";
// import SetUp2FA from "./Setup2FA";
// import UserManagement from "./UserManagement/UserManagement";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Account = () => {
  // const currentTab = 1;
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname.split("/")[2];

  return (
    <div className="px-10">
      <Navbar title="Account" subtitle="View all your account settings here" />
      <div className=" flex gap-4 justify-between">
        <div className="flex border-r p-6 flex-col gap-4 bg-white w-[35%]">
          {accountSettingsSteps?.map((step) => (
            <div
              // onClick={() => setCurrentTab(step.id as number)}
              onClick={() => navigate(`/account-settings/${step.link}`)}
              className={` p-3 cursor-pointer font-workSans
            ${
              currentUrl === step.link
                ? "bg-gray-50 border border-gray-200 font-normal text-[var(--pryColor)] rounded-xl"
                : "text-[#8E949A] font-normal"
            }
          `}
            >
              <p className="p">{step.title}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 bg-white w-full px-20 py-11">
          {/* {currentTab === 1 && <Profile />} */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;
