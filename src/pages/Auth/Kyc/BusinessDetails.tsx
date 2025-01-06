import { useRef, useState } from "react";
import FormInput from "../../../components/FormInput";
import { CautionIcon, UploadIcon } from "../../../assets/svg/CustomSVGs";
import AddDirector from "../../../components/Auth/KYC/AddDirector";
import {
  addToDirector,
  removeDirector,
  selectAuth,
  setSelectedDirector,
} from "../../../store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import Spinner from "../../../components/Spinner/Spinner";
import toast from "react-hot-toast";
import { useVerifyBusinesDetailsMutation } from "../../../service/kyb";
import {
  annualIncome,
  companyEntity,
  companySize,
  companyType,
  handleFileUpload,
  industries,
} from "../../../utils";
import { Director } from "../../../interfaces/service/kyb";
import { ArrowDownIcon } from "../../../assets/svg/Auth";
import AddedDirector from "../../../components/Auth/KYC/DirectorCard";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import EditDirector from "../../../components/Auth/KYC/EditDirector";
import { useNavigate } from "react-router-dom";

const BusinessDetails = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [addNewDirector, setAddNewDirector] = useState<boolean>(true);
  const toggle = useAppSelector(selectGlobal);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logo, setLogo] = useState<string>("");
  const [verifyBusinessDetails, { isLoading }] =
    useVerifyBusinesDetailsMutation();
  const { businessDirector, kybDetails } = useAppSelector(selectAuth);
  const { handleShow } = useGlobalHooks();
  const initialValues = {
    name: kybDetails?.businessDetails?.businessName || "",
    phone: kybDetails?.businessDetails?.businessPhone || "",
    businessEntity: kybDetails?.businessDetails?.businessEntity || "",
    companyType: kybDetails?.businessDetails?.companyType || "",
    rcNumber: kybDetails?.businessDetails?.cacNumber || "",
    industry: kybDetails?.businessDetails?.industry || "",
    size: kybDetails?.businessDetails?.size || "",
    annualIncome: kybDetails?.businessDetails?.income || "",
  };

  console.log(kybDetails, "www");
  const onSubmit = async (formData: any) => {
    if (kybDetails?.kybStatus?.businessDetailsStatus) {
      navigate("/kyb/business-documents");
    } else {
      const updateDirectorList = businessDirector.map((director: any) => ({
        idCard: director.idCard,
        firstName: director.firstName,
        lastName: director.lastName,
        idNumber: director.idNumber,
        idType: director.idType,
        email: director.email,
        phone: director.phone,
      }));

      try {
        const requiredData = {
          logo: logo,
          name: formData?.name,
          phone: formData?.phone,
          businessEntity: formData?.businessEntity,
          companyType: formData?.companyType,
          rcNumber: formData?.rcNumber,
          industry: formData?.industry,
          size: formData?.size,
          annualIncome: formData?.annualIncome,
          directors: updateDirectorList,
        };

        const response = await verifyBusinessDetails(requiredData).unwrap();
        toast.success(response?.message);
        navigate("/kyb/business-documents");
      } catch (error: any) {
        toast.error(error.data.message);
      }
    }
  };

  const businessDetailsSchema = Yup.object().shape({
    name: Yup.string().required("Business Name is required"),
    businessEntity: Yup.string().required("Business Entity is required"),
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
    dispatch(addToDirector(newDirector));
  };

  const scrollToBottom = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteDirector = (id: number) => {
    dispatch(removeDirector(id));
  };

  const handleEditDirector = (director: Director) => {
    dispatch(setSelectedDirector(director));
    handleShow("edit-director");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 justify-center items-center px-10 relative"
    >
      <div className="flex flex-col gap-6">
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
          <label
            htmlFor="logo-upload"
            className="flex w-full items-center gap-4 rounded-md cursor-pointer"
          >
            <div className="">
              {logo.startsWith("data:image") ? (
                <img src={logo} alt="Uploaded Logo" className="w-12 h-12" />
              ) : (
                <UploadIcon />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
                Upload your business logo
              </p>
              <p className="text-[#8E949A] font-workSans leading-4 font-normal text-sm">
                JPG, PDF, GIF, PNG null:20MB
              </p>
            </div>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload(setLogo, e)}
              className="hidden"
              id="logo-upload"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4 w-[100%]">
          <FormInput
            placeholder="Business Entity"
            id={"businessEntity"}
            name="businessEntity"
            error={
              touched.businessEntity
                ? (errors.businessEntity as string)
                : undefined
            }
            type="cSelect"
            selectOptions={companyEntity}
            keyPropertyName="entity"
            valuePropertyName="entity"
            itemPropertyName="entity"
            defaultValue={values?.businessEntity}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormInput
            placeholder="Business Name"
            type="text"
            id={"name"}
            name="name"
            error={touched.name ? (errors.name as string) : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.name}
          />
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
            placeholder="Business Phone"
            type="text"
            id={"phone"}
            name="phone"
            error={touched.phone ? (errors.phone as string) : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.phone}
          />
          <FormInput
            placeholder="Business Type"
            type="cSelect"
            id={"companyType"}
            name="companyType"
            error={
              touched.companyType ? (errors.companyType as string) : undefined
            }
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.companyType}
            selectOptions={companyType}
            keyPropertyName="type"
            valuePropertyName="type"
            itemPropertyName="type"
          />
          <FormInput
            placeholder="RC Number"
            type="text"
            id={"rcNumber"}
            name="rcNumber"
            error={touched.rcNumber ? (errors.rcNumber as string) : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.rcNumber}
          />
          <FormInput
            placeholder="Business Industry"
            type="cSelect"
            id={"industry"}
            name="industry"
            error={touched.industry ? (errors.industry as string) : undefined}
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
            error={touched.size ? (errors.size as string) : undefined}
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
            error={
              touched.annualIncome ? (errors.annualIncome as string) : undefined
            }
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

          <AddedDirector
            onEdit={handleEditDirector}
            onDelete={handleDeleteDirector}
          />

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
      </div>
      <div
        className="flex bg-white rounded-3xl text-pryColor font-bricolage items-center gap-2 fixed bottom-[60px] px-6 py-3 font-semibold  cursor-pointer"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
        onClick={scrollToBottom}
      >
        <ArrowDownIcon />
        Scroll Down
      </div>
      <div ref={formRef}></div>

      {toggle["edit-director"] && <EditDirector />}
    </form>
  );
};

export default BusinessDetails;
