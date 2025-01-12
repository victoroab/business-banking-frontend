import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Paginate from "../../../components/Paginate";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles, transactionsData } from "../../../utils";
import { columnsData } from "../../../utils/table";
import { RowDataProps } from "../../../interfaces/Global";

const Pos = () => {
  const { handleSearch, handleShow } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<RowDataProps>();
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    terminal: "",
    pageNumber: 1,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const handleOpenModal = (row: RowDataProps) => {
    handleShow("show-action");
    setSelectedRow(row);
  };

  return (
    <div className="border">
      <Navbar title="POS" subtitle="Here's your your POS Terminals" />
      <div className="flex flex-col gap-10">
        <div className="flex justify-end px-10">
          <button
            className="main-btn w-52 font-bricolage"
            onClick={() => navigate("/request-pos/debit-account")}
          >
            Request Another POS
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between px-10 items-center">
            <div className="font-medium">POS Terminals</div>
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
      </div>
    </div>
  );
};

export default Pos;
