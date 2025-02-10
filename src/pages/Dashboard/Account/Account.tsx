import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { accountSettingsSteps } from "../../../utils";
import Profile from "./Profile";
import TransactionLimit from "./TransactionLimit/TransactionLimit";
import Verification from "./Verification";
import NotificationPreference from "./NotificationPreference";
import ResetPasscode from "./ResetPasscode";
import SecurityQuestion from "./SecurityQuestion";
import BankStatement from "./BankStatement";
import ContactUs from "./ContactUs";
import DeviceMgt from "./DeviceMgt";
import ManageBeneficiary from "./ManagementBeneficiary/ManageBeneficiary";
import TransactionPin from "./TransactionPin";
import SetUp2FA from "./Setup2FA";

const Account = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  return (
    <div className="px-10">
      <Navbar title="Account" subtitle="View all your account settings here" />
      <div className=" flex gap-4 justify-between">
        <div className="flex border-r p-6 flex-col gap-4 bg-white w-[35%]">
          {accountSettingsSteps?.map((step) => (
            <div
              onClick={() => setCurrentTab(step.id as number)}
              className={` p-3 cursor-pointer font-workSans
            ${
              currentTab === step.id
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
          {currentTab === 1 && <Profile />}
          {currentTab === 2 && <Verification />}
          {currentTab === 3 && <TransactionLimit />}
          {currentTab === 4 && <NotificationPreference />}
          {currentTab === 5 && <ResetPasscode />}
          {currentTab === 6 && <TransactionPin />}
          {currentTab === 7 && <SecurityQuestion />}
          {currentTab === 8 && <SetUp2FA />}
          {currentTab === 9 && <BankStatement />}
          {currentTab === 10 && <ManageBeneficiary />}
          {currentTab === 11 && <DeviceMgt />}
          {currentTab === 12 && <ContactUs />}
        </div>
      </div>
    </div>
  );
};

export default Account;
