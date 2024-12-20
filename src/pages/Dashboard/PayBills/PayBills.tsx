import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { RowDataProps } from "../../../interfaces/Global";
import { useAppSelector } from "../../../hooks";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useState } from "react";
import { selectGlobal } from "../../../store/slice/globalSlice";
import DataTable from "react-data-table-component";
import Paginate from "../../../components/Paginate";
import { tableCustomStyles, transactionsData } from "../../../utils";
import { columnsData } from "../../../utils/table";

const PayBills = () => {
  const navigate = useNavigate();
  const { handleSearch, handleShow } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<RowDataProps>();
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
    setSelectedRow(row);
  };

  return (
    <div className="border">
      <Navbar
        title="Pay Bill"
        subtitle="Settle your bills for utilities, subscriptions, and more—all in one place!"
      />
      <div className="">
        <div className="flex justify-end px-10">
          <button
            className="main-btn w-40 font-bricolage"
            onClick={() => navigate("/pay-new-bill")}
          >
            Pay New Bill
          </button>
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
              toggle,
              selectedRow as RowDataProps
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
  );
};

export default PayBills;
