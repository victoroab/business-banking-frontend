import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Navbar from "../../../components/Navbar/Navbar";
import { tableCustomStyles, transactionsData } from "../../../utils";
import { columnsData } from "../../../utils/table";
import { RowDataProps } from "../../../interfaces/Global";
import Paginate from "../../../components/Paginate";
import { useState } from "react";
import { useGlobalHooks } from "../../../hooks/globalHooks";

const Beneficiaries = () => {
  const navigate = useNavigate();
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

  return (
    <div className="border">
      <Navbar
        title="Beneficiaries"
        subtitle="Add beneficiaries and managing all your saved recipients here."
      />
      <div className="flex flex-col gap-10">
        <div className="flex justify-end px-10">
          <button
            className="main-btn w-60 font-bricolage"
            onClick={() => navigate("/new-beneficiary")}
          >
            Add Beneficiary
          </button>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex justify-between px-10 items-center">
            <div className="font-medium">Recent Beneficiaries</div>
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

export default Beneficiaries;
