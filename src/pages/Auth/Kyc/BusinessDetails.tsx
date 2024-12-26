import React, { useState } from "react";
import { KYCPageProps } from "../../../interfaces/Global";
import FormInput from "../../../components/FormInput";
import { CautionIcon, UploadIcon } from "../../../assets/svg/CustomSVGs";
import AddDirector from "../../../components/Auth/AddDirector";
import { setKycCurrentStep } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import Spinner from "../../../components/Spinner/Spinner";
import toast from "react-hot-toast";
import { useVerifyBusinesDetailsMutation } from "../../../service/kyb";
import { annualIncome, companySize, industries } from "../../../utils";
import { Director } from "../../../interfaces/service/kyb";

const BusinessDetails: React.FC<KYCPageProps> = () => {
  // const dispatch = useAppDispatch();
  const [addNewDirector, setAddNewDirector] = useState<boolean>(true);
  const [directors, setDirectors] = useState<Director[]>([]);
  const dispatch = useAppDispatch();
  const [logo, setLogo] = useState<string>("");
  const [verifyBusinessDetails, { isLoading }] =
    useVerifyBusinesDetailsMutation();

  const initialValues = {
    name: "",
    phone: "",
    companyType: "",
    rcNumber: "",
    industry: "",
    size: "",
    annualIncome: "",
  };

  const onSubmit = async (formData: any) => {
    try {
      const requiredData = {
        logo: logo,
        name: formData?.name,
        phone: formData?.phone,
        companyType: formData?.companyType,
        rcNumber: formData?.rcNumber,
        industry: formData?.industry,
        size: formData?.size,
        annualIncome: formData?.annualIncome,
        directors: directors,
      };

      console.log(requiredData);

      const response = await verifyBusinessDetails(requiredData).unwrap();
      toast.success(response?.message);
      dispatch(setKycCurrentStep(6));
      setLogo("logo");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const businessDetailsSchema = Yup.object().shape({
    name: Yup.string().required("Business Name is required"),
    phone: Yup.string().required("Phone is required"),
    companyType: Yup.string().required("Company Type is required"),
    rcNumber: Yup.string().required("RC Number is required"),
    industry: Yup.string().required("Industry is required"),
    size: Yup.string().required("Size is required"),
    annualIncome: Yup.string().required("Annual income is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: businessDetailsSchema,
      onSubmit,
    });

  const handleAddDirector = (newDirector: Director) => {
    setDirectors([...directors, newDirector]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 justify-center items-center px-10"
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Business Details
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Provide your current address for verification and security purposes.
        </p>
      </div>

      <div
        className="py-6 px-10 gap-4 rounded-md items-center flex w-full"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        <UploadIcon />
        <div className="flex flex-col gap-2">
          <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
            Upload your business logo
          </p>
          <p className="text-[#8E949A] font-workSans leading-4 font-normal text-sm">
            JPG, PDF, GIF, PNG null:20MB
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[100%]">
        <FormInput id={""} placeholder="Business Name" />
        <div
          className="px-6 py-2 -mt-3 gap-4 rounded-md items-center flex w-full"
          style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
        >
          <CautionIcon />
          <p className="text-greyColr font-workSans leading-4 font-normal text-xs">
            Use the registered business name on your documents
          </p>
        </div>

        <FormInput
          placeholder="Business Name"
          type="text"
          id={"name"}
          name="name"
          error={touched.name ? errors.name : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.name}
        />
        <FormInput
          placeholder="Business Phone"
          type="text"
          id={"phone"}
          name="phone"
          error={touched.phone ? errors.phone : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.phone}
        />
        <FormInput
          placeholder="Business Type"
          type="text"
          id={"companyType"}
          name="companyType"
          error={touched.companyType ? errors.companyType : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.companyType}
        />
        <FormInput
          placeholder="RC Number"
          type="text"
          id={"rcNumber"}
          name="rcNumber"
          error={touched.rcNumber ? errors.rcNumber : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.rcNumber}
        />
        <FormInput
          placeholder="Business Industry"
          type="cSelect"
          id={"industry"}
          name="industry"
          error={touched.industry ? errors.industry : undefined}
          selectOptions={industries}
          keyPropertyName="industry"
          valuePropertyName="industry"
          itemPropertyName="industry"
          defaultValue={values?.industry}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormInput
          placeholder="Business Size"
          id={"size"}
          name="size"
          error={touched.size ? errors.size : undefined}
          type="cSelect"
          selectOptions={companySize}
          keyPropertyName="size"
          valuePropertyName="size"
          itemPropertyName="size"
          defaultValue={values?.size}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormInput
          placeholder="Annual Income"
          type="cSelect"
          id={"annualIncome"}
          name="annualIncome"
          error={touched.annualIncome ? errors.annualIncome : undefined}
          selectOptions={annualIncome}
          keyPropertyName="income"
          valuePropertyName="income"
          itemPropertyName="income"
          defaultValue={values?.annualIncome}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className="flex flex-col gap-6 mt-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
            Business Director
          </h3>
          <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
            Provide some information about the directors of your business. You
            can add multiple directors.
          </p>
        </div>

        <AddDirector
          addNewDirector={addNewDirector}
          setAddNewDirector={setAddNewDirector}
          onAddNewDirector={handleAddDirector}
        />
      </div>

      <div className="flex justify-center  w-full gap-6">
        <button className="main-btn w-full" type="submit">
          {isLoading ? <Spinner /> : "Continue"}
        </button>
      </div>
    </form>
  );
};

export default BusinessDetails;
