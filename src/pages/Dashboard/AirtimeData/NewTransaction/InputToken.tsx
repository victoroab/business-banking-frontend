import { useState } from "react";
import Otp from "../../../../components/OTP/Otp";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { errorHandler } from "../../../../utils";
import Spinner from "../../../../components/Spinner/Spinner";
import {
  selectBillPayment,
  setAirtimeDataCurrentStep,
} from "../../../../store/slice/billPaymentSlice";
import {
  useBuyAirtimeMutation,
  useBuyBundleMutation,
} from "../../../../service/billPayment";
import { SuccessIcon } from "../../../../assets/svg/CustomSVGs";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../../../assets/svg/Auth";

const InputToken = ({ setOpenPinModal }: { setOpenPinModal: any }) => {
  const [otpCode, setOtpCode] = useState<string>("");
  const navigate = useNavigate();
  const [openReceipt, setOpenReceipt] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [buyAirtime, { isLoading: buyingAirtime }] = useBuyAirtimeMutation();
  const [buyBundle, { isLoading: buyingBundle }] = useBuyBundleMutation();
  const { airtimeBundlePayload, airtimeDataAction } =
    useAppSelector(selectBillPayment);

  const isLoading = airtimeDataAction === "DATA" ? buyingBundle : buyingAirtime;
  const handleSubmit = async () => {
    try {
      const airtimeRequiredData = {
        fromAccountNumber: airtimeBundlePayload?.fromAccountNumber,
        pin: otpCode,
        serviceCategoryId: airtimeBundlePayload?.serviceCategoryId,
        network: airtimeBundlePayload?.network,
        amount: airtimeBundlePayload?.amount as number,
        phoneNumber: airtimeBundlePayload?.phoneNumber as string,
      };
      const bundleRequiredData = {
        fromAccountNumber: airtimeBundlePayload?.fromAccountNumber,
        pin: otpCode,
        serviceCategoryId: airtimeBundlePayload?.serviceCategoryId,
        network: airtimeBundlePayload?.network,
        bundleCode: airtimeBundlePayload?.bundleCode as string,
        phoneNumber: airtimeBundlePayload?.phoneNumber as string,
      };
      let response;
      if (airtimeDataAction === "DATA") {
        response = await buyBundle(bundleRequiredData).unwrap();
      } else {
        response = await buyAirtime(airtimeRequiredData).unwrap();
      }
      console.log(response);
      setOpenReceipt(true);
    } catch (error: any) {
      errorHandler(error);
    }
  };

  return (
    <>
      {openReceipt ? (
        <div className="bg-pryColor rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
          <div
            className="p-4 gap-4 rounded-full items-center justify-center flex w-[122px] h-[122px] bg-white"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
          >
            <SuccessIcon />
          </div>

          <div className="flex flex-col gap-4 items-center justify-center text-white">
            <h3 className=" font-semibold text-2xl font-bricolage leading-6">
              {airtimeDataAction === "DATA"
                ? "Data Purchased Successfully"
                : "Airtime Purchased Successfully"}
            </h3>
            <p className=" font-workSans leading-4 font-normal text-base text-center">
              {airtimeDataAction === "DATA"
                ? `You have successfully sent data to
              ${airtimeBundlePayload?.phoneNumber}`
                : `You have successfully recharged your number
              ${airtimeBundlePayload?.phoneNumber}`}
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center border-t pt-6 text-white">
            <p className=" font-workSans leading-4 font-normal text-sm text-center">
              Transfer Amount
            </p>
            <h3 className="font-semibold text-2xl font-bricolage leading-6 text-secColor">
              &#8358;{airtimeBundlePayload?.amount}.00
            </h3>

            <p className="font-workSans leading-4 font-medium text-base text-center mt-10">
              Add Beneficiary ?
            </p>
          </div>
          <div className="flex justify-center  w-[80%] gap-6">
            <button
              className="border border-[var(--secColor)] w-1/2 rounded-[12px] bg-pryColor px-[9px] py-[12px] text-[18px] font-medium text-[var(--secColor)] cursor-pointer font-['Bricolage_Grotesque']"

              // onClick={() => navigate("/signup")}
            >
              Share Receipt
            </button>
            <button
              className="border border-[var(--secColor)] w-1/2 rounded-[12px] bg-secColor text-greyColr px-[9px] py-[12px] text-[18px] font-medium cursor-pointer font-['Bricolage_Grotesque']"

              // onClick={() => navigate("/signup")}
            >
              Download Receipt
            </button>
          </div>
          <div className="flex justify-center  w-[80%] gap-6">
            <button
              className="border border-[var(--secColor)] w-[80%] rounded-[12px] bg-pryColor px-[9px] py-[12px] text-[18px] font-medium text-[var(--secColor)] cursor-pointer font-['Bricolage_Grotesque']"
              onClick={() => {
                dispatch(setAirtimeDataCurrentStep(1));
                navigate("/");
              }}
            >
              Go To Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
          <div className="flex flex-col w-full gap-10 justify-center items-center text-center">
            <div className="cursor-pointer w-full justify-end items-end flex">
              <CloseIcon onClick={() => setOpenPinModal(false)} />
            </div>
            <Otp
              inputCount={4}
              title={"Enter Your Transaction PIN"}
              setOtpCode={setOtpCode}
              otpCode={otpCode}
              paragraph={
                <p>
                  Please input your 4-digit transaction PIN to proceed securely.
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
      )}
    </>
  );
};

export default InputToken;
