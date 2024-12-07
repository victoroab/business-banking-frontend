import AnalyticsChart from "../../components/Chart/analyticsChart";
import Analysis from "../../components/Dashboard/Analysis";
import { useAppSelector } from "../../hooks";
import { selectBusinessInfo } from "../../store/slice/addBusinessSlice";
import { sampleData } from "../../utils";
import "./style.css";
const Home = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const businessInfo = useAppSelector(selectBusinessInfo);

  return (
    <div className="home-wrapper">
      <div className="top">
        <p className="greet">
          Good Afternoon, {businessInfo?.name ? businessInfo?.name : "Bamidele"}
        </p>
        <p className="currentDate">{formattedDate}</p>
      </div>
      <Analysis />
      <AnalyticsChart data={sampleData} />
    </div>
  );
};

export default Home;
