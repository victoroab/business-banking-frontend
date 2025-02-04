import DataTable from "react-data-table-component";
import Navbar from "../../../components/Navbar/Navbar";
import { errorHandler, tableCustomStyles } from "../../../utils";
import {
  AirtimeRowDataProps,
  TransferDataProps,
  TVRowDataProps,
} from "../../../interfaces/Global";
import Paginate from "../../../components/Paginate";
import { useEffect, useState } from "react";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import PopUp from "../../../components/PopUps/PopUp";
import { useAppSelector } from "../../../hooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import FormInput from "../../../components/FormInput";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useAddBeneficiaryMutation,
  useGetAllBeneficiariesQuery,
} from "../../../service/beneficiary";
import Spinner from "../../../components/Spinner/Spinner";
import { useGetAllBanksQuery } from "../../../service/transaction";
import Search from "../../../components/Search/Search";
import Calender from "../../../components/Calendar/DatePicker";
import { FilterIcon } from "../../../assets/svg/dashboard";
import NoData from "../../../components/NoData/NoData";
import { transferColumnsData } from "../../../components/Dashboard/Beneficiary/Transfer/Table";
import {
  Bank,
  BeneficiaryData,
  BeneficiaryProps,
} from "../../../interfaces/service/beneficiary";
import { airtimeDataColumnsData } from "../../../components/Dashboard/Beneficiary/AirtimeData/Table";
import { electricityColumnsData } from "../../../components/Dashboard/Beneficiary/Electricity/Table";
import { tvColumnsData } from "../../../components/Dashboard/Beneficiary/TV/Table";

