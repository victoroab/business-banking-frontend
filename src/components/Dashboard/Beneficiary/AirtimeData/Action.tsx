import { useAppSelector } from "../../../../hooks";
import { useGlobalHooks } from "../../../../hooks/globalHooks";
import { AirtimeRowDataProps } from "../../../../interfaces/Global";
import { selectGlobal } from "../../../../store/slice/globalSlice";
import AirtimeDataDetails from "./TransferDetails";

interface AirtimeActionProps {
  id: string;
  row: AirtimeRowDataProps;
  refetch: any;
}

const AirtimeDataActionMenu = ({ row, refetch }: AirtimeActionProps) => {
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
        <AirtimeDataDetails selectedRow={row} refetch={refetch} />
      )}
    </div>
  );
};

export default AirtimeDataActionMenu;
