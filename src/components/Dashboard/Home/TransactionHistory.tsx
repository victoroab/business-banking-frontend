import { transactionHistory } from "../../../utils";

const TransactionHistory = () => {
  return (
    <div className="bg-white rounded-lg w-[40%] p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="font-medium text-[#15191E] text-[20px]">
          Transaction History
        </p>
        <p className="font-workSans font-normal text-pryColor text-sm cursor-pointer">
          See All
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {transactionHistory?.map((transaction: any) => (
          <div className="flex justify-between ">
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

            <div className="right">
              <p className="amount font-workSans text-[13px] font-semibold">
                {transaction.status === "CREDIT" ? "+" : "-"}
                {transaction.amount}
              </p>
              <p className="amount font-workSans text-lightGreyColor font-normal text-xs">
                {transaction.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
