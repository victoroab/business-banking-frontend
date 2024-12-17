import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";

const PayBills = () => {
  const navigate = useNavigate();
  return (
    <div className="border">
      <Navbar
        title="Pay Bill"
        subtitle="Settle your bills for utilities, subscriptions, and more—all in one place!"
      />
      <div className="">
        <div className="flex justify-end px-10">
          <button
            className="main-btn w-40 font-bricolage"
            onClick={() => navigate("/pay-new-bill")}
          >
            Pay New Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayBills;
