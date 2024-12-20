import { IoMdMore } from "react-icons/io";
import ActionMenu from "../components/Dashboard/ActionMenu";
import { IColData, RowDataProps } from "../interfaces/Global";

export const columnsData = (
  handleOpenModal: (row: RowDataProps) => void,
  toggle: any,
  selectedRow: RowDataProps,
  openAction?: any
): IColData[] => {
  return [
    {
      name: "Sender",
      id: "sender",
      selector: ({ sender }) => sender,
      cell: ({ sender }) => <div className="left-box">{sender}</div>,
    },
    {
      name: "Beneficiary",
      selector: ({ beneficiary }) => beneficiary,
      cell: ({ beneficiary }) => (
        <div className="centered-box">{beneficiary}</div>
      ),
    },
    {
      name: "Bank",
      grow: 1.2,
      selector: ({ bank }) => bank,
      cell: ({ bank }) => <div className="centered-box">{bank}</div>,
    },
    {
      name: "Amount (NGN)",
      grow: 1.2,
      selector: ({ amount }) => new Intl.NumberFormat().format(amount),
      cell: ({ amount }) => (
        <div className="centered-box">
          NGN {new Intl.NumberFormat().format(amount)}
        </div>
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
      name: "Transaction Type",
      selector: ({ transactionType }) => transactionType,
      cell: ({ transactionType }) => (
        <div className="centered-box">{transactionType}</div>
      ),
    },
    {
      name: "Transaction Date",
      selector: ({ createdAt }) => createdAt.slice(0, 10),
      cell: ({ createdAt }) => (
        <div className="centered-box">{createdAt.slice(0, 10)}</div>
      ),
    },

    {
      name: "Action",
      cell: (row: RowDataProps) => (
        <div className="centered-box">
          <button>
            {" "}
            <IoMdMore
              className="text-[#69728F] cursor-pointer"
              size={24}
              onClick={() => handleOpenModal(row)}
            />
          </button>
          {/* {toggle["show-action"] && selectedRow?.id === row?.id && (
            <div className="absolute z-[1000] right-[500px] bottom-[-18px] border border-red-400">
              <ActionMenu id={row?.id} row={row} />
            </div>
          )} */}

          {openAction && selectedRow?.id === row?.id && (
            <div className="absolute z-[1000] right-[70px] bottom-[-18px] ">
              <ActionMenu id={row?.id} row={row} />
            </div>
          )}
        </div>
      ),
    },
  ];
};
