// import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Navbar from "../../../components/Navbar/Navbar";
import { tableCustomStyles, transactionsData } from "../../../utils";
import { columnsData } from "../../../utils/table";
import { RowDataProps } from "../../../interfaces/Global";
import Paginate from "../../../components/Paginate";
import { useState } from "react";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { GiCheckMark } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BsBoxArrowInUpLeft } from "react-icons/bs";
const Approvals = () => {
  //   const navigate = useNavigate();
  const { handleSearch } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<RowDataProps[]>([]);
  const [selectedRow, setSelectedRow] = useState<RowDataProps>();
  const [openAction, IsOpenAction] = useState<boolean>(false);
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    terminal: "",
    pageNumber: 1,
    pageSize: 10,
  });

  const handleOpenModal = (row: RowDataProps) => {
    // handleShow("show-action");
    setSelectedRow(row);
    IsOpenAction((prev) => !prev);
  };
  const [selectedTab, setSelectedTab] = useState<"payments" | "beneficiaries">(
    "payments"
  );
  return (
    <div className="border">
      <Navbar
        title="Approvals"
        subtitle="This section allows you to track, verify, and authorize payments efficiently."
      />
      <div className="flex flex-col gap-10">
        <div className="flex justify-end px-10">
          <button
            className={`pb-2 px-4 font-medium transition-all ${
              selectedTab === "payments"
                ? "border-b-2 border-[#DBB950]"
                : "border-b-2 border-b-[#A4A9AE26]"
            }`}
            onClick={() => setSelectedTab("payments")}
          >
            Verify Payments
          </button>
          <button
            className={`pb-2 px-4 font-medium transition-all ${
              selectedTab === "beneficiaries"
                ? "border-b-2 border-[#DBB950]"
                : "border-b-2 border-b-[#A4A9AE26]"
            }`}
            onClick={() => setSelectedTab("beneficiaries")}
          >
            Verify Beneficiaries List
          </button>
        </div>

        <div className="flex justify-end px-10 gap-6">
          <button className="w-fit flex items-center justify-center gap-2 h-[48px] p-4 rounded-[12px] bg-[#1C7CD51A] text-[#0E0C60] font-bold">
            <BsBoxArrowInUpLeft />
            Select Item
          </button>
          <button className="w-fit flex items-center justify-center gap-2 h-[48px] p-4 rounded-[12px] bg-[#25A9691A] text-[#25A969] font-bold">
            <GiCheckMark />
            Verify All
          </button>
          <button className="w-fit flex items-center justify-center gap-2 h-[48px] p-4 rounded-[12px] bg-[#FA47471A] text-negativeRed font-bold">
            <FaXmark />
            Reject All
          </button>
          <button className="w-fit flex items-center justify-center gap-2 h-[48px] p-4 rounded-[12px] bg-[#DBB9501A] text-[#DBB950] font-bold">
            <IoCheckmarkCircleOutline />
            Validate Account
          </button>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex justify-between px-10 items-center">
            <div className="font-medium">Recent Approvals</div>
            <div className="font-semibold text-negativeRed text-xs curpo">
              Download CSV
            </div>
          </div>

          <section
            className="relative px-10 font-workSans"
            style={{ boxShadow: "0px 1px 7px 4px rgba(216, 216, 216, 0.2)" }}
          >
            <div className="">
              <DataTable
                columns={columnsData(
                  handleOpenModal,
                  selectedRow as RowDataProps,
                  openAction
                )}
                data={transactionsData}
                customStyles={tableCustomStyles}
                className=""
              />
            </div>

            <div className="">
              <Paginate
                data={transactionsData}
                handleSearch={handleSearch}
                currentPage={filteredData}
                setCurrentPage={setFilteredData}
                searchParams="ref"
                itemsPerPage={queryData?.pageSize as number}
                setQueryData={setQueryData}
                totalItemsCount={transactionsData.length}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Approvals;
