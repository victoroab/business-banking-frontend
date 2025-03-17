import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Paginate from "../../../components/Paginate";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../../utils";
import { useAppDispatch } from "../../../hooks";
import { setAirtimeDataAction } from "../../../store/slice/billPaymentSlice";
import { useGetAllTransactionsQuery } from "../../../service/transaction";
import Search from "../../../components/Search/Search";
import FormInput from "../../../components/FormInput";
import Calender from "../../../components/Calendar/DatePicker";
import { FilterIcon } from "../../../assets/svg/dashboard";
import NoData from "../../../components/NoData/NoData";
import {
  airtimeColumnsData,
  dataColumnsData,
} from "../../../components/Dashboard/AirtimeData/Table";
import { TransactionProps } from "../../../interfaces/service/billPayment";
import Spinner from "../../../components/Spinner/Spinner";

const AirtimeData = () => {
  const { handleSearch } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<TransactionProps>();
  const [to, setTo] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [openAction, IsOpenAction] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    keyword: "",
    type: "AIRTIME",
    pageNumber: 1,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const { data, refetch, isLoading } = useGetAllTransactionsQuery(queryData);
  const handleOpenModal = (row: TransactionProps) => {
    IsOpenAction((prev) => !prev);
    setSelectedRow(row);
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
      <Navbar
        title="Airtime & Data"
        subtitle="Easily recharge you phone or prchase data bundles in just a few clicks"
      />
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
            selectOptions={["AIRTIME", "DATA"]}
            placeholder="Type"
            label="Top Up"
            filter
            defaultValue={queryData?.type !== "" ? queryData?.type : "AIRTIME"}
            id="type"
            onChange={(e) => {
              setQueryData((prev) => ({
                ...prev,
                type: e.target.value,
              }));
            }}
            className="w-[200px]"
            name="transferType"
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
        <div className="flex justify-end px-10 gap-6">
          <button
            className="main-btn w-40 font-bricolage"
            onClick={() => {
              navigate("/utility/airtime-data");
              dispatch(setAirtimeDataAction("AIRTIME"));
            }}
          >
            Buy Airtime
          </button>
          <button
            className="yellow-frame-btn w-40 font-bricolage"
            onClick={() => {
              navigate("/utility/airtime-data");
              dispatch(setAirtimeDataAction("DATA"));
            }}
          >
            Buy Data
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between px-10 items-center">
            <div className="font-medium">Recent Topups</div>
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
              <div className="aasd">
                {queryData?.type === "AIRTIME" ? (
                  <>
                    {" "}
                    <div className="pb-6">
                      <DataTable
                        columns={airtimeColumnsData(
                          handleOpenModal,
                          selectedRow as TransactionProps,
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
                        currentPage={filteredData}
                        setCurrentPage={setFilteredData}
                        searchParams="accountName"
                        itemsPerPage={queryData?.pageSize as number}
                        setQueryData={setQueryData}
                        totalItemsCount={data?.data?.total || 0}
                        refetch={refetch}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="pb-6">
                      <DataTable
                        columns={dataColumnsData(
                          handleOpenModal,
                          selectedRow as TransactionProps,
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
                        currentPage={filteredData}
                        setCurrentPage={setFilteredData}
                        searchParams="accountName"
                        itemsPerPage={queryData?.pageSize as number}
                        setQueryData={setQueryData}
                        totalItemsCount={data?.data?.total || 0}
                        refetch={refetch}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AirtimeData;
