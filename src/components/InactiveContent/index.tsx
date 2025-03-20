import React from "react";
// import { useAuthHook } from "../../hooks/authHook";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../utils";

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
  sessionTime,
  setShowModal,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    LogoutUser(navigate);
    setShowModal(false);
  };

  return (
    <div className="w-full bg-white animate__animated animate__bounceInRight rounded-lg py-10 px-6 flex flex-col gap-6 justify-center items-center">
      <div className=" w-[650px] flex flex-col gap-4">
        <h2 className="text-center text-pryColor text-2xl font-bricolage font-semibold">
          Session Inactivity Notice
        </h2>
        <p className="font-workSans text-center px-6 text-greyColr">
          You've been idle for {sessionTime} minutes. To ensure your account's
          security, you will be logged out soon. Please resume activity to avoid
          losing any unsaved work. You've been idle for
        </p>

        <div className="flex w-full justify-center items-center text-greyColr text-4xl">
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
