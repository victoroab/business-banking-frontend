import AuthLayout from "../../../layout/AuthLayout";
import { useState } from "react";
import { useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../../store/slice/authSlice";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { useSetCodeMutation } from "../../../service/auth";
import Spinner from "../../../components/Spinner/Spinner";

const SetPasscode = () => {
  const navigate = useNavigate();
  const [newCode, setNewCode] = useState<string>("");
  const [confirmCode, setConfirmCode] = useState<string>("");
  const { email, verificationOTP } = useAppSelector(selectAuth);
  const [setCode, { isLoading }] = useSetCodeMutation();

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
        const requiredExistingData = {
          emailOrAccountNumber: email,
          passcode: newCode,
          confirmPasscode: confirmCode,
          otp: verificationOTP,
        };
        const response = await setCode(requiredExistingData).unwrap();
        toast.success(response?.message);
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-20 px-12 gap-8">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4">
            <h3 className="text-pryColor font-semibold text-2xl text-left font-bricolage leading-6">
              Reset Passcode
            </h3>
            <p className="text-greyColr font-workSans leading-4 text-left font-normal text-sm">
              Enter your secure passcode to access your account and stay in
              control of your finances. Quick, simple, and safe.
            </p>
          </div>

          <div className="flex flex-col gap-4 -ml-2">
            <p className="text-[#23303B] font-workSans leading-4 font-medium text-xl text-left ml-2">
              Enter New Passcode
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
              Confirm New Passcode
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
    </AuthLayout>
  );
};

export default SetPasscode;
