import Navbar from "../../../components/Navbar/Navbar";
import Paginate from "../../../components/Paginate";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../../utils";
import { ActivityProps } from "../../../interfaces/Global";
import { useGetAllActivitiesQuery } from "../../../service/user";
import Spinner from "../../../components/Spinner/Spinner";
import Calender from "../../../components/Calendar/DatePicker";
import { FilterIcon } from "../../../assets/svg/dashboard";
import Search from "../../../components/Search/Search";
import FormInput from "../../../components/FormInput";
import NoData from "../../../components/NoData/NoData";
import { activityColumnsData } from "../../../components/Dashboard/Activity/Table";

const AuditTrail = () => {
  const { handleSearch } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<ActivityProps>();
  const [openAction, IsOpenAction] = useState<boolean>(false);
  const [to, setTo] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    terminal: "",
    pageNumber: 1,
    pageSize: 10,
  });
  console.log(filteredData);
  const { data, refetch, isLoading } = useGetAllActivitiesQuery(queryData);
  const handleOpenModal = (row: ActivityProps) => {
    setSelectedRow(row);
    IsOpenAction((prev) => !prev);
  };
  const onClose = () => {
    IsOpenAction(false);
  };

  const handleSetFilter = () => {
    setQueryData((prev) => ({
      ...prev,
      page: 1,
      perPage: 10,
      from: from,
      to: to,
    }));
  };

  const paginatedData = data?.data?.data ? data?.data?.data : [];

  return (
    <div className="border">
      <Navbar title="Audit Trail" subtitle="Monitor all user activity here." />
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
            selectOptions={["TV_BILL", "ELECTRICITY"]}
            placeholder="Action Type"
            label="Action Type"
            filter
            defaultValue={
              queryData?.type !== "" ? queryData?.type : "ELECTRICITY"
            }
            id="tyoe"
            onChange={(e) => {
              setQueryData((prev) => ({
                ...prev,
                type: e.target.value,
              }));
            }}
            className="w-[200px]"
            name="type"
          />
          <Calender
            setSelectedDate={setFrom}
            selectedDate={from}
            label="From"
            filter
          />
          <Calender
            setSelectedDate={setTo}
            selectedDate={to}
            label="To"
            filter
          />

          <div
            className="flex items-center gap-2 bg-[#e2eefa] rounded-xl py-4 px-6 mt-6 cursor-pointer"
            onClick={handleSetFilter}
          >
            <FilterIcon />
            <p className="font-bold text-pryColor tex-sm"> Filter</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between px-10 items-center">
            <div className="font-medium">Recent Activity</div>
            <div className="font-semibold text-negativeRed text-xs curpo">
              Download CSV
            </div>
          </div>

          <section
            className="relative px-10 font-workSans"
            style={{ boxShadow: "0px 1px 7px 4px rgba(216, 216, 216, 0.2)" }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="">
                  <DataTable
                    columns={activityColumnsData(
                      handleOpenModal,
                      selectedRow as ActivityProps,
                      openAction,
                      refetch,
                      onClose
                    )}
                    data={paginatedData}
                    noDataComponent={<NoData />}
                    customStyles={tableCustomStyles}
                    className="pb-6"
                    selectableRows
                  />
                </div>

                <div className="pb-6">
                  <Paginate
                    data={paginatedData}
                    handleSearch={handleSearch}
                    currentPage={queryData.page as number}
                    setCurrentPage={setFilteredData}
                    searchParams="action"
                    setQueryData={setQueryData}
                    itemsPerPage={queryData?.perPage as number}
                    totalItemsCount={data?.data?.total || 0}
                    refetch={refetch}
                  />
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
