import AccountCard from "../../../components/Dashboard/Home/AccountCard";
import MobileAppsCard from "../../../components/Dashboard/Home/MobileAppsCard";
import QuickAction from "../../../components/Dashboard/Home/QuickAction";
import TransactionChart from "../../../components/Dashboard/Home/TransactionChart";
import TransactionHistory from "../../../components/Dashboard/Home/TransactionHistory";
import Navbar from "../../../components/Navbar/Navbar";
import { sampleData } from "../../../utils";
import { CautionIcon } from "../../../assets/svg/PayBill";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const { kybDetails } = useAppSelector(selectAuth);

  return (
    <div className="">
      <Navbar
        title="Good Morning, Bamidele"
        subtitle="Here’s your dashboard overview."
      />
      {(kybDetails?.kybStatus === null ||
        kybDetails === null ||
        kybDetails?.kybStatus?.attestation === false) && (
        <div className="flex justify-between bg-secColor p-3 mb-2 mx-10">
          <div className="flex justify-between text-white w-[70%] gap-4 items-center">
            <CautionIcon />
            <p className="text-white font-workSans leading-4 font-semibold text-sm">
              Thank you for choosing Alert as your preferred banking platform!
              To fully activate your account and enable secure transactions, it
              is mandatory to complete your Know Your Business(KYB)
              verification.
            </p>
          </div>
          <button
            className="white-btn"
            onClick={() => navigate("/kyb/identity")}
          >
            Complete KYB
          </button>
        </div>
      )}
      <div className="px-10 flex flex-col gap-10 pb-14">
        <MobileAppsCard />
        <div className="justify-between flex items-center">
          <AccountCard type="Account" />
          <AccountCard type="POS" />
        </div>
        <QuickAction />
        <div className="flex gap-10 items-center">
          <TransactionChart data={sampleData} />
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
