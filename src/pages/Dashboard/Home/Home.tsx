import MobileAppsCard from "../../../components/Dashboard/Home/MobileAppsCard";
import Navbar from "../../../components/Navbar/Navbar";

const Dashboard = () => {
  return (
    <div className="">
      <Navbar
        title="Good Morning, Bamidele"
        subtitle="Here’s your dashboard overview."
      />
      <div className="px-10">
        <MobileAppsCard />
      </div>
    </div>
  );
};

export default Dashboard;
