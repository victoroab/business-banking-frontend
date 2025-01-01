import { useState } from "react";
import { EditIcon, SliderIcon } from "../../../../assets/svg/Accout";
import EditLimit from "./EditLimit";

const TransactionLimit = () => {
  const [editLimit, setEditLimit] = useState<boolean>(false);

  const handleEdit = () => {
    setEditLimit(true);
  };
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Transaction Limits
        </h3>
      </div>
      {editLimit ? (
        <EditLimit />
      ) : (
        <div className="flex flex-col gap-8 w-full">
          <div
            className="p-4 gap-4 rounded-xl flex flex-col w-full"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
          >
            <p className="tit text-base text-normal text-greyColr font-workSans">
              Transaction Limits
            </p>
            <p className="text-sm text-greyColr font-workSans text-normal">
              Control how much you can transact daily with our flexible
              transaction limit feature. Adjust your limits to suit your
              business or personal needs while keeping your account secure.
            </p>
            <SliderIcon />
          </div>

          <div className="flex flex-col gap-2">
            <p className="tit text-base text-normal text-greyColr font-workSans">
              Transfer Limits
            </p>

            <div
              className="p-4 gap-4 rounded-xl flex flex-col w-full justify-center items-center"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <div className="flex justify-between items-center gap-6">
                <div className="border-dashed p-4 justify-center border-2 w-[198px]  items-center gap-2 flex flex-col  rounded-xl">
                  <p className="text-lightGreyColor font-workSansleading-4  font-normal text-sm">
                    Daily Transfer Limit
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
                    500,000.00
                  </p>
                </div>

                <div className="border-dashed p-4 justify-center w-[198px] items-center gap-2  flex flex-col border-2 rounded-xl">
                  <p className="text-lightGreyColor font-workSans leading-4 font-normal text-sm">
                    Single Transfer Limit
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
                    500,000.00
                  </p>
                </div>
              </div>
              <p
                className="text-base font-workSans cursor-pointer text-medium text-secColor flex items-center"
                onClick={handleEdit}
              >
                Set Custom Limit <EditIcon />
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="tit text-base text-normal text-greyColr font-workSans">
              Airtime Limits
            </p>

            <div
              className="p-4 gap-4 rounded-xl flex flex-col w-full justify-center items-center"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <div className="flex justify-between items-center gap-6">
                <div className="border-dashed p-4 justify-center  w-[198px]  items-center gap-2 flex flex-col border-2 rounded-xl">
                  <p className="text-lightGreyColor font-workSansleading-4  font-normal text-sm">
                    Daily Transfer Limit
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
                    500,000.00
                  </p>
                </div>

                <div className="border-dashed p-4 justify-center w-[198px] items-center gap-2  flex flex-col border-2 rounded-xl">
                  <p className="text-lightGreyColor font-workSans leading-4 font-normal text-sm">
                    Single Transfer Limit
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
                    500,000.00
                  </p>
                </div>
              </div>
              <p
                className="text-base font-workSans cursor-pointer text-medium text-secColor flex items-center"
                onClick={handleEdit}
              >
                Set Custom Limit <EditIcon />
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="tit text-base text-normal text-greyColr font-workSans">
              Bill Payment Limits
            </p>

            <div
              className="p-4 gap-4 rounded-xl flex flex-col w-full justify-center items-center"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <div className="flex justify-between items-center gap-6">
                <div className="border-dashed p-4 justify-center  w-[198px]  items-center gap-2 flex flex-col border-2 rounded-xl">
                  <p className="text-lightGreyColor font-workSansleading-4  font-normal text-sm">
                    Daily Transfer Limit
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
                    500,000.00
                  </p>
                </div>

                <div className="border-dashed p-4 justify-center w-[198px] items-center gap-2  flex flex-col border-2 rounded-xl">
                  <p className="text-lightGreyColor font-workSans leading-4 font-normal text-sm">
                    Single Transfer Limit
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
                    500,000.00
                  </p>
                </div>
              </div>
              <p
                className="text-base font-workSans cursor-pointer text-medium text-secColor flex items-center"
                onClick={handleEdit}
              >
                Set Custom Limit <EditIcon />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionLimit;
//       <div className="grid grid-cols-2 gap-10 w-full">
