import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  selectAuth,
  setKYCIdentityStep,
} from "../../../../store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import FormInput from "../../../../components/FormInput";

import Spinner from "../../../../components/Spinner/Spinner";
import { useValidateBVNMutation } from "../../../../service/kyb";
import { CautionIcon } from "../../../../assets/svg/CustomSVGs";
import NIN from "./NIN";
import { selectGlobal } from "../../../../store/slice/globalSlice";
import IdentityDetails from "./IdentityDetails";

const BVN = () => {
  const dispatch = useAppDispatch();
  const [validateBVN, { isLoading }] = useValidateBVNMutation();
  const { kycIdentityStep } = useAppSelector(selectAuth);
  const { havePersonalAccount } = useAppSelector(selectGlobal);

  const initialValues = {
    bvn: "",
  };

  const onSubmit = async (formData: { bvn: string }) => {
    try {
      const response = await validateBVN(formData).unwrap();
      toast.success(response?.message);
      dispatch(setKYCIdentityStep("NIN"));
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const formSchema = Yup.object().shape({
    bvn: Yup.string().required("BVN is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  return (
    <div>
      {havePersonalAccount ? (
        <IdentityDetails />
      ) : (
        <>
          {kycIdentityStep === "BVN" ? (
            <div className="flex justify-center items-center flex-col w-full">
              <form
                className="flex px-8 flex-col gap-8 w-full"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                    BVN
                  </h3>
                  <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                    Enter your 11 digit Bank Verfication Number (BVN)
                  </p>
                </div>

                <FormInput
                  placeholder="Bank Verification Number"
                  type="text"
                  id={"bvn"}
                  name="bvn"
                  error={touched.bvn ? errors.bvn : undefined}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.bvn}
                />
                <div
                  className="px-6 py-2 -mt-3 gap-4 rounded-md items-center flex w-full"
                  style={{
                    boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
                  }}
                >
                  <CautionIcon />
                  <p className="text-greyColr font-workSans leading-4 font-normal text-xs">
                    Dial *565*0# on your registered phone number to get your BVN
                  </p>
                </div>

                <div className="flex justify-center  w-full gap-6">
                  <button className="main-btn w-full" type="submit">
                    {isLoading ? <Spinner /> : "Continue"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <NIN />
          )}
        </>
      )}
    </div>
  );
};

export default BVN;
