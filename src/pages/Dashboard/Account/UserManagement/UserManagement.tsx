import { useState } from "react";
import { manageBeneficiaryHeader } from "../../../../utils";
import Admin from "./Admin";
import SuperAdmin from "./SuperAdmin";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
            User Management
          </h3>
          <button
            className="yellow-frame-btn"
            onClick={() => navigate("/account-settings/user-management/assign")}
          >
            Assign New User
          </button>
        </div>

        <div className="flex transition-all duration-300 border-b w-[80%]">
          {manageBeneficiaryHeader.map((tab) => (
            <button
              key={tab.id}
              className={`py-3 px-6 focus:outline-none transition-colors text-workSans font-medium duration-300 ${
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
        {activeTab === 1 && <Admin />}
        {activeTab === 2 && <SuperAdmin />}
        {activeTab === 3 && <SuperAdmin />}
        {activeTab === 4 && <SuperAdmin />}
        {activeTab === 5 && <SuperAdmin />}
      </div>
    </div>
  );
};

export default UserManagement;
