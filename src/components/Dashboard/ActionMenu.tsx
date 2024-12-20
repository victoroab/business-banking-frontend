import TransactionDetails from "./Transaction/TransactionDetails";
import { useAppSelector } from "../../hooks";
import { useGlobalHooks } from "../../hooks/globalHooks";
import { RowDataProps } from "../../interfaces/Global";
import { selectGlobal } from "../../store/slice/globalSlice";

interface ActionProps {
  id: number;
  row: RowDataProps;
  setIsActionMenuOpen?: any;
}

const ActionMenu = ({ row }: ActionProps) => {
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

        <li>
          <button
            className={`w-full text-left py-1 text-sm ${
              row?.status !== "successful"
                ? "text-[#e8787b] "
                : "hover:font-semibold text-[#DB353A] "
            }`}
          >
            Delete Transaction
          </button>
        </li>
      </ul>

      {toggle["transaction-details"] && (
        <TransactionDetails selectedRow={row} />
      )}
    </div>
  );
};

export default ActionMenu;
