import { IoMdMore } from "react-icons/io";
import { IColData } from "../../../interfaces/Global";
import { formatTimestamp } from "../../../utils";
import { TransactionProps } from "../../../interfaces/service/billPayment";
import AirtimeDataActionMenu from "./Action";

export const airtimeColumnsData = (
  handleOpenModal: (row: TransactionProps) => void,
  selectedRow: TransactionProps,
  openAction: boolean,
  refetch: any,
  onClose: any
): IColData[] => {
  return [
    {
      name: "Beneficiary",
      grow: 1.6,
      id: "bankName",
      cell: ({ beneficiary }) => (
        <div className="left-box">{beneficiary.phoneNumber}</div>
      ),
    },
    {
      name: "Network Provider",
      cell: ({ beneficiary }) => (
        <div className="centered-box">{beneficiary.networkProvider}</div>
      ),
    },
    {
      name: "Amount",
      grow: 1.2,
      cell: ({ amount }) => <div className="centered-box">NGN{amount}</div>,
    },
    {
      name: "Status",
      selector: ({ status }) => status,
      cell: ({ status }) => (
        <div className="centered-box">
          <span
            className={`rounded-2xl flex items-center py-2 px-4 text-center ${
              status === "successful"
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
      name: "Transaction Date",
      cell: ({ createdAt }) => (
        <div className="centered-box">{formatTimestamp(createdAt, false)}</div>
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
              <AirtimeDataActionMenu
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

export const dataColumnsData = (
  handleOpenModal: (row: TransactionProps) => void,
  selectedRow: TransactionProps,
  openAction: boolean,
  refetch: any,
  onClose: any
): IColData[] => {
  return [
    {
      name: "Beneficiary",
      grow: 1.6,
      id: "bankName",
      cell: ({ beneficiary }) => (
        <div className="left-box">{beneficiary.phoneNumber}</div>
      ),
    },
    {
      name: "Network Provider",
      cell: ({ beneficiary }) => (
        <div className="centered-box">{beneficiary.networkProvider}</div>
      ),
    },
    {
      name: "Amount",
      grow: 1.2,
      cell: ({ amount }) => <div className="centered-box">NGN{amount}</div>,
    },
    {
      name: "Status",
      selector: ({ status }) => status,
      cell: ({ status }) => (
        <div className="centered-box">
          <span
            className={`rounded-2xl flex items-center py-2 px-4 text-center ${
              status === "successful"
                ? "text-positive bg-[#f3fbf8]"
                : "text-nagative bg-[#fff7f5]"
            }`}
          >
            {status}
          </span>
        </div>
      ),
    },
    {
      name: "Transaction Date",
      cell: ({ createdAt }) => (
        <div className="centered-box">{formatTimestamp(createdAt, false)}</div>
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
              <AirtimeDataActionMenu
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
