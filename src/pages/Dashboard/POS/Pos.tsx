import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Paginate from "../../../components/Paginate";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../../utils";
import { PosDataProps } from "../../../interfaces/Global";
import { posDataColumnsData } from "../../../components/Dashboard/Pos/Table";
import { useGetAllPosQuery } from "../../../service/pos";
import Calender from "../../../components/Calendar/DatePicker";
import { FilterIcon } from "../../../assets/svg/dashboard";
import FormInput from "../../../components/FormInput";
import Search from "../../../components/Search/Search";

const Pos = () => {
  const { handleSearch } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<PosDataProps>();
  const navigate = useNavigate();
  const [dob, setDob] = useState<string>("");
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    status: "",
    pageNumber: 1,
    pageSize: 10,
  });
  const { data, refetch } = useGetAllPosQuery(queryData);
  console.log(data);
  const [openAction, IsOpenAction] = useState<boolean>(false);

  const handleOpenModal = (row: PosDataProps) => {
    setSelectedRow(row);
    IsOpenAction((prev) => !prev);
  };

  return (
    <div className="border">
      <Navbar title="POS" subtitle="Here's your your POS Terminals" />
      <div className="flex flex-col gap-10">
        <div className="flex justify-end items-center gap-6 px-10">
          <Search
            placeholder="Search"
            setQueryData={setQueryData}
            label="Search"
            className="shadow-md"
          />
          <FormInput
            type="cSelect"
            selectOptions={[
              "TRANSFER",
              "AIRTIME",
              "DATA",
              "TV_BILL",
              "ELECTRICITY",
            ]}
            placeholder="Beneficiary Type"
            label="Beneficiary Type"
            filter
            defaultValue={
              queryData?.beneficiaryType !== ""
                ? queryData?.beneficiaryType
                : "TRANSFER"
            }
            id="beneficiaryType"
            onChange={(e) => {
              setQueryData((prev) => ({
                ...prev,
                beneficiaryType: e.target.value,
              }));
            }}
            className="w-[200px]"
            name="beneficiaryType"
          />
          <Calender
            setSelectedDate={setDob}
            selectedDate={dob}
            label="From"
            filter
          />
          <Calender
            setSelectedDate={setDob}
            selectedDate={dob}
            label="To"
            filter
          />

          <div className="flex items-center gap-2 bg-[#e2eefa] rounded-xl py-4 px-6 mt-6 cursor-pointer">
            <FilterIcon />
            <p className="font-bold text-pryColor tex-sm"> Filter</p>
          </div>
        </div>

        <div className="flex justify-end px-10">
          <button
            className="main-btn w-52 font-bricolage"
            onClick={() => navigate("/request-pos")}
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
                columns={posDataColumnsData(
                  handleOpenModal,
                  selectedRow as PosDataProps,
                  openAction,
                  refetch
                )}
                data={[]}
                customStyles={tableCustomStyles}
                className=""
              />
            </div>

            <div className="">
              <Paginate
                data={[]}
                handleSearch={handleSearch}
                currentPage={filteredData}
                setCurrentPage={setFilteredData}
                searchParams="ref"
                itemsPerPage={queryData?.pageSize as number}
                setQueryData={setQueryData}
                totalItemsCount={0}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Pos;
