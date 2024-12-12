import AccountCard from "../../../components/Dashboard/Home/AccountCard";
import MobileAppsCard from "../../../components/Dashboard/Home/MobileAppsCard";
import QuickAction from "../../../components/Dashboard/Home/QuickAction";
import Navbar from "../../../components/Navbar/Navbar";

const Dashboard = () => {
  return (
    <div className="">
      <Navbar
        title="Good Morning, Bamidele"
        subtitle="Here’s your dashboard overview."
      />
      <div className="px-10 flex flex-col gap-10">
        <MobileAppsCard />
        <div className="justify-between flex items-center">
          <AccountCard type="Account" />
          <AccountCard type="POS" />
        </div>
        <QuickAction />
      </div>
    </div>
  );
};

export default Dashboard;
