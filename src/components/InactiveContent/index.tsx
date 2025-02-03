import React from "react";

import PopUp from "../PopUps/PopUp";
import { useAuthHook } from "../../hooks/authHook";

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
  id,
}) => {
  const { logoutUser } = useAuthHook();
  return (
    <PopUp id={id as string}>
      <div className="w-9/12 md:w-5/12 bg-white animate__animated animate__bounceInRight rounded-lg py-10 px-6">
        <div className="w-500">
          <h2 className="text-center p-4 text-pryColor text-2xl font-bricolage font-semibold">
            You have been idle for {sessionTime} mins!
          </h2>
          <p className="font-workSans text-center p-4 text-greyColr">
            You will be logged out of your session in {counter} sec. Press
            cancel to stay?
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 w-full">
          <button onClick={close} className="yellow-frame-btn !px-6">
            Cancel
          </button>
          <button onClick={logoutUser} type="submit" className="main-btn !px-6">
            Logout
          </button>
        </div>
      </div>
    </PopUp>
  );
};

export default InactiveContent;
