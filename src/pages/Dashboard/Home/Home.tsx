import AccountCard from "../../../components/Dashboard/Home/AccountCard";
import MobileAppsCard from "../../../components/Dashboard/Home/MobileAppsCard";
import QuickAction from "../../../components/Dashboard/Home/QuickAction";
import TransactionChart from "../../../components/Dashboard/Home/TransactionChart";
import TransactionHistory from "../../../components/Dashboard/Home/TransactionHistory";
import Navbar from "../../../components/Navbar/Navbar";
import { sampleData } from "../../../utils";

const Dashboard = () => {
  return (
    <div className="">
      <Navbar
        title="Good Morning, Bamidele"
        subtitle="Here’s your dashboard overview."
      />
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
