import { useEffect, useState } from "react";
import { useGenerateCodeMutation } from "../../../service/security";
import { copyToClipboard, errorHandler } from "../../../utils";
import { CopyIcon, SuccessIcon } from "../../../assets/svg/CustomSVGs";
import { QRCodeData } from "../../../interfaces/service/security";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import Verify2FA from "../../../components/Verify2FA";
import { useAppSelector } from "../../../hooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import Spinner from "../../../components/Spinner/Spinner";

const SetUp2FA = () => {
  const [generateCode, { isLoading }] = useGenerateCodeMutation();
  const [code, setCode] = useState<QRCodeData>();
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);

  const handleGenerateCode = async () => {
    try {
      const response = await generateCode().unwrap();
      setCode(response?.data);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    handleGenerateCode();
  }, []);

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Two-Factor Authentication
        </h3>

        <div
          className="p-6 gap-4 rounded-md items-center flex flex-col w-full"
          style={{
            boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
          }}
        >
          <div className="flex gap-4 w-full items-center justify-center flex-col">
            <div className="flex flex-col gap-2 items-center justify-center">
              <h3 className="text-pryColor font-semibold text-xl font-bricolage leading-6">
                Setup 2FA To secure your account
              </h3>
              <p className="text-greyColr font-workSans leading-4 text-center font-normal text-sm">
                To activate 2FA on your device, please scan the QR code below
                using any authenticator app
              </p>
            </div>
            <div className="flex gap-4 w-full items-center justify-center flex-col">
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  {code?.twoFaEnabled ? (
                    <>
                      {" "}
                      <SuccessIcon />{" "}
                      <p className="font-workSans">2FA Enabled</p>
                    </>
                  ) : (
                    <>
                      <div className="flex">
                        <img src={code?.qrCode} alt="" />
                      </div>

                      <p className="text-greyColr font-workSans leading-4 font-normal text-sm text-left w-full">
                        Setup Key
                      </p>
                      <div
                        className="p-4 gap-4  rounded-md items-center flex w-[100%] justify-between"
                        style={{
                          boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
                        }}
                      >
                        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                          <span className="text-sm font-medium">
                            {code?.secret}
                          </span>
                        </p>
                        <p
                          className="copy text-xs text-secColor flex items-center gap-2 cursor-pointer"
                          onClick={() =>
                            copyToClipboard(code?.secret as string)
                          }
                        >
                          COPY <CopyIcon />
                        </p>
                      </div>
                      <div className="flex justify-center  w-full gap-6">
                        <button
                          className="main-btn w-full"
                          type="submit"
                          onClick={() => handleShow("verify-2fa-code")}
                        >
                          Continue
                        </button>
                      </div>
                      <div className="flex border-l-4 border-secColor rounded-lg bg-pryColor-Light p-4">
                        <p className="text-greyColr font-workSans leading-4 text-center font-normal text-sm">
                          Using a laptop? Download any authenticator app on your
                          mobile device to complete setup.
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {toggle["verify-2fa-code"] && (
        <Verify2FA secret={code?.secret as string} />
      )}
    </div>
  );
};

export default SetUp2FA;
