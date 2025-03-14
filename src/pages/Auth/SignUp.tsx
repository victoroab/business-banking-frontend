import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import AuthLayout from "../../layout/AuthLayout";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useInitiateMutation } from "../../service/auth";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { setPhoneNumber } from "../../store/slice/authSlice";
import Spinner from "../../components/Spinner/Spinner";
import {
  selectGlobal,
  setHavePersonalAccount,
} from "../../store/slice/globalSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { UserSignUpTabIcon } from "../../assets/svg/Sidebar";

const SignUp = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [initiate, { isLoading }] = useInitiateMutation();
  const { havePersonalAccount } = useAppSelector(selectGlobal);
  const [activeTab, setActiveTab] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };
  const signUpTab = [
    {
      id: 1,
      title: "New User ?",
      paragraph:
        "You are just signing up on Alert for the first time. Get started now",
    },
    {
      id: 2,
      title: "Existing User ?",
      paragraph:
        "Get an Alert business account faster and in less steps when you sign up using your Alert account.",
    },
  ];
  const initialValues = {
    phoneNumber: "",
  };

  const onSubmit = async (formData: { phoneNumber: string }) => {
    const requiredData = {
      phoneNumber: formData.phoneNumber,
      onboardType: havePersonalAccount ? "EXISTING" : "NEW",
    };

    try {
      const response = await initiate(requiredData).unwrap();
      toast.success(response?.message);
      dispatch(setPhoneNumber(formData.phoneNumber));
      navigate("/verify-otp");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const formSchema = Yup.object().shape({
    phoneNumber: Yup.string().required(
      ` ${
        activeTab === 1
          ? "Phone number is required"
          : "Account Number is required"
      }`
    ),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  const handleAccountStatus = (id: number) => {
    const status = id === 1 ? false : true;
    dispatch(setHavePersonalAccount(status));
    setActiveTab(id);
  };

  return (
    <div>
      {" "}
      <AuthLayout loginBtn={false} terms>
        <div className="text-center flex justify-center items-center flex-col mt-32 px-6">
          <div className="flex justify-between items-center gap-8 mb-4 px-6">
            {signUpTab?.map((tab: any) => (
              <div
                onClick={() => handleAccountStatus(tab.id)}
                className={`flex flex-col cursor-pointer rounded-2xl p-4 items-start w-1/2 h-[160px] ${
                  activeTab === tab.id ? "border-secColor border" : "border"
                }`}
              >
                <div className="flex">
                  <UserSignUpTabIcon
                    fillColor={activeTab === tab.id ? "#DBB951" : "#352F36"}
                    fillOpacity={activeTab === tab.id ? "1" : "0.3"}
                  />
                </div>
                <div
                  className={`flex font-bricolage ${
                    activeTab === tab.id ? "text-pryColor" : "text-greyColr"
                  } font-semibold`}
                >
                  {tab.title}
                </div>
                <div className="flex font-workSans text-sm text-left">
                  {tab.paragraph}
                </div>
              </div>
            ))}
          </div>
          <form className="flex px-6 flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Sign Up
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                To sign up, please enter the phone number linked to your
                personal Alert account
              </p>
            </div>

            <FormInput
              placeholder={
                havePersonalAccount
                  ? "Account number"
                  : "Phone number/Email address"
              }
              type="text"
              id={"phoneNumber"}
              name="phoneNumber"
              error={touched.phoneNumber ? errors.phoneNumber : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.phoneNumber}
            />
            <div className="flex flex-col gap-8">
              <p className="text-greyColr font-workSans leading-6 text-left font-normal text-sm w-full flex">
                <label className="purple-checkbox gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span className="checkmark"></span>
                  <span className="text-greyColr font-workSans leading-4 font-normal text-sm">
                    By useing Aert Business, I agree to the{" "}
                    <span className="font-bold cursor-pointer text-black">
                      Terms of Use
                    </span>{" "}
                    and{" "}
                    <span className="font-bold cursor-pointer text-black">
                      Privacy Policy
                    </span>
                  </span>
                </label>
              </p>
            </div>

            <div className="flex justify-center  w-full gap-6">
              <button className="main-btn w-full" type="submit">
                {isLoading ? <Spinner /> : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
