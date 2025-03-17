import { IoMdMore } from "react-icons/io";
import { IColData } from "../../../interfaces/Global";
import TransferActionMenu from "./Action";
import { formatTimestamp } from "../../../utils";
import { TransactionProps } from "../../../interfaces/service/billPayment";

export const sendMoneyColumnsData = (
  handleOpenModal: (row: TransactionProps) => void,
  selectedRow: TransactionProps,
  openAction: boolean,
  refetch: any,
  onClose: any
): IColData[] => {
  return [
    {
      name: "Bank Name",
      grow: 1.6,
      id: "bankName",
      selector: ({ beneficiary }) => beneficiary.bankName,
      cell: ({ beneficiary }) => (
        <div className="left-box">{beneficiary.bankName}</div>
      ),
    },

    {
      name: "Account Name",
      grow: 1.2,
      selector: ({ beneficiary }) => beneficiary.accountName,
      cell: ({ beneficiary }) => (
        <div className="centered-box">{beneficiary.accountName}</div>
      ),
    },
    {
      name: "Account Number",
      grow: 1.2,
      selector: ({ beneficiary }) => beneficiary.accountNumber,
      cell: ({ beneficiary }) => (
        <div className="centered-box">{beneficiary.accountNumber}</div>
      ),
    },
    {
      name: "Amount",
      cell: ({ amount }) => (
        <div className="centered-box">
          NGN {new Intl.NumberFormat().format(amount)}
        </div>
      ),
    },
    {
      name: "Date Added",
      cell: ({ createdAt }) => (
        <div className="centered-box">{formatTimestamp(createdAt, false)}</div>
      ),
    },
    {
      name: "Status",
      selector: ({ status }) => status,
      cell: ({ status }) => (
        <div className="centered-box">
          <span
            className={`rounded-2xl flex items-center py-2 px-4 text-center ${
              status === "SUCCESS"
                ? "text-positive bg-[#f3fbf8]"
                : status === "PENDING"
                ? "text-secColor bg-[#fdfbf6]"
                : "text-nagative bg-[#fff7f5]"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </span>
        </div>
      ),
    },

    {
      name: "Action",
      cell: (row: TransactionProps) => (
        <div className="centered-box">
          <button>
            {" "}
            <IoMdMore
              className="text-[#69728F] cursor-pointer"
              size={24}
              onClick={() => handleOpenModal(row)}
            />
          </button>

          {openAction && selectedRow?.id === row?.id && (
            <div className="absolute z-[1000] right-[70px] bottom-[-18px] ">
              <TransferActionMenu
                id={row?.id}
                row={row}
                refetch={refetch}
                onClose={onClose}
              />
            </div>
          )}
        </div>
      ),
    },
  ];
};