const Beneficiaries = () => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const { handleSearch } = useGlobalHooks();
  const [dob, setDob] = useState(new Date());
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    beneficiaryType: "",
    pageNumber: 1,
    pageSize: 10,
  });
  const [addBeneficiary, { isLoading }] = useAddBeneficiaryMutation();
  const { data } = useGetAllBanksQuery();
  const {
    data: allBeneficiaries,
    refetch,
    isLoading: beneficiariesLoading,
  } = useGetAllBeneficiariesQuery(queryData);
  const [filteredData, setFilteredData] = useState<unknown[]>([]);
  const [bankName, setBankName] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<unknown>();
  const [openAction, IsOpenAction] = useState<boolean>(false);

  const handleOpenModal = (row: unknown) => {
    // handleShow("show-action");
    setSelectedRow(row);
    IsOpenAction((prev) => !prev);
  };

  const initialValues = {
    beneficiaryType: "",
    accountName: "",
    bankName: "",
    bankCode: "",
    accountNumber: "",
    phoneNumber: "",
    networkProvider: "",
    tvCardName: "",
    tvCardNumber: "",
    tvProvider: "",
  };

  const onSubmit = async (formData: BeneficiaryProps) => {
    try {
      const transferRequiredData = {
        beneficiaryType: formData?.beneficiaryType,
        accountName: formData?.accountName,
        bankName: bankName,
        bankCode: formData?.bankCode,
        accountNumber: formData?.accountNumber,
      };

      const airtimeDataPayload = {
        beneficiaryType: formData?.beneficiaryType,
        phoneNumber: formData?.phoneNumber,
        networkProvider: formData?.networkProvider,
      };

      const tvPayload = {
        beneficiaryType: formData?.beneficiaryType,
        tvCardName: formData?.tvCardName,
        tvCardNumber: formData?.tvCardNumber,
        tvProvider: formData?.tvProvider,
      };
      const payload =
        formData?.beneficiaryType === "TRANSFER"
          ? transferRequiredData
          : formData?.beneficiaryType === "TV_BILL"
          ? tvPayload
          : airtimeDataPayload;

      const response = await addBeneficiary(payload).unwrap();
      toast.success(response?.message);
      handleShow("addBeneficiary");
      refetch();
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  const formSchema = Yup.object().shape({
    beneficiaryType: Yup.string(),
    accountName: Yup.string(),
    bankName: Yup.string(),
    bankCode: Yup.string(),
    accountNumber: Yup.string(),
    phoneNumber: Yup.string(),
    networkProvider: Yup.string(),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  useEffect(() => {
    const getBankName = data?.data?.find(
      (row: Bank) => row?.Code === values?.bankCode
    );

    setBankName(getBankName?.Name);
  }, [data?.data, values?.bankCode]);

  return (
    <div className="border">
      <Navbar
        title="Beneficiaries"
        subtitle="Add beneficiaries and managing all your saved recipients here."
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
            {beneficiariesLoading ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <div className="">
                {queryData?.beneficiaryType === "TRANSFER" ? (
                  <>
                    <DataTable
                      columns={transferColumnsData(
                        handleOpenModal,
                        selectedRow as TransferDataProps,
                        openAction,
                        refetch
                      )}
                      data={allBeneficiaries?.data}
                      noDataComponent={<NoData />}
                      customStyles={tableCustomStyles}
                      className=""
                    />

                    <div className="">
                      <Paginate
                        data={allBeneficiaries?.data}
                        handleSearch={handleSearch}
                        currentPage={filteredData}
                        setCurrentPage={setFilteredData}
                        searchParams="accountName"
                        itemsPerPage={queryData?.pageSize as number}
                        setQueryData={setQueryData}
                        totalItemsCount={allBeneficiaries?.data?.length}
                      />
                    </div>
                  </>
                ) : queryData?.beneficiaryType === "AIRTIME" ||
                  queryData?.beneficiaryType === "DATA" ? (
                  <>
                    <DataTable
                      columns={airtimeDataColumnsData(
                        handleOpenModal,
                        selectedRow as AirtimeRowDataProps,
                        openAction,
                        refetch
                      )}
                      data={allBeneficiaries?.data}
                      customStyles={tableCustomStyles}
                      noDataComponent={<NoData />}
                      className=""
                    />

                    <div className="">
                      <Paginate
                        data={allBeneficiaries?.data}
                        handleSearch={handleSearch}
                        currentPage={filteredData}
                        setCurrentPage={setFilteredData}
                        searchParams="networkProvider"
                        itemsPerPage={queryData?.pageSize as number}
                        setQueryData={setQueryData}
                        totalItemsCount={allBeneficiaries?.data?.length}
                      />
                    </div>
                  </>
                ) : queryData?.beneficiaryType === "TV_BILL" ? (
                  <>
                    <DataTable
                      columns={tvColumnsData(
                        handleOpenModal,
                        selectedRow as TVRowDataProps,
                        openAction,
                        refetch
                      )}
                      data={allBeneficiaries?.data}
                      noDataComponent={<NoData />}
                      customStyles={tableCustomStyles}
                      className=""
                    />

                    <div className="">
                      <Paginate
                        data={allBeneficiaries?.data}
                        handleSearch={handleSearch}
                        currentPage={filteredData}
                        setCurrentPage={setFilteredData}
                        searchParams="networkProvider"
                        itemsPerPage={queryData?.pageSize as number}
                        setQueryData={setQueryData}
                        totalItemsCount={allBeneficiaries?.data?.length}
                      />
                    </div>
                  </>
                ) : queryData?.beneficiaryType === "ELECTRICITY" ? (
                  <>
                    <DataTable
                      columns={electricityColumnsData(
                        handleOpenModal,
                        selectedRow as TransferDataProps,
                        openAction,
                        refetch
                      )}
                      data={allBeneficiaries?.data}
                      noDataComponent={<NoData />}
                      customStyles={tableCustomStyles}
                      className=""
                    />

                    <div className="">
                      <Paginate
                        data={allBeneficiaries?.data}
                        handleSearch={handleSearch}
                        currentPage={filteredData}
                        setCurrentPage={setFilteredData}
                        searchParams="networkProvider"
                        itemsPerPage={queryData?.pageSize as number}
                        setQueryData={setQueryData}
                        totalItemsCount={allBeneficiaries?.data?.length}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <DataTable
                      columns={transferColumnsData(
                        handleOpenModal,
                        selectedRow as TransferDataProps,
                        openAction,
                        refetch
                      )}
                      noDataComponent={<NoData />}
                      data={allBeneficiaries?.data?.filter(
                        (item: BeneficiaryData) =>
                          item.beneficiaryType === "TRANSFER"
                      )}
                      customStyles={tableCustomStyles}
                      className=""
                    />

                    <div className="">
                      <Paginate
                        data={allBeneficiaries?.data?.filter(
                          (item: BeneficiaryData) =>
                            item.beneficiaryType === "TRANSFER"
                        )}
                        handleSearch={handleSearch}
                        currentPage={filteredData}
                        setCurrentPage={setFilteredData}
                        searchParams="accountName"
                        itemsPerPage={queryData?.pageSize as number}
                        setQueryData={setQueryData}
                        totalItemsCount={allBeneficiaries?.data?.length}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {toggle["addBeneficiary"] && (
        <PopUp id="addBeneficiary">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg flex flex-col py-10 px-36 gap-10 w-[664px] border"
          >
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              Add Beneficiary
            </h3>
            <div className="flex flex-col gap-4 w-full">
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
                id="beneficiaryType"
                error={
                  touched.beneficiaryType ? errors.beneficiaryType : undefined
                }
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.beneficiaryType}
                className="w-full"
                name="beneficiaryType"
              />

              {values?.beneficiaryType === "TRANSFER" && (
                <>
                  <FormInput
                    type="cSelect"
                    placeholder="Bank"
                    id="bankCode"
                    className="w-full"
                    name="bankCode"
                    selectOptions={data?.data}
                    keyPropertyName="Name"
                    valuePropertyName="Code"
                    itemPropertyName="Name"
                    searchFunc
                    error={touched.bankCode ? errors.bankCode : undefined}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values?.bankCode}
                  />
                  <FormInput
                    type="text"
                    placeholder="Account Name"
                    id="accountName"
                    className="w-full"
                    name="accountName"
                    error={touched.accountName ? errors.accountName : undefined}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values?.accountName}
                  />
                  <FormInput
                    type="text"
                    placeholder="Account Number"
                    id="accountNumber"
                    className="w-full"
                    name="accountNumber"
                    error={
                      touched.accountNumber ? errors.accountNumber : undefined
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values?.accountNumber}
                  />
                </>
              )}

              {values?.beneficiaryType === "TV_BILL" && (
                <>
                  <FormInput
                    type="text"
                    placeholder="TV Card Name"
                    id="tvCardName"
                    className="w-full"
                    name="tvCardName"
                    error={touched.tvCardName ? errors.tvCardName : undefined}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values?.tvCardName}
                  />
                  <FormInput
                    type="text"
                    placeholder="TV Card Number"
                    id="tvCardNumber"
                    className="w-full"
                    name="tvCardNumber"
                    error={
                      touched.tvCardNumber ? errors.tvCardNumber : undefined
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values?.tvCardNumber}
                  />
                  <FormInput
                    type="text"
                    placeholder="TV Provider"
                    id="tvProvider"
                    className="w-full"
                    name="tvProvider"
                    error={touched.tvProvider ? errors.tvProvider : undefined}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values?.tvProvider}
                  />
                </>
              )}

              {(values?.beneficiaryType === "AIRTIME" ||
                values?.beneficiaryType === "DATA") && (
                <>
                  <FormInput
                    type="text"
                    placeholder="Phone Number"
                    id="phoneNumber"
                    className="w-full"
                    name="phoneNumber"
                    error={touched.phoneNumber ? errors.phoneNumber : undefined}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values?.phoneNumber}
                  />
                  <FormInput
                    type="cSelect"
                    placeholder="Network Provider"
                    id="networkProvider"
                    className="w-full"
                    name="networkProvider"
                    selectOptions={["MTN", "GLO", "AIRTEL", "NINE_MOBILE"]}
                    error={
                      touched.networkProvider
                        ? errors.networkProvider
                        : undefined
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values?.networkProvider}
                  />
                </>
              )}
            </div>

            <div className="flex justify-center w-full">
              <button className="main-btn w-full" type="submit">
                {" "}
                {isLoading ? <Spinner /> : "Add Beneficiary"}
              </button>
            </div>
          </form>
        </PopUp>
      )}
    </div>
  );
};

export default Beneficiaries;
