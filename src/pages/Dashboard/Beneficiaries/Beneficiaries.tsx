import DataTable from "react-data-table-component";
import Navbar from "../../../components/Navbar/Navbar";
import { tableCustomStyles, transactionsData } from "../../../utils";
import { columnsData } from "../../../utils/table";
import { RowDataProps } from "../../../interfaces/Global";
import Paginate from "../../../components/Paginate";
import { useState } from "react";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import PopUp from "../../../components/PopUps/PopUp";
import { useAppSelector } from "../../../hooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import FormInput from "../../../components/FormInput";

const Beneficiaries = () => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
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
            onClick={() => handleShow("addBeneficiary")}
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

      {toggle["addBeneficiary"] && (
        <PopUp id="addBeneficiary">
          <div className="bg-white rounded-lg flex flex-col py-10 px-36 gap-10 w-[664px] border">
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              Add Beneficiary
            </h3>
            <div className="flex flex-col gap-4 w-full">
              <FormInput
                type="cSelect"
                placeholder="Beneficiary Type"
                id=""
                className="w-full"
              />
              <FormInput
                type="text"
                placeholder="Beneficiary Name"
                id=""
                className="w-full"
              />
              <FormInput
                type="text"
                placeholder="Account Number"
                id=""
                className="w-full"
              />
              <FormInput
                type="cSelect"
                placeholder="Beneficiary Bank"
                id=""
                className="w-full"
              />
            </div>
            <div className="flex justify-center w-full">
              <button className="main-btn w-full">Add Beneficiary</button>
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default Beneficiaries;
