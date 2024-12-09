import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { OTPProps } from "../../interfaces/Global";

const Otp: React.FC<OTPProps> = ({
  page,
  title,
  paragraph,
  inputCount,
  resend,
}) => {
  const [otpcode, setOtpCode] = useState<string>("");
  const navigate = useNavigate();
  const handleChange = (otp: string) => {
    setOtpCode(otp);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          {title}
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          {paragraph}
        </p>
      </div>
      <div className="flex justify-center items-center">
        {" "}
        <OtpInput
          value={otpcode}
          onChange={handleChange}
          numInputs={inputCount}
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
        <button
          className="main-btn w-full"
          type="submit"
          onClick={() => navigate(page)}
        >
          Continue
        </button>
      </div>
      {resend && (
        <p className="text-lightGreyColor font-workSans leading-4 font-normal text-[13px]">
          Didn’t get the code?{" "}
          <span className="font-bold cursor-pointer text-pryColor">
            {" "}
            Resend Code
          </span>
        </p>
      )}
    </div>
  );
};

export default Otp;
