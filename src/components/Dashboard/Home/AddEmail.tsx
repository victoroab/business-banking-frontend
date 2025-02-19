import { toast } from "react-toastify";
import PopUp from "../../PopUps/PopUp";
import { selectGlobal } from "../../../store/slice/globalSlice";
import FormInput from "../../FormInput";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import {
  useSetEmailMutation,
  useVerfifyEmailMutation,
} from "../../../service/user";
import Spinner from "../../Spinner/Spinner";
import { useEffect, useState } from "react";
import Otp from "../../OTP/Otp";
import { useUserProfileQuery } from "../../../service/kyb";
import { errorHandler } from "../../../utils";
import { setUserDetails } from "../../../store/slice/authSlice";

const AddEmail = () => {
  const [setEmail, { isLoading }] = useSetEmailMutation();
  const { data, refetch } = useUserProfileQuery({});
  const [verifyEmail, { isLoading: verifyingEmail }] =
    useVerfifyEmailMutation();
  const { handleShow } = useGlobalHooks();
  const [otpCode, setOtpCode] = useState<string>("");
  const [email, setEmailAddress] = useState<string>("");
  const [isVerifyEmail, setIsVerifyEmail] = useState<boolean>(false);
  const toggle = useAppSelector(selectGlobal);
  const dispatch = useAppDispatch();

  const handleSetEmail = async () => {
    try {
      const requiredData = {
        email: email,
      };
      const response = await setEmail(requiredData).unwrap();
      toast.success(response?.message);
      setIsVerifyEmail(true);
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const handleVerifyToken = async () => {
    try {
      const response = await verifyEmail({
        email: email,
        otp: otpCode,
      }).unwrap();
      toast.success(response?.message);
      setIsVerifyEmail(false);
      handleShow("add-email");
      refetch();
    } catch (error: any) {
      handleShow("add-email");
      errorHandler(error);
    }
  };

  useEffect(() => {
    dispatch(setUserDetails(data?.data));
  }, [data, dispatch]);

  return (
    <div>
      {toggle["add-email"] && (
        <PopUp id={"add-email"}>
          <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
            {isVerifyEmail ? (
              <>
                <div className="flex flex-col w-full gap-10 justify-center items-center">
                  <Otp
                    inputCount={6}
                    title={"Verify Your Email Address"}
                    setOtpCode={setOtpCode}
                    otpCode={otpCode}
                    paragraph={
                      <p>
                        We sent a 6 digit code to your mail. Check your mail and
                        enter it here.
                      </p>
                    }
                  />
                  <div className="flex justify-center  w-full gap-6">
                    <button
                      className="main-btn w-full"
                      onClick={handleVerifyToken}
                    >
                      {verifyingEmail ? <Spinner /> : "Submit"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center flex justify-center items-center flex-col w-full p-10">
                <div className="flex px-8 flex-col gap-8 w-full">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                      Enter your email address
                    </h3>
                    <p className="text-greyColr font-workSans leading-4 text-center font-normal text-sm">
                      Please input the email address you want linked to your
                      account
                    </p>
                  </div>

                  <FormInput
                    id={""}
                    placeholder="Email address"
                    name="email"
                    onChange={(e: any) => setEmailAddress(e.target.value)}
                  />

                  <div className="flex justify-center  w-full gap-6">
                    <button
                      className="main-btn w-full"
                      onClick={handleSetEmail}
                    >
                      {isLoading ? <Spinner /> : "Continue"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default AddEmail;
