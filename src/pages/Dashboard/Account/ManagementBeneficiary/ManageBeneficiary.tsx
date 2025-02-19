import { useState } from "react";
import { manageBeneficiaryHeader } from "../../../../utils";
import Transfer from "./Transfer";
import Airtime from "./Airtime";
import Bills from "./Bills";

const ManageBeneficiary = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Manage Beneficiaries
        </h3>

        <div className="flex transition-all duration-300 border-b w-[450px]">
          {manageBeneficiaryHeader.map((tab) => (
            <button
              key={tab.id}
              className={`py-3 px-4 focus:outline-none transition-colors text-workSans font-medium duration-300 ${
                activeTab === tab.id
                  ? "text-greyColr border-b-2 border-secColor"
                  : "text-[#8e949a]"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        {activeTab === 1 && <Transfer />}
        {activeTab === 2 && <Airtime />}
        {activeTab === 3 && <Bills />}
      </div>
    </div>
  );
};

export default ManageBeneficiary;
