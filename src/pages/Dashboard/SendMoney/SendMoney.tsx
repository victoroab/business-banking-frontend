import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Paginate from "../../../components/Paginate";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { ChangeEvent, useState } from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../../utils";
import { sendMoneyColumnsData } from "../../../components/Dashboard/SendMoney/Table";
import { useGetAllTransactionsQuery } from "../../../service/transaction";
import NoData from "../../../components/NoData/NoData";
import Calender from "../../../components/Calendar/DatePicker";
import FormInput from "../../../components/FormInput";
import Search from "../../../components/Search/Search";
import { FilterIcon } from "../../../assets/svg/dashboard";
import { TransactionProps } from "../../../interfaces/service/billPayment";
import Spinner from "../../../components/Spinner/Spinner";
import { SendMoneyIcon } from "../../../assets/svg/Sidebar";

const SendMoney = () => {
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
    page: 1,
    perPage: 10,
  });
  const { data, refetch, isLoading } = useGetAllTransactionsQuery(queryData);
  const navigate = useNavigate();

  const handleOpenModal = (row: TransactionProps) => {
    setSelectedRow(row);
    IsOpenAction((prev) => !prev);
  };

  const onClose = () => {
    IsOpenAction(false);
  };
  console.log(filteredData);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target as HTMLSelectElement;
    setQueryData((prev) => ({ ...prev, [id]: parseInt(value) }));
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

  // const getPaginatedData = (
  //   data: any[],
  //   page: number,
  //   itemsPerPage: number
  // ) => {
  //   const startIndex = (page - 1) * itemsPerPage;
  //   const endIndex = page * itemsPerPage;
  //   return data.slice(startIndex, endIndex);
  // };

  // const paginatedData = data?.data?.data
  //   ? getPaginatedData(data?.data?.data, queryData.page as number, 10)
  //   : [];

  const paginatedData = data?.data?.data ? data?.data?.data : [];
  return (
    <div className="border">
      <Navbar
        title="Send Money"
        subtitle="Sending money has never been easier."
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
            selectOptions={["TRANSFER"]}
            placeholder="Transfer Type"
            label="Transfer Type"
            filter
            defaultValue={
              queryData?.transferType !== ""
                ? queryData?.transferType
                : "TRANSFER"
            }
            id="transferType"
            onChange={(e) => {
              setQueryData((prev) => ({
                ...prev,
                transferType: e.target.value,
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
        <div className="flex justify-end px-10">
          <button
            className="main-btn w-44 gap-2 font-bricolage flex items-center justify-center"
            onClick={() => navigate("/send-money/new-transaction")}
          >
            <SendMoneyIcon fillColor="white" />
            Send Money
          </button>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex justify-between px-10 items-center">
            <div className="font-medium">Transactions</div>
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
                  <>
                    <div className="py-2 flex flex-col gap-2">
                      <ul className="flex-1 flex flex-wrap items-center justify-end gap-3">
                        <li className="flex items-center gap-2">
                          <p className="font-medium">Show:</p>
                          <select
                            id="perPage"
                            name="perPage"
                            className="select-form-controls"
                            value={queryData?.perPage}
                            onChange={handleChange}
                          >
                            {[10, 15, 20, 50, 100, 200].map((item) => (
                              <option key={item} value={item}>
                                {" "}
                                {item}{" "}
                              </option>
                            ))}
                          </select>
                        </li>
                      </ul>
                      <DataTable
                        columns={sendMoneyColumnsData(
                          handleOpenModal,
                          selectedRow as TransactionProps,
                          openAction,
                          refetch,
                          onClose
                        )}
                        data={paginatedData}
                        noDataComponent={
                          <NoData
                            title="Nothing to see yet"
                            paragraph="Send or receive some money to see your transactions here"
                          />
                        }
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
                        searchParams="accountName"
                        setQueryData={setQueryData}
                        itemsPerPage={queryData?.perPage as number}
                        totalItemsCount={data?.data?.total || 0}
                        refetch={refetch}
                      />
                    </div>
                  </>
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

export default SendMoney;
