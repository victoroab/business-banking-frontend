import { useEffect, useState } from "react";

import { useSetPinMutation } from "../../../service/transaction";
import { toast } from "react-toastify";
import { errorHandler } from "../../../utils";
import OTPInput from "react-otp-input";
import Spinner from "../../Spinner/Spinner";
import GeneralModal from "../../PopUps/GeneralModal";
import { useUserProfileQuery } from "../../../service/kyb";
import { setUserDetails } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";

const TransactionPin = () => {
  const [newCode, setNewCode] = useState<string>("");
  const [confirmCode, setConfirmCode] = useState<string>("");
  const { data, refetch } = useUserProfileQuery({});
  const dispatch = useAppDispatch();
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
      refetch();
      toast.success(response?.message);
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    dispatch(setUserDetails(data?.data));
  }, [data, dispatch]);

  return (
    <GeneralModal>
      <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[500px]">
        <div className="flex flex-col">
          <div className="flex flex-col gap-8 justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Set Transaction PIN
              </h3>
              <p className="font-workSans">
                This PIN is to be used to authorize transactions (e.g.
                transfers, airtime purchases, bill payments, etc.)
              </p>
            </div>

            <div className="flex flex-col justify-center itemc gap-4">
              <p className="text-greyColr font-workSans leading-4 font-normal text-xl text-center">
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

              <p className="text-greyColr font-workSans leading-4 font-normal text-xl text-center">
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
      </div>
    </GeneralModal>
  );
};

export default TransactionPin;
