import { IoMdMore } from "react-icons/io";
import { ActivityProps, IColData } from "../../../interfaces/Global";
import ActivityActionMenu from "./Action";

export const activityColumnsData = (
  handleOpenModal: (row: ActivityProps) => void,
  selectedRow: ActivityProps,
  openAction: boolean,
  refetch: any,
  onClose: any
): IColData[] => {
  return [
    {
      name: "Name",
      id: "sender",
      cell: ({ user }) => (
        <div className="left-box">
          {" "}
          {user?.firstName.charAt(0).toUpperCase() +
            user?.firstName.slice(1).toLowerCase()}
        </div>
      ),
    },

    {
      name: "Action",
      grow: 1.2,
      cell: ({ action }) => <div className="centered-box">{action}</div>,
    },
    {
      name: "Description",
      cell: ({ description }) => (
        <div className="centered-box">{description}</div>
      ),
    },

    {
      name: "Activity Date",
      selector: ({ createdAt }) => createdAt.slice(0, 10),
      cell: ({ createdAt }) => (
        <div className="centered-box">{createdAt.slice(0, 10)}</div>
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
      cell: (row: ActivityProps) => (
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
            <div className="absolute z-[1000] right-[70px] bottom-[0px] ">
              <ActivityActionMenu
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
