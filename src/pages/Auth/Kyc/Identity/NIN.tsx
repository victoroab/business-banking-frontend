import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  setKycCurrentStep,
  setKYCIdentityStep,
} from "../../../../store/slice/authSlice";
import { useAppDispatch } from "../../../../hooks";
import FormInput from "../../../../components/FormInput";
import Spinner from "../../../../components/Spinner/Spinner";
import { CautionIcon } from "../../../../assets/svg/CustomSVGs";
import { useVerifyNINMutation } from "../../../../service/kyb";

const NIN = () => {
  const dispatch = useAppDispatch();

  const [verifyNIN, { isLoading }] = useVerifyNINMutation();

  const initialValues = {
    nin: "",
  };

  const onSubmit = async (formData: { nin: string }) => {
    try {
      const response = await verifyNIN(formData).unwrap();
      toast.success(response?.message);
      dispatch(setKycCurrentStep(3));
      dispatch(setKYCIdentityStep("DEFAULT"));
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const formSchema = Yup.object().shape({
    nin: Yup.string().required("NIN is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  return (
    <div>
      <div className="flex justify-center items-center flex-col w-full">
        <form
          className="flex px-8 flex-col gap-8 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              NIN
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
              Enter your 11 digit National Identification Number (NIN).
            </p>
          </div>

          <FormInput
            placeholder="National Identification Number"
            type="text"
            id={"nin"}
            name="nin"
            error={touched.nin ? errors.nin : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.nin}
          />
          <div
            className="px-6 py-2 -mt-3 gap-4 rounded-md items-center flex w-full"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
          >
            <CautionIcon />
            <p className="text-greyColr font-workSans leading-4 font-normal text-xs">
              Dial *346# on your registered phone number to get your NIN.
              <br /> Service costs NGN 20. Visit{" "}
              <span className="text-positive"> nimc.gov.ng/sms-service</span>
            </p>
          </div>

          <div className="flex justify-center  w-full gap-6">
            <button className="main-btn w-full" type="submit">
              {isLoading ? <Spinner /> : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NIN;
