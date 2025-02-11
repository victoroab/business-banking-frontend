import React from "react";
// import { useAuthHook } from "../../hooks/authHook";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../utils";

// import { useGlobalHooks } from "../../hooks/globalHooks";

interface InactiveProps {
  close: () => void;
  counter: number;
  setShowModal: any;
  sessionTime: string;
  id: string;
}
const InactiveContent: React.FC<InactiveProps> = ({
  close,
  counter,

  setShowModal,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser(navigate);
    setShowModal(false);
  };

  return (
    <div className="w-full bg-white animate__animated animate__bounceInRight rounded-lg py-10 px-6 flex flex-col gap-6 justify-center items-center">
      <div className=" w-[650px] flex flex-col gap-4">
        <h2 className="text-center text-pryColor text-2xl font-bricolage font-semibold">
          Login Session Timeout
        </h2>
        <p className="font-workSans text-center px-6 text-greyColr">
          For security reasons, your login session has timed out due to
          inactivity. Please log in again to continue using Alert Business. You
          can retry in
        </p>

        <div className="flex w-full justify-center items-center">
          00:
          <p className="font-workSans text-center px-6 text-greyColr">
            {counter}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 w-full">
        <button onClick={close} className="blue-btn !px-6">
          Cancel
        </button>
        <button
          onClick={handleLogout}
          type="submit"
          className="red-frame-btn !px-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default InactiveContent;
