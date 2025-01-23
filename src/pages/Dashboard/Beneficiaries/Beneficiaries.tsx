import DataTable from "react-data-table-component";
import Navbar from "../../../components/Navbar/Navbar";
import { tableCustomStyles, transactionsData } from "../../../utils";
import { airtimeColumnsData, transferColumnsData } from "../../../utils/table";
import { AirtimeRowDataProps, RowDataProps } from "../../../interfaces/Global";
import Paginate from "../../../components/Paginate";
import { useState } from "react";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import PopUp from "../../../components/PopUps/PopUp";
import { useAppSelector } from "../../../hooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import FormInput from "../../../components/FormInput";
import toast from "react-hot-toast";
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
  const { data } = useGetAllBanksQuery({});
  const { data: allBeneficiaries, refetch } =
    useGetAllBeneficiariesQuery(queryData);
  const [filteredData, setFilteredData] = useState<RowDataProps[]>([]);
  const [selectedRow, setSelectedRow] = useState<RowDataProps>();
  const [openAction, IsOpenAction] = useState<boolean>(false);

  const handleOpenModal = (row: any) => {
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
  };

  const onSubmit = async (formData: any) => {
    try {
      const transferRequiredData = {
        beneficiaryType: formData?.beneficiaryType,
        accountName: formData?.accountName,
        bankName: formData?.bankName,
        bankCode: formData?.bankCode,
        accountNumber: formData?.accountNumber,
      };

      const otherPayload = {
        beneficiaryType: formData?.beneficiaryType,
        phoneNumber: formData?.phoneNumber,
        networkProvider: formData?.networkProvider,
      };
      const payload =
        formData?.beneficiaryType === "TRANSFER"
          ? transferRequiredData
          : otherPayload;

      const response = await addBeneficiary(payload).unwrap();
      toast.success(response?.message);
      handleShow("addBeneficiary");
      refetch();
    } catch (error: any) {
      toast.error(error.data.message);
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

  console.log(allBeneficiaries?.data, "remi");
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
            defaultValue={"TRANSFER"}
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
            <div className="">
              {queryData?.beneficiaryType === "TRANSFER" ? (
                <>
                  <DataTable
                    columns={transferColumnsData(
                      handleOpenModal,
                      selectedRow as RowDataProps,
                      openAction
                    )}
                    data={allBeneficiaries?.data}
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
                    columns={airtimeColumnsData(
                      handleOpenModal,
                      selectedRow as AirtimeRowDataProps,
                      openAction
                    )}
                    data={allBeneficiaries?.data}
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
                      selectedRow as RowDataProps,
                      openAction
                    )}
                    data={allBeneficiaries?.data?.filter(
                      (item: any) => item.beneficiaryType === "TRANSFER"
                    )}
                    customStyles={tableCustomStyles}
                    className=""
                  />

                  <div className="">
                    <Paginate
                      data={allBeneficiaries?.data?.filter(
                        (item: any) => item.beneficiaryType === "TRANSFER"
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
                    type="text"
                    placeholder="Bank Name"
                    id="bankName"
                    className="w-full"
                    name="bankName"
                    error={touched.bankName ? errors.bankName : undefined}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values?.bankName}
                  />
                  <FormInput
                    type="cSelect"
                    placeholder="Bank Code"
                    id="bankCode"
                    className="w-full"
                    name="bankCode"
                    selectOptions={data?.data}
                    keyPropertyName="Name"
                    valuePropertyName="Code"
                    itemPropertyName="Name"
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
