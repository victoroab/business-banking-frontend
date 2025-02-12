import TransferDetails from "./TransferDetails";
import { useAppSelector } from "../../../hooks";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { TransferDataProps } from "../../../interfaces/Global";
import { selectGlobal } from "../../../store/slice/globalSlice";
import { useEffect, useRef } from "react";

interface TransferActionProps {
  id: string;
  row: TransferDataProps;
  refetch: any;
  onClose: () => void;
}

const TransferActionMenu = ({ row, refetch, onClose }: TransferActionProps) => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();

  const menuRef = useRef<HTMLDivElement>(null);

  const handleViewDetails = () => {
    handleShow(`transaction-details`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="bg-white border rounded-lg w-[200px] shadow-lg px-2 py-1 "
    >
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
            Remove from Transaction
          </button>
        </li>
      </ul>

      {toggle["transaction-details"] && (
        <TransferDetails selectedRow={row} refetch={refetch} />
      )}
    </div>
  );
};

export default TransferActionMenu;
