import { useState } from "react";
import Otp from "../../../../components/OTP/Otp";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useGlobalHooks } from "../../../../hooks/globalHooks";
import PopUp from "../../../../components/PopUps/PopUp";
import { selectGlobal } from "../../../../store/slice/globalSlice";
import { errorHandler } from "../../../../utils";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner/Spinner";
import {
  selectBillPayment,
  setAirtimeDataCurrentStep,
} from "../../../../store/slice/billPaymentSlice";
import { useBuyAirtimeMutation } from "../../../../service/billPayment";

const InputToken = () => {
  const [otpCode, setOtpCode] = useState<string>("");
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const dispatch = useAppDispatch();
  const [buyAirtime, { isLoading }] = useBuyAirtimeMutation();
  const { airtimeBundlePayload } = useAppSelector(selectBillPayment);

  const handleSubmit = async () => {
    try {
      const requiredData = {
        fromAccountNumber: airtimeBundlePayload?.fromAccountNumber,
        pin: otpCode,
        serviceCategoryId: airtimeBundlePayload?.serviceCategoryId,
        network: airtimeBundlePayload?.network,
        amount: airtimeBundlePayload?.amount as number,
        phoneNumber: airtimeBundlePayload?.phoneNumber as string,
      };
      const response = await buyAirtime(requiredData).unwrap();
      handleShow("input-pin");
      toast.success(response?.message);
      dispatch(setAirtimeDataCurrentStep(1));
    } catch (error: any) {
      errorHandler(error);
    }
  };

  return (
    <>
      {toggle["input-pin"] && (
        <PopUp id={"input-pin"}>
          <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
            <div className="flex flex-col w-full gap-10 justify-center items-center">
              <Otp
                inputCount={4}
                title={"Enter Your Transaction PIN"}
                setOtpCode={setOtpCode}
                otpCode={otpCode}
                paragraph={
                  <p>
                    Please input your 4-digit transaction PIN to proceed
                    securely.
                  </p>
                }
              />
              <div className="flex justify-center  w-full gap-6">
                <button className="main-btn w-full" onClick={handleSubmit}>
                  {isLoading ? <Spinner /> : "Next"}
                </button>
              </div>
            </div>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default InputToken;
