import FormInput from "../../../components/FormInput";
import { selectAuth } from "../../../store/slice/authSlice";
import { useAppSelector } from "../../../hooks";
import Spinner from "../../../components/Spinner/Spinner";
import { useVerifyResidentialAddressMutation } from "../../../service/kyb";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AddressProps } from "../../../interfaces/service/kyb";
import { useNavigate } from "react-router-dom";

const ResidentialAddress = () => {
  const [setBusinessAddress, { isLoading }] =
    useVerifyResidentialAddressMutation();
  const navigate = useNavigate();
  const { kybDetails } = useAppSelector(selectAuth);

  const initialValues = {
    address: kybDetails?.residendialAddress?.address || "",
    city: kybDetails?.residendialAddress?.city || "",
    state: kybDetails?.residendialAddress?.state || "",
    zipcode: kybDetails?.residendialAddress?.zipcode || "",
    landmark: kybDetails?.residendialAddress?.landmark || "",
    lga: kybDetails?.residendialAddress?.lga || "",
  };

  const onSubmit = async (formData: AddressProps) => {
    if (kybDetails?.kybStatus?.residentialAddressSubmitted) {
      navigate("/kyb/business-details");
    } else {
      try {
        const response = await setBusinessAddress(formData).unwrap();
        toast.success(response?.message);
        navigate("/kyb/business-details");
      } catch (error: any) {
        toast.error(error.data.message);
      }
    }
  };

  const businessAddressSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipcode: Yup.string().required("Zipcode is required"),
    landmark: Yup.string().required("Landmark is required"),
    lga: Yup.string().required("LGA is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: businessAddressSchema,
      onSubmit,
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 justify-center items-center px-14"
    >
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Residential Address
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Provide your current address for verification and security purposes.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <FormInput
          id={""}
          placeholder="Enter your address"
          name="address"
          error={touched.address ? (errors.address as string) : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.address}
        />
        <FormInput
          id={""}
          placeholder="City"
          name="city"
          error={touched.city ? (errors.city as string) : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.city}
        />
        <FormInput
          id={""}
          placeholder="State"
          name="state"
          error={touched.state ? (errors.state as string) : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.state}
        />
        <FormInput
          id={"zipcode"}
          placeholder="Zip Code"
          name="zipcode"
          error={touched.zipcode ? (errors.zipcode as string) : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.zipcode}
        />
        <FormInput
          id={"landmark"}
          placeholder="Landmark"
          name="landmark"
          error={touched.landmark ? (errors.landmark as string) : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.landmark}
        />
        <FormInput
          id={""}
          placeholder="LGA"
          name="lga"
          error={touched.lga ? (errors.lga as string) : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.lga}
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

export default ResidentialAddress;
