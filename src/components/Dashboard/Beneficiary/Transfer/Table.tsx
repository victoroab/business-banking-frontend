import { IoMdMore } from "react-icons/io";
import { TransferDataProps, IColData } from "../../../../interfaces/Global";
import TransferActionMenu from "./Action";
import { formatTimestamp } from "../../../../utils";

export const transferColumnsData = (
  handleOpenModal: (row: TransferDataProps) => void,
  selectedRow: TransferDataProps,
  openAction: boolean,
  refetch: any
): IColData[] => {
  return [
    {
      name: "Bank Name",
      id: "bankName",
      selector: ({ bankName }) => bankName,
      cell: ({ bankName }) => <div className="left-box">{bankName}</div>,
    },
    {
      name: "Beneficiary Type",
      selector: ({ beneficiaryType }) => beneficiaryType,
      cell: ({ beneficiaryType }) => (
        <div className="centered-box">{beneficiaryType}</div>
      ),
    },
    {
      name: "Account Name",
      grow: 1.2,
      selector: ({ accountName }) => accountName,
      cell: ({ accountName }) => (
        <div className="centered-box">{accountName}</div>
      ),
    },
    {
      name: "Account Number",
      grow: 1.2,
      selector: ({ accountNumber }) => accountNumber,
      cell: ({ accountNumber }) => (
        <div className="centered-box">{accountNumber}</div>
      ),
    },
    {
      name: "Date Added",
      selector: ({ createdAt }) => createdAt.slice(0, 10),
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
