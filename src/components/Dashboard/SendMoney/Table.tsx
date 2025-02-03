import { IoMdMore } from "react-icons/io";
import { TransferDataProps, IColData } from "../../../interfaces/Global";
import TransferActionMenu from "./Action";
import { formatTimestamp } from "../../../utils";

export const sendMoneyColumnsData = (
  handleOpenModal: (row: TransferDataProps) => void,
  selectedRow: TransferDataProps,
  openAction: boolean,
  refetch: any
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
      name: "Beneficiary Type",
      selector: ({ beneficiary }) => beneficiary.beneficiaryType,
      cell: ({ beneficiary }) => (
        <div className="centered-box">{beneficiary.beneficiaryType}</div>
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
      name: "Date Added",
      cell: ({ createdAt }) => (
        <div className="centered-box">{formatTimestamp(createdAt, false)}</div>
      ),
    },

    {
      name: "Action",
      cell: (row: TransferDataProps) => (
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
              <TransferActionMenu id={row?.id} row={row} refetch={refetch} />
            </div>
          )}
        </div>
      ),
    },
  ];
};
