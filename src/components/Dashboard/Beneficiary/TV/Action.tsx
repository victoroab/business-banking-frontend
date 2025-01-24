import TransferDetails from "./TransferDetails";
import { useAppSelector } from "../../../../hooks";
import { useGlobalHooks } from "../../../../hooks/globalHooks";
import { selectGlobal } from "../../../../store/slice/globalSlice";
import { TVRowDataProps } from "../../../../interfaces/Global";

interface TransferActionProps {
  id: string;
  row: TVRowDataProps;
  refetch: any;
}

const TVActionMenu = ({ row, refetch }: TransferActionProps) => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();

  const handleViewDetails = () => {
    handleShow(`transaction-details`);
  };

  return (
    <div className="bg-white border rounded-lg w-[200px] shadow-lg px-2 py-1 ">
      <ul className="flex flex-col">
        <li>
          <button
            className="w-full text-left py-1 hover:font-semibold text-sm"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </li>
        <li>
          <button className="w-full text-left py-1 hover:font-semibold text-sm">
            Remove from Beneficiary
          </button>
        </li>
      </ul>

      {toggle["transaction-details"] && (
        <TransferDetails selectedRow={row} refetch={refetch} />
      )}
    </div>
  );
};

export default TVActionMenu;
