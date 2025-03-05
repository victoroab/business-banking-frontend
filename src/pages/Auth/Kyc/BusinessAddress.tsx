import FormInput from "../../../components/FormInput";
import { useVerifyBusinessAddressMutation } from "../../../service/kyb";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import { AddressProps } from "../../../interfaces/service/kyb";
import { useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
} from "react-google-places-autocomplete";
import { useState } from "react";

const BusinessAddress = () => {
  const [setBusinessAddress, { isLoading }] =
    useVerifyBusinessAddressMutation();
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);

  const { kybDetails } = useAppSelector(selectAuth);
  const initialValues = {
    address: kybDetails?.businessDetails?.address || "",
    city: kybDetails?.businessDetails?.city || "",
    state: kybDetails?.businessDetails?.state || "",
    zipcode: kybDetails?.businessDetails?.zipcode || "",
    landmark: kybDetails?.businessDetails?.landmark || "",
    lga: kybDetails?.businessDetails?.lga || "",
  };

  const onSubmit = async (formData: AddressProps) => {
    if (kybDetails?.kybStatus?.businessAddressStatus) {
      navigate("/kyb/attestation");
    } else {
      try {
        const response = await setBusinessAddress(formData).unwrap();
        toast.success(response?.message);
        navigate("/kyb/attestation");
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

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: businessAddressSchema,
    onSubmit,
  });

  const handleAddressSelect = async (selectedAddress: any) => {
    console.log("handleAddressSelect", selectedAddress);
    setAddress(selectedAddress.label);
    setFieldValue("address", selectedAddress.label);

    try {
      const results = await geocodeByAddress(selectedAddress.label);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(address);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 justify-center items-center"
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
        {/* <FormInput
          id={""}
          placeholder="Enter your address"
          name="address"
          error={touched.address ? (errors.address as string) : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.address}
        /> */}

        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_REACT_GOOGLE_API_KEY}
          selectProps={{
            value: address,
            onChange: handleAddressSelect,
            placeholder: "Enter address",
            className: "w-full",
          }}
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

export default BusinessAddress;
