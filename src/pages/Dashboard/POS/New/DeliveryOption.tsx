import FormInput from "../../../../components/FormInput";
import { locations } from "../../../../utils";
import {
  setPosCurrentStep,
  setResquestPOS,
} from "../../../../store/slice/posSlice";
import { useAppDispatch } from "../../../../hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

const DeliveryOption = () => {
  const dispatch = useAppDispatch();
  const [deliveryOption, setDeliveryOption] = useState("PICKUP");
  const initialValues = {
    pickupBranch: "",
    address: "",
    city: "",
    zipCode: "",
  };

  const handleDeliveryOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryOption(e.target.value);
  };

  const onSubmit = async (formData: {
    pickupBranch: string;
    address: string;
    city: string;
    zipCode: string;
  }) => {
    dispatch(
      setResquestPOS({
        pickupBranch: formData.pickupBranch,
        deliveryOption: deliveryOption,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      })
    );
    dispatch(setPosCurrentStep(5));
  };

  const formSchema = Yup.object().shape({
    accountName: Yup.string(),
  });
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Select Delivery Option
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select your preferred deliver option
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <h2>Delivery Option</h2>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="deliveryOption"
              value="PICKUP"
              checked={deliveryOption === "PICKUP"}
              onChange={handleDeliveryOptionChange}
              className="w-4 h-4"
            />
            Self Pickup
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="deliveryOption"
              value="homeDelivery"
              checked={deliveryOption === "homeDelivery"}
              onChange={handleDeliveryOptionChange}
              className="w-4 h-4"
            />
            Home Delivery
            <div className="ml-2 bg-positive-Light text-positive uppercase text-xs p-1">
              Coming Soon
            </div>
          </label>
        </div>
      </div>

      <div className="form">
        <form
          action="#"
          onSubmit={handleSubmit}
          className="flex gap-6 flex-col"
        >
          {deliveryOption === "PICKUP" && (
            <FormInput
              id="pickupBranch"
              name="pickupBranch"
              // label=""
              type="cSelect"
              selectOptions={locations}
              placeholder="Pick up branch"
              keyPropertyName="name"
              valuePropertyName="name"
              itemPropertyName="name"
              defaultValue={values?.pickupBranch}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.pickupBranch ? errors.pickupBranch : undefined}
            />
          )}

          {deliveryOption === "homeDelivery" && (
            <>
              <FormInput
                id="address"
                name="address"
                type="text"
                placeholder="Address"
                defaultValue={values?.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address ? errors.address : undefined}
              />

              <FormInput
                id="city"
                name="city"
                // label=""
                type="text"
                placeholder="City"
                defaultValue={values?.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city ? errors.city : undefined}
              />

              <FormInput
                id="zipCode"
                name="zipCode"
                type="text"
                placeholder="Zip Code"
                defaultValue={values?.zipCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.zipCode ? errors.zipCode : undefined}
              />
            </>
          )}
          <div className="flex justify-center  w-full gap-6">
            <button className="main-btn w-full" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryOption;
