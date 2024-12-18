import { TransactionRowData } from "../../../interfaces/Global";

interface ActionProps {
  id: number;
  row: TransactionRowData;
  setIsActionMenuOpen: any;
}

const ActionMenu = ({ id, row, setIsActionMenuOpen }: ActionProps) => {
  return (
    <div className="bg-white border rounded-lg w-[200px] shadow-lg px-2 py-1 ">
      <ul className="flex flex-col">
        <li>
          <button className="w-full text-left py-1 hover:font-semibold text-sm">
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
            // onClick={() => handleUpdateUser("deactivate")}
            // disabled={row?.status === "Inactive"}
          >
            Delete Transaction
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ActionMenu;
