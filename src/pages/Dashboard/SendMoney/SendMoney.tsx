import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Paginate from "../../../components/Paginate";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../../utils";
import { TransferDataProps } from "../../../interfaces/Global";
import { sendMoneyColumnsData } from "../../../components/Dashboard/SendMoney/Table";
import { useGetAllTransactionsQuery } from "../../../service/transaction";
import NoData from "../../../components/NoData/NoData";
import Calender from "../../../components/Calendar/DatePicker";
import FormInput from "../../../components/FormInput";
import Search from "../../../components/Search/Search";
import { FilterIcon } from "../../../assets/svg/dashboard";

const SendMoney = () => {
  const { handleSearch } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<TransferDataProps>();
  const [openAction, IsOpenAction] = useState<boolean>(false);
  const [dob, setDob] = useState(new Date());
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    keyword: "",
    pageNumber: 1,
    pageSize: 10,
  });
  const { data, refetch } = useGetAllTransactionsQuery(queryData);

  const navigate = useNavigate();
  const handleOpenModal = (row: TransferDataProps) => {
    setSelectedRow(row);
    IsOpenAction((prev) => !prev);
  };
  const onClose = () => {
    IsOpenAction(false);
  };
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
            selectOptions={[
              "TRANSFER",
              "AIRTIME",
              "DATA",
              "TV_BILL",
              "ELECTRICITY",
            ]}
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
            className="main-btn w-40 font-bricolage"
            onClick={() => navigate("/send-money/new-transaction")}
          >
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
            <div className="">
              <DataTable
                columns={sendMoneyColumnsData(
                  handleOpenModal,
                  selectedRow as TransferDataProps,
                  openAction,
                  refetch,
                  onClose
                )}
                data={data?.data}
                noDataComponent={<NoData />}
                customStyles={tableCustomStyles}
                className=""
              />
            </div>

            <div className="">
              <Paginate
                data={data?.data}
                handleSearch={handleSearch}
                currentPage={filteredData}
                setCurrentPage={setFilteredData}
                searchParams="accountName"
                itemsPerPage={queryData?.pageSize as number}
                setQueryData={setQueryData}
                totalItemsCount={data?.data.length}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
