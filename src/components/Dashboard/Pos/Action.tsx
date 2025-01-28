import { useAppSelector } from "../../../hooks";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { PosDataProps } from "../../../interfaces/Global";
import { selectGlobal } from "../../../store/slice/globalSlice";
import AirtimeDataDetails from "./TransferDetails";

interface PosActionProps {
  id: string | undefined;
  row: PosDataProps;
  refetch: any;
}

const PosDataActionMenu = ({ row, refetch }: PosActionProps) => {
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
            Remove from POS
          </button>
        </li>
      </ul>

      {toggle["transaction-details"] && (
        <AirtimeDataDetails selectedRow={row} refetch={refetch} />
      )}
    </div>
  );
};

export default PosDataActionMenu;
