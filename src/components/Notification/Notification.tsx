import { useEffect, useRef } from "react";
// import { useAppSelector } from "../../hooks";
// import { selectGlobal } from "../../store/slice/globalSlice";
import { useGlobalHooks } from "../../hooks/globalHooks";
import PopUp from "../PopUps/PopUp";
import { BigBell } from "../../assets/svg/BigBell";
import { AlertLogoIcon } from "../../assets/svg/Sidebar";
import { useGetAllNotificationQuery } from "../../service/transaction";

const Notification = () => {
  const { handleShow } = useGlobalHooks();

  const notificationRef = useRef<HTMLDivElement>(null);

  const queryData = {
    type: "APP",
  };

  const { data } = useGetAllNotificationQuery(queryData);

  const notifications = data?.data?.data;
  const onClose = () => {
    handleShow("notification");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <PopUp id={"notification"} className="!justify-end">
      <section className="animate__animated animate__bounceInRight h-full w-9/12 py-10 absolute overflow-y-auto bg-white pb-24 md:w-4/12">
        <div className="flex justify-between items-center p-6">
          <p className="font-medium text-[#15191E] text-[20px] font-bricolage">
            Notifications
          </p>
          <p
            className="font-workSans font-normal text-pryColor text-sm cursor-pointer"
            //   onClick={() => navigate("/reports")}
          >
            Clear All
          </p>
        </div>

        {notifications?.length > 0 ? (
          <>
            {" "}
            {notifications?.map((notification: any) => (
              <div className="flex p-[10px] px-[20px] cursor-pointer font-normal flex-col text-[15px] items-start gap-[10px] border-b">
                <div className="items-center flex  justify-between gap-2 rounded-xl p-4 w-full">
                  <div className="flex gap-2">
                    <AlertLogoIcon />
                    <div className="text-positive font-workSans flex gap-2 flex-col leading-4 font-semibold text-sm">
                      {notification?.transaction?.action} Alert!
                      <span className="text-sm font-normal text-greyColr">
                        You have just received{" "}
                        {notification?.transaction?.amount} from OLUWATOBI OSENI
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-normal text-greyColr">14h</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center h-[70vh] flex-col gap-4">
            <BigBell />
            <div className="flex flex-col justify-between items-center p-6 gap-4">
              <p className="font-medium text-[#15191E] text-[20px] font-bricolage">
                No notifications yet
              </p>
              <p
                className="font-workSans font-normal text-pryColor text-sm"
                //   onClick={() => navigate("/reports")}
              >
                We'll let your know when updates arrive!
              </p>
            </div>
          </div>
        )}
      </section>
    </PopUp>
  );
};

export default Notification;
