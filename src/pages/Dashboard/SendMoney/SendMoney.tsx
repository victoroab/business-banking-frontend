import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Paginate from "../../../components/Paginate";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles, transactionsData } from "../../../utils";
import { TransactionRowData } from "../../../interfaces/Global";
import ActionMenu from "./ActionMenu";
import { IoMdMore } from "react-icons/io";
import { selectGlobal } from "../../../store/slice/globalSlice";
import { useAppSelector } from "../../../hooks";
import PopUp from "../../../components/PopUps/PopUp";
import TransactionDetails from "../../../components/Dashboard/Transaction/TransactionDetails";

const SendMoney = () => {
  const { handleSearch, handleShow } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<TransactionRowData>();
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const toggle = useAppSelector(selectGlobal);
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    terminal: "",
    pageNumber: 1,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const handleOpenModal = (transactionId: number) => {
    setSelectedRowId(transactionId);
    setIsActionMenuOpen((prev) => !prev);
  };

  const columns = [
    {
      name: "Sender",
      headerStyle: {
        backgroundColor: "#007bff", // Blue background for the first header column
        color: "#ffffff", // White text color
      },
      selector: (row: TransactionRowData) => row.sender,
      cell: (row: TransactionRowData) => (
        <div className="left-box">{row.sender}</div>
      ),
    },
    {
      name: "Beneficiary",
      selector: (row: TransactionRowData) => row.beneficiary,
      cell: (row: TransactionRowData) => (
        <div className="centered-box">{row.beneficiary}</div>
      ),
    },
    {
      name: "Bank",
      selector: (row: TransactionRowData) => row.bank,
      cell: (row: TransactionRowData) => (
        <div className="centered-box">{row.bank}</div>
      ),
    },
    {
      name: "Amount (NGN)",
      selector: (row: TransactionRowData) =>
        new Intl.NumberFormat().format(row.amount),
      cell: (row: TransactionRowData) => (
        <div className="centered-box">
          NGN {new Intl.NumberFormat().format(row.amount)}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row: TransactionRowData) => row.status,
      cell: (row: TransactionRowData) => (
        <div className="centered-box">
          <span
            className={`rounded-2xl border flex items-center py-2 px-6 text-center ${
              row.status === "successful"
                ? "text-positive bg-[#f3fbf8]"
                : "text-nagative bg-[#fff7f5]"
            }`}
          >
            {row.status}
          </span>
        </div>
      ),
    },
    {
      name: "Transaction Type",
      selector: (row: TransactionRowData) => row.transactionType,
      cell: (row: TransactionRowData) => (
        <div className="centered-box">{row.transactionType}</div>
      ),
    },
    {
      name: "Transaction Date",
      selector: (row: TransactionRowData) => row.createdAt.slice(0, 10),
      cell: (row: TransactionRowData) => (
        <div className="centered-box">{row.createdAt.slice(0, 10)}</div>
      ),
    },

    {
      name: "Action",
      cell: (row: TransactionRowData) => (
        <div className="centered-box">
          <button>
            {" "}
            <IoMdMore
              className="text-[#69728F]"
              size={24}
              onClick={() => handleOpenModal(row?.id)}
            />
          </button>
          {isActionMenuOpen && selectedRowId === row?.id && (
            <div className="absolute z-[1000] right-[80px] bottom-[-18px] ">
              <ActionMenu
                id={row?.id}
                row={row}
                setIsActionMenuOpen={setIsActionMenuOpen}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  // const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const { id, value } = e.target as HTMLSelectElement;
  //   setQueryData((prev) => ({ ...prev, [id]: parseInt(value) }));
  // };

  const handleRowClick = (row: TransactionRowData) => {
    setSelectedRow(row);
    handleShow(`transaction-details`);
  };

  return (
    <div className="border">
      <Navbar
        title="Send Money"
        subtitle="Sending money has never been easier. ."
      />
      <div className="flex flex-col gap-10">
        <div className="flex justify-end px-10">
          <button
            className="main-btn w-40 font-bricolage"
            onClick={() => navigate("/new-transaction")}
          >
            Send Money
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between px-10 items-center">
            <div className="font-medium">Transactions</div>
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
                columns={columns}
                data={transactionsData}
                customStyles={tableCustomStyles}
                onRowClicked={handleRowClick}
                className="cursor-pointer"
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

      {toggle["transaction-details"] && (
        <TransactionDetails selectedRow={selectedRow as TransactionRowData} />
      )}
    </div>
  );
};

export default SendMoney;
