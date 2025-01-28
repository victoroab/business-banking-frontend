import { useState } from "react";
import OTPInput from "react-otp-input";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import { useSetPinMutation } from "../../../service/transaction";
import { toast } from "react-toastify";
import { errorHandler } from "../../../utils";
import Spinner from "../../../components/Spinner/Spinner";
const TransactionPin = () => {
  const [newCode, setNewCode] = useState<string>("");
  const [confirmCode, setConfirmCode] = useState<string>("");
  const { userDetails } = useAppSelector(selectAuth);

  console.log(userDetails);
  const handleNewChange = (otp: string) => {
    setNewCode(otp);
  };

  const handleCodeChange = (otp: string) => {
    setConfirmCode(otp);
  };

  const [setPin, { isLoading }] = useSetPinMutation();

  const handleSubmit = async () => {
    try {
      const requiredData = {
        pin: newCode,
        confirmPin: confirmCode,
      };
      const response = await setPin(requiredData).unwrap();
      setConfirmCode("");
      setNewCode("");
      toast.success(response?.message);
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-8 w-[300px]">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          {userDetails?.isPinSet
            ? "Change Transaction PIN"
            : "Set Transaction PIN"}
        </h3>

        <div className="flex flex-col  gap-4">
          <p className="text-greyColr font-workSans leading-4 font-normal text-xl">
            Enter New PIN
          </p>
          <OTPInput
            value={newCode}
            onChange={handleNewChange}
            numInputs={4}
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

          <p className="text-greyColr font-workSans leading-4 font-normal text-xl">
            Confirm New PIN
          </p>
          <OTPInput
            value={confirmCode}
            onChange={handleCodeChange}
            numInputs={4}
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

        <div className="flex justify-center  w-full gap-6">
          <button className="main-btn w-full" onClick={handleSubmit}>
            {isLoading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPin;
