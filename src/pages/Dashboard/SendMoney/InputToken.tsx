import { useState } from "react";
import Otp from "../../../components/OTP/Otp";
import {
  selectTransaction,
  setTransactionCurrentStep,
} from "../../../store/slice/transactionSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import PopUp from "../../../components/PopUps/PopUp";
import { selectGlobal } from "../../../store/slice/globalSlice";
import { useSendMoneyMutation } from "../../../service/transaction";
import { errorHandler } from "../../../utils";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import { SuccessIcon } from "../../../assets/svg/CustomSVGs";

const InputToken = () => {
  const [otpCode, setOtpCode] = useState<string>("");
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const [openReceipt, setOpenReceipt] = useState<boolean>(false);
  const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const { sendMoneyPayload } = useAppSelector(selectTransaction);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      const requiredData = {
        ...sendMoneyPayload,
        pin: otpCode,
      };
      const response = await sendMoney(requiredData).unwrap();
      handleShow("input-pin");
      setOpenReceipt(true);
      console.log(response);
      toast.success(response?.message);
      dispatch(setTransactionCurrentStep(1));
    } catch (error: any) {
      errorHandler(error);
      dispatch(setTransactionCurrentStep(1));
    }
  };
  console.log(openReceipt);
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

      {openReceipt && (
        <PopUp id={"send-money-receipt"}>
          <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
            <div
              className="p-4 gap-4 rounded-full items-center justify-center flex w-[122px] h-[122px]"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <SuccessIcon />
            </div>

            <div className="flex flex-col gap-4 items-center justify-center">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Bet wallet Funded Successfully
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-base text-center">
                Your wallet has been funded successfully
              </p>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center border-t pt-6">
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm text-center">
                TV Package
              </p>
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                DSTV Yanga NGN 5,000
              </h3>

              <p className="text-greyColr font-workSans leading-4 font-normal text-base text-center">
                Add Beneficiary ?
              </p>
            </div>
            <div className="flex justify-center  w-full gap-6">
              <button
                className="yellow-frame-btn w-1/2"
                type="submit"
                // onClick={() => navigate("/signup")}
              >
                Share Receipt
              </button>
              <button
                className="main-btn w-1/2"
                type="submit"
                // onClick={() => navigate("/signup")}
              >
                Download Receipt
              </button>
            </div>
            <div className="flex justify-center  w-[80%] gap-6">
              <button
                className="main-btn w-full"
                type="submit"
                // onClick={() => navigate("/")}
              >
                Download Receipt
              </button>
            </div>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default InputToken;
