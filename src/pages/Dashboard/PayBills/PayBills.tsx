import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useState } from "react";
import Paginate from "../../../components/Paginate";
import { FilterIcon } from "../../../assets/svg/dashboard";
import Calender from "../../../components/Calendar/DatePicker";
import FormInput from "../../../components/FormInput";
import Search from "../../../components/Search/Search";
import { TransactionProps } from "../../../interfaces/service/billPayment";
import { useGetAllTransactionsQuery } from "../../../service/transaction";
import Spinner from "../../../components/Spinner/Spinner";
import DataTable from "react-data-table-component";
import NoData from "../../../components/NoData/NoData";
import { tableCustomStyles } from "../../../utils";
import {
  cableTvColumnsData,
  electricityColumnsData,
} from "../../../components/Dashboard/BillPayment/Table";

const PayBills = () => {
  const navigate = useNavigate();
  const { handleSearch } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<TransactionProps>();
  const [dob, setDob] = useState(new Date());
  const [openAction, IsOpenAction] = useState<boolean>(false);
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    keyword: "",
    type: "ELECTRICITY",
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
  return (
    <div className="border">
      <Navbar
        title="Pay Bill"
        subtitle="Settle your bills for utilities, subscriptions, and more—all in one place!"
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
            selectOptions={["TV_BILL", "ELECTRICITY"]}
            placeholder="Transaction Type"
            label="Transaction Type"
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
        <div className="flex flex-col gap-10">
          <div className="flex justify-end px-10">
            <button
              className="main-btn w-40 font-bricolage"
              onClick={() => navigate("/utility/pay-new-bill")}
            >
              Pay New Bill
            </button>
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
            <div className="">
              {queryData?.type === "TV_BILL" ? (
                <>
                  <DataTable
                    columns={cableTvColumnsData(
                      handleOpenModal,
                      selectedRow as TransactionProps,
                      openAction,
                      refetch,
                      onClose
                    )}
                    data={data?.data?.data}
                    noDataComponent={<NoData />}
                    customStyles={tableCustomStyles}
                    className=""
                  />

                  <div className="">
                    <Paginate
                      data={data?.data?.data}
                      handleSearch={handleSearch}
                      currentPage={filteredData}
                      setCurrentPage={setFilteredData}
                      searchParams="networkProvider"
                      itemsPerPage={queryData?.pageSize as number}
                      setQueryData={setQueryData}
                      totalItemsCount={data?.data?.data?.length}
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
                    data={data?.data?.data}
                    noDataComponent={<NoData />}
                    customStyles={tableCustomStyles}
                    className=""
                  />

                  <div className="">
                    <Paginate
                      data={data?.data?.data}
                      handleSearch={handleSearch}
                      currentPage={filteredData}
                      setCurrentPage={setFilteredData}
                      searchParams="networkProvider"
                      itemsPerPage={queryData?.pageSize as number}
                      setQueryData={setQueryData}
                      totalItemsCount={data?.data?.data?.length}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PayBills;
