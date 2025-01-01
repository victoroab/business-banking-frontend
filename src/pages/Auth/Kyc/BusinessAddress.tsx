import FormInput from "../../../components/FormInput";
import { useVerifyBusinessAddressMutation } from "../../../service/kyb";
import { useAppDispatch } from "../../../hooks";
import { setKycCurrentStep } from "../../../store/slice/authSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import { AddressProps } from "../../../interfaces/service/kyb";

const BusinessAddress = () => {
  const [setBusinessAddress, { isLoading }] =
    useVerifyBusinessAddressMutation();
  const dispatch = useAppDispatch();

  const initialValues = {
    address: "",
    city: "",
    state: "",
    zipcode: "",
    landmark: "",
    lga: "",
  };

  const onSubmit = async (formData: AddressProps) => {
    try {
      const response = await setBusinessAddress(formData).unwrap();
      toast.success(response?.message);
      dispatch(setKycCurrentStep(8));

      //
    } catch (error: any) {
      toast.error(error.data.message);
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
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Business Address
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Provide your current address for verification and security purposes.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-[100%]">
        <FormInput
          id={""}
          placeholder="Enter your address"
          name="address"
          error={touched.address ? errors.address : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.address}
        />
        <FormInput
          id={""}
          placeholder="City"
          name="city"
          error={touched.city ? errors.city : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.city}
        />
        <FormInput
          id={""}
          placeholder="State"
          name="state"
          error={touched.state ? errors.state : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.state}
        />
        <FormInput
          id={"zipcode"}
          placeholder="Zip Code"
          name="zipcode"
          error={touched.zipcode ? errors.zipcode : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.zipcode}
        />
        <FormInput
          id={"landmark"}
          placeholder="Landmark"
          name="landmark"
          error={touched.landmark ? errors.landmark : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.landmark}
        />
        <FormInput
          id={""}
          placeholder="LGA"
          name="lga"
          error={touched.lga ? errors.lga : undefined}
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

export default BusinessAddress;
