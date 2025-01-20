import AuthLayout from "../../layout/AuthLayout";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { saveUserInfo, selectAuth } from "../../store/slice/authSlice";
import OTPInput from "react-otp-input";
import toast from "react-hot-toast";
import {
  useSetExistingPasscodeMutation,
  useSetPasscodeMutation,
} from "../../service/auth";
import { selectGlobal } from "../../store/slice/globalSlice";
import { useGlobalHooks } from "../../hooks/globalHooks";
import Spinner from "../../components/Spinner/Spinner";
import SuccessMessage from "../../components/PopUps/SuccessMessage";

const Passcode = () => {
  const navigate = useNavigate();
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const dispatch = useAppDispatch();
  const [newCode, setNewCode] = useState<string>("");
  const [confirmCode, setConfirmCode] = useState<string>("");
  const { phoneNumber, verificationOTP } = useAppSelector(selectAuth);
  const [setPasscode, newMutation] = useSetPasscodeMutation();
  const [responseMessage, setResponseMessage] = useState("");
  const [setExistingPasscode, existingMutation] =
    useSetExistingPasscodeMutation();
  const { havePersonalAccount } = useAppSelector(selectGlobal);

  const isLoading = havePersonalAccount
    ? existingMutation?.isLoading
    : newMutation?.isLoading;

  const handleNewChange = (otp: string) => {
    setNewCode(otp);
  };

  const handleChange = (otp: string) => {
    setConfirmCode(otp);
  };

  const handleSubmit = async () => {
    try {
      if (newCode !== confirmCode) {
        toast.error("Passcode mismatch");
      } else {
        const requiredData = {
          phoneNumber: phoneNumber,
          passcode: newCode,
          confirmPasscode: confirmCode,
        };
        const requiredExistingData = {
          accountNumber: phoneNumber,
          passcode: newCode,
          confirmPasscode: confirmCode,
          otp: verificationOTP,
        };
        const response = havePersonalAccount
          ? await setExistingPasscode(requiredExistingData).unwrap()
          : await setPasscode(requiredData).unwrap();

        dispatch(saveUserInfo(response.data));
        setResponseMessage(response?.message);
        handleShow("success");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  const handleNavigate = () => {
    navigate("/kyb/identity");
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-20 px-12 gap-8">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4">
            <h3 className="text-pryColor font-semibold text-2xl text-left font-bricolage leading-6">
              Set Up your business account passcode
            </h3>
            <p className="text-greyColr font-workSans leading-4 text-left font-normal text-sm">
              Your passcode will help keep your account safe and allow quick
              access to your banking app.
            </p>
          </div>

          <div className="flex flex-col gap-4 -ml-2">
            <p className="text-[#23303B] font-workSans leading-4 font-medium text-xl text-left ml-2">
              Enter Passcode
            </p>
            <OTPInput
              value={newCode}
              onChange={handleNewChange}
              numInputs={6}
              inputType="password"
              inputStyle={{
                maxWidth: "64px",
                maxHeight: "64px",
                width: "10vw",
                height: "8vw",
                margin: "10px",
                fontSize: "40px",
                fontWeight: "bold",
                borderRadius: 8,
                backgroundColor: "#f1f1f1",
                outlineColor: "#0E0C60",
                minWidth: "55px",
                minHeight: "60px",
              }}
              renderInput={(props) => <input {...props} />}
            />

            <p className="text-[#23303B] font-workSans leading-4 font-medium text-xl text-left ml-2">
              Confirm Passcode
            </p>
            <OTPInput
              value={confirmCode}
              onChange={handleChange}
              numInputs={6}
              inputType="password"
              inputStyle={{
                maxWidth: "64px",
                maxHeight: "64px",
                width: "10vw",
                height: "8vw",
                margin: "10px",
                fontSize: "40px",
                fontWeight: "bold",
                borderRadius: 8,
                backgroundColor: "#f1f1f1",
                outlineColor: "#0E0C60",
                minWidth: "55px",
                minHeight: "60px",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </div>

        <div className="flex justify-center  w-full gap-6">
          <button
            className="main-btn w-full"
            type="submit"
            onClick={handleSubmit}
          >
            {isLoading ? <Spinner /> : "Continue"}
          </button>
        </div>
      </div>

      {toggle["success"] && (
        <SuccessMessage
          handleNavigate={handleNavigate}
          responseMessage={responseMessage}
          auth
          paragraph={
            " Your Passcode is set and ready to use. You’re now one step closer to secure and seamless transactions. Remember to keep your Passcode private and safe"
          }
        />
      )}
    </AuthLayout>
  );
};

export default Passcode;
