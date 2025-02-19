import OtpInput from "react-otp-input";
import { OTPProps } from "../../interfaces/Global";

const Otp: React.FC<OTPProps> = ({
  title,
  paragraph,
  inputCount,
  setOtpCode,
  otpCode,
}) => {
  const handleChange = (otp: string) => {
    const isNumeric = /^\d*$/.test(otp);
    if (isNumeric && otp.length <= inputCount) {
      setOtpCode(otp);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          {title}
        </h3>
        <div className="text-greyColr font-workSans leading-4 font-normal text-sm">
          {paragraph}
        </div>
      </div>
      <div className="flex justify-center items-center flex-col">
        {" "}
        <OtpInput
          value={otpCode}
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
          renderInput={(props) => (
            <input {...props} inputMode="numeric" pattern="\d*" />
          )}
        />
      </div>
    </div>
  );
};

export default Otp;
