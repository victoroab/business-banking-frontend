import { IoMdMore } from "react-icons/io";
import { IColData, TVRowDataProps } from "../../../../interfaces/Global";
import { formatTimestamp } from "../../../../utils";
import TVActionMenu from "./Action";

export const tvColumnsData = (
  handleOpenModal: (row: TVRowDataProps) => void,
  selectedRow: TVRowDataProps,
  openAction: boolean,
  refetch: any
): IColData[] => {
  return [
    {
      name: "Beneficiary",
      id: "beneficiary",
      selector: ({ phoneNumber }) => phoneNumber,
      cell: ({ phoneNumber }) => <div className="left-box">{phoneNumber}</div>,
    },
    {
      name: "Card Name Provider",
      id: "tvCardName",
      selector: ({ tvCardName }) => tvCardName,
      cell: ({ tvCardName }) => (
        <div className="centered-box">{tvCardName}</div>
      ),
    },
    {
      name: "Beneficiary Type",
      selector: ({ beneficiaryType }) => beneficiaryType,
      cell: ({ beneficiaryType }) => (
        <div className="centered-box">{beneficiaryType}</div>
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
      cell: (row: TVRowDataProps) => (
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
              <TVActionMenu id={row?.id} row={row} refetch={refetch} />
            </div>
          )}
        </div>
      ),
    },
  ];
};
