import { IoMdMore } from "react-icons/io";
import { transactionHistory } from "../../../../utils";

const Airtime = () => {
  return (
    <div className="flex flex-col gap-4">
      {transactionHistory?.map((transaction: any) => (
        <div
          className="flex justify-between p-6"
          style={{
            boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
          }}
          key={transaction.id}
        >
          <div className="left flex items-center gap-2">
            <div
              className={`w-[40px] h-[40px] rounded-md items-center justify-center flex ${
                transaction.status === "CREDIT"
                  ? "bg-[#F3FBF8]"
                  : "bg-[#FFF7F5]"
              }`}
            >
              <transaction.icon />
            </div>
            <div className="di">
              <p className="amount font-workSans text-medium text-[13px]">
                {transaction.purpose}
              </p>
              <p className="amount font-workSans text-lightGreyColor font-normal text-xs">
                {transaction.date}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-end items-end">
            <IoMdMore
              className="text-lightGreyColor cursor-pointer"
              size={18}
            />
            <p className="amount font-workSans text-lightGreyColor font-normal text-xs">
              {transaction.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Airtime;
