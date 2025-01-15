import { useAppSelector } from "../../../../hooks";
import { selectDashboard } from "../../../../store/slice/dashboardSlice";
import ElectricityProvider from "./Electricity/Provider";
import CableProvider from "./CableTV/Provider";
import BetProvider from "./Betting/Provider";

const BillProvider = () => {
  const { billCategory } = useAppSelector(selectDashboard);

  return (
    <div>
      {billCategory === "Electricity" ? (
        <ElectricityProvider />
      ) : billCategory === "Cable TV" ? (
        <CableProvider />
      ) : (
        <BetProvider />
      )}
    </div>
  );
};

export default BillProvider;
