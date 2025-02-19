import { toast } from "react-toastify";
import PopUp from "../../PopUps/PopUp";
import { selectGlobal } from "../../../store/slice/globalSlice";
import FormInput from "../../FormInput";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import {
  useSetPhoneMutation,
  useVerfifyPhoneMutation,
} from "../../../service/user";
import Spinner from "../../Spinner/Spinner";
import { useEffect, useState } from "react";
import Otp from "../../OTP/Otp";
import { useUserProfileQuery } from "../../../service/kyb";
import { errorHandler } from "../../../utils";
import { setUserDetails } from "../../../store/slice/authSlice";

const AddPhoneNumber = () => {
  const [setPhone, { isLoading }] = useSetPhoneMutation();
  const { data, refetch } = useUserProfileQuery({});
  const [verifyPone, { isLoading: verifyingPhone }] = useVerfifyPhoneMutation();
  const { handleShow } = useGlobalHooks();
  const [otpCode, setOtpCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isVerifyPhone, setIsVerifyPhone] = useState<boolean>(false);
  const toggle = useAppSelector(selectGlobal);
  const dispatch = useAppDispatch();

  const handleSetPhoneNumber = async () => {
    try {
      const requiredData = {
        phoneNumber: phoneNumber,
      };
      const response = await setPhone(requiredData).unwrap();
      toast.success(response?.message);
      setIsVerifyPhone(true);
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const handleVerifyToken = async () => {
    try {
      const response = await verifyPone({
        phoneNumber: phoneNumber,
        otp: otpCode,
      }).unwrap();
      toast.success(response?.message);
      setIsVerifyPhone(false);
      handleShow("add-phone");
      refetch();
    } catch (error: any) {
      handleShow("add-phone");
      errorHandler(error);
    }
  };

  useEffect(() => {
    dispatch(setUserDetails(data?.data));
  }, [data, dispatch]);

  return (
    <div>
      {toggle["add-phone"] && (
        <PopUp id={"add-phone"}>
          <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
            {isVerifyPhone ? (
              <>
                <div className="flex flex-col w-full gap-10 justify-center items-center">
                  <Otp
                    inputCount={6}
                    title={"Verify Your Phone Number"}
                    setOtpCode={setOtpCode}
                    otpCode={otpCode}
                    paragraph={
                      <p>
                        We sent a 6 digit code to your phone number. Check your
                        phone and enter it here.
                      </p>
                    }
                  />
                  <div className="flex justify-center  w-full gap-6">
                    <button
                      className="main-btn w-full"
                      onClick={handleVerifyToken}
                    >
                      {verifyingPhone ? <Spinner /> : "Submit"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center flex justify-center items-center flex-col w-full p-10">
                <div className="flex px-8 flex-col gap-8 w-full">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                      Enter your phone Number
                    </h3>
                    <p className="text-greyColr font-workSans leading-4 text-center font-normal text-sm">
                      Please input the phone number you want linked to your
                      account
                    </p>
                  </div>

                  <FormInput
                    id={""}
                    placeholder="Phone Number"
                    name="phoneNumber"
                    onChange={(e: any) => setPhoneNumber(e.target.value)}
                  />

                  <div className="flex justify-center  w-full gap-6">
                    <button
                      className="main-btn w-full"
                      onClick={handleSetPhoneNumber}
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

export default AddPhoneNumber;
