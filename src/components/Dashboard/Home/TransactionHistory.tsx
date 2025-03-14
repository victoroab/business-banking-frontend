import { useNavigate } from "react-router-dom";
import {
  formatOnlyTimestamp,
  formatTimestamp,
  // transactionHistory,
} from "../../../utils";
import { useGetAllTransactionsQuery } from "../../../service/transaction";
import NoData from "../../NoData/NoData";
import Spinner from "../../Spinner/Spinner";
import { TransactionElectricityIcon } from "../../../assets/svg/CustomSVGs";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllTransactionsQuery({});

  const newList = data?.data?.data?.map((data: any) => ({
    id: data?.id,
    amount: data?.amount,
    status: data?.status,
    icon:
      data?.transactionType === "TRANSFER"
        ? TransactionElectricityIcon
        : data?.transactionType === "TV_BILL"
        ? TransactionElectricityIcon
        : data?.transactionType === "ELECTRICITY"
        ? TransactionElectricityIcon
        : data?.transactionType === "DATA"
        ? TransactionElectricityIcon
        : TransactionElectricityIcon,
    action: data?.action,
    purpose: data?.narration,
    date: data?.createdAt,
  }));

  console.log(data?.data?.data, "testingggggggg transa");
  return (
    <div className="bg-white rounded-lg w-[40%] p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="font-medium text-[#15191E] text-[20px]">
          Transaction History
        </p>
        <p
          className="font-workSans font-normal text-pryColor text-sm cursor-pointer"
          onClick={() => navigate("/reports")}
        >
          See All
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {" "}
            {newList?.length > 0 ? (
              <>
                {" "}
                {newList?.map((transaction: any) => (
                  <div className="flex justify-between" key={transaction.id}>
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
                          {formatTimestamp(transaction.date, false)}
                        </p>
                      </div>
                    </div>

                    <div className="right items-end flex flex-col">
                      <p className="amount font-workSans text-[13px] font-semibold">
                        {transaction.action === "CREDIT" ? "+" : "-"}
                        &#8358;{transaction.amount}
                      </p>
                      <p className="amount font-workSans text-lightGreyColor font-normal text-xs">
                        {formatOnlyTimestamp(transaction.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex justify-center items-center py-6">
                <NoData />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
