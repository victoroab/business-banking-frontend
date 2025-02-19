import { IoMdMore } from "react-icons/io";
import { PosDataProps, IColData } from "../../../interfaces/Global";
import PosDataActionMenu from "./Action";

export const posDataColumnsData = (
  handleOpenModal: (row: PosDataProps) => void,
  selectedRow: PosDataProps,
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
      name: "Network Provider",
      id: "networkProvider",
      selector: ({ networkProvider }) => networkProvider,
      cell: ({ networkProvider }) => (
        <div className="centered-box">{networkProvider}</div>
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
        <div className="centered-box">{createdAt.slice(0, 10)}</div>
      ),
    },

    {
      name: "Action",
      cell: (row: PosDataProps) => (
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
              <PosDataActionMenu id={row?.id} row={row} refetch={refetch} />
            </div>
          )}
        </div>
      ),
    },
  ];
};
