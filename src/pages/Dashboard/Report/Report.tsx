import Navbar from "../../../components/Navbar/Navbar";
import Paginate from "../../../components/Paginate";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles, transactionsData } from "../../../utils";
import { RowDataProps } from "../../../interfaces/Global";
import { selectGlobal } from "../../../store/slice/globalSlice";
import { useAppSelector } from "../../../hooks";
import TransactionDetails from "../../../components/Dashboard/Transaction/TransactionDetails";
import { columnsData } from "../../../utils/table";

const Report = () => {
  const { handleSearch, handleShow } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<RowDataProps>();
  const [openAction, IsOpenAction] = useState<boolean>(false);
  const toggle = useAppSelector(selectGlobal);
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    terminal: "",
    pageNumber: 1,
    pageSize: 10,
  });

  const handleOpenModal = (row: RowDataProps) => {
    handleShow("show-action");
    IsOpenAction((prev) => !prev);
    setSelectedRow(row);
  };

  return (
    <div className="border">
      <Navbar title="Reports" subtitle="Here’s all your transactions." />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between px-10 items-center">
            <div className="font-medium">Recent Transactions</div>
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

      {toggle["transaction-details"] && (
        <TransactionDetails selectedRow={selectedRow as RowDataProps} />
      )}
    </div>
  );
};

export default Report;
