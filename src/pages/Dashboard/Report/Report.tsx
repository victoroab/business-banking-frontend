import Navbar from "../../../components/Navbar/Navbar";
import Paginate from "../../../components/Paginate";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../../utils";
import { TransactionProps } from "../../../interfaces/service/billPayment";
import { useGetAllTransactionsQuery } from "../../../service/transaction";
import Search from "../../../components/Search/Search";
import FormInput from "../../../components/FormInput";
import Calender from "../../../components/Calendar/DatePicker";
import { FilterIcon } from "../../../assets/svg/dashboard";
import { sendMoneyColumnsData } from "../../../components/Dashboard/SendMoney/Table";
import NoData from "../../../components/NoData/NoData";
import { dataColumnsData } from "../../../components/Dashboard/AirtimeData/Table";
import Spinner from "../../../components/Spinner/Spinner";
import {
  cableTvColumnsData,
  electricityColumnsData,
} from "../../../components/Dashboard/BillPayment/Table";

const Report = () => {
  const { handleSearch } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<TransactionProps>();
  const [openAction, IsOpenAction] = useState<boolean>(false);
  const [to, setTo] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    keyword: "",
    type: "TRANSFER",
    pageNumber: 1,
    pageSize: 10,
  });
  const { data, refetch, isLoading } = useGetAllTransactionsQuery(queryData);
  const handleOpenModal = (row: TransactionProps) => {
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
      <Navbar title="Reports" subtitle="Here’s all your transactions." />
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
            placeholder="Transaction Type"
            label="Transaction Type"
            filter
            defaultValue={queryData?.type !== "" ? queryData?.type : "TRANSFER"}
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
            <div className="font-medium">Recent Transactions</div>
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
                {data?.data?.data?.length > 0 ? (
                  <div className="pb-6">
                    {queryData?.type === "TRANSFER" ? (
                      <>
                        <DataTable
                          columns={sendMoneyColumnsData(
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

                        <div className="pb-6">
                          <Paginate
                            data={paginatedData}
                            handleSearch={handleSearch}
                            currentPage={filteredData}
                            setCurrentPage={setFilteredData}
                            searchParams="accountName"
                            itemsPerPage={queryData?.pageSize as number}
                            setQueryData={setQueryData}
                            totalItemsCount={data?.data?.total}
                            refetch={refetch}
                          />
                        </div>
                      </>
                    ) : queryData?.type === "AIRTIME" ||
                      queryData?.type === "DATA" ? (
                      <>
                        <DataTable
                          columns={dataColumnsData(
                            handleOpenModal,
                            selectedRow as TransactionProps,
                            openAction,
                            refetch,
                            onClose
                          )}
                          data={paginatedData}
                          customStyles={tableCustomStyles}
                          noDataComponent={<NoData />}
                          className="pb-6"
                          selectableRows
                        />

                        <div className="pb-6">
                          <Paginate
                            data={paginatedData}
                            handleSearch={handleSearch}
                            currentPage={filteredData}
                            setCurrentPage={setFilteredData}
                            searchParams="phoneNumber"
                            itemsPerPage={queryData?.pageSize as number}
                            setQueryData={setQueryData}
                            totalItemsCount={data?.data?.total}
                            refetch={refetch}
                          />
                        </div>
                      </>
                    ) : queryData?.type === "TV_BILL" ? (
                      <>
                        <DataTable
                          columns={cableTvColumnsData(
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

                        <div className="pb-6">
                          <Paginate
                            data={paginatedData}
                            handleSearch={handleSearch}
                            currentPage={filteredData}
                            setCurrentPage={setFilteredData}
                            searchParams="phoneNumber"
                            itemsPerPage={queryData?.pageSize as number}
                            setQueryData={setQueryData}
                            totalItemsCount={data?.data?.total}
                            refetch={refetch}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <DataTable
                          columns={electricityColumnsData(
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

                        <div className="pb-6">
                          <Paginate
                            data={paginatedData}
                            handleSearch={handleSearch}
                            currentPage={filteredData}
                            setCurrentPage={setFilteredData}
                            searchParams="meterName"
                            itemsPerPage={queryData?.pageSize as number}
                            setQueryData={setQueryData}
                            totalItemsCount={data?.data?.total}
                            refetch={refetch}
                          />
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <NoData />
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Report;
