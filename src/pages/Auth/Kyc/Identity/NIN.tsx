import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useSetEmailMutation } from "../../../../service/auth";
import {
  selectAuth,
  setEmailAddress,
  setKycCurrentStep,
} from "../../../../store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import FormInput from "../../../../components/FormInput";
import AuthLayout from "../../../../layout/AuthLayout";
import Spinner from "../../../../components/Spinner/Spinner";
import { KYCPageProps } from "../../../../interfaces/Global";

const NIN: React.FC<KYCPageProps> = ({ setCurrentStep }) => {
  const { phoneNumber } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setEmail, { isLoading }] = useSetEmailMutation();

  const initialValues = {
    nin: "",
  };

  const onSubmit = async (formData: { nin: string }) => {
    dispatch(setKycCurrentStep(3));
    // console.log(formData);

    // try {
    //   const requiredData = {
    //     nin: formData.nin,
    //   };
    //   const response = await setEmail(requiredData).unwrap();
    //   toast.success(response?.message);
    //   dispatch(setEmailAddress(formData.nin));
    //   navigate("/verify-email");
    // } catch (error: any) {
    //   toast.error(error.data.message);
    // }
  };

  const terminalProfileSchema = Yup.object().shape({
    nin: Yup.string().required("NIN is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: terminalProfileSchema,
      onSubmit,
    });

  return (
    <div>
      <div className="text-center flex justify-center items-center flex-col w-full">
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
