import { DeleteIcon, ScreenIcon } from "../../../assets/svg/Accout";

const DeviceMgt = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Contact Us
        </h3>

        <div
          className="p-6 gap-4 rounded-md items-center flex justify-between w-full"
          style={{
            boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
          }}
        >
          <div className="flex gap-2 w-full items-center">
            <ScreenIcon />
            <div className="flex flex-col items-start justify-start">
              <p className="text-greyColr font-workSans font-normal">Desktop</p>
              <p className="text-[13px] text-lightGreyColor font-workSans font-normal">
                Windows
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full items-center justify-end">
            <div className="flex flex-col items-end justify-end">
              <DeleteIcon className="cursor-pointer" />
              <p className="text-[13px] text-lightGreyColor font-workSans font-normal">
                Added Dec 1st, 22024
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-6 gap-4 rounded-md items-center flex justify-between w-full"
          style={{
            boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
          }}
        >
          <div className="flex gap-2 w-full items-center">
            <ScreenIcon />
            <div className="flex flex-col items-start justify-start">
              <p className="text-greyColr font-workSans font-normal">
                Macbook M4 Pro
              </p>
              <p className="text-[13px] text-lightGreyColor font-workSans font-normal">
                Mac
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full items-center justify-end">
            <div className="flex flex-col items-end justify-end">
              <DeleteIcon className="cursor-pointer" />
              <p className="text-[13px] text-lightGreyColor font-workSans font-normal">
                Added Dec 1st, 22024
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-6 gap-4 rounded-md items-center flex justify-between w-full"
          style={{
            boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
          }}
        >
          <div className="flex gap-2 w-full items-center">
            <ScreenIcon />
            <div className="flex flex-col items-start justify-start">
              <p className="text-greyColr font-workSans font-normal">
                Iphone 16 Pro Max
              </p>
              <p className="text-[13px] text-lightGreyColor font-workSans font-normal">
                Ios
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full items-center justify-end">
            <div className="flex flex-col items-end justify-end">
              <DeleteIcon className="cursor-pointer" />
              <p className="text-[13px] text-lightGreyColor font-workSans font-normal">
                Added Dec 1st, 22024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceMgt;
