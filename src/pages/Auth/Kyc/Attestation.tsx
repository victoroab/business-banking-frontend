import { useGlobalHooks } from "../../../hooks/globalHooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import { useAppSelector } from "../../../hooks";
import PopUp from "../../../components/PopUps/PopUp";
import { CopyIcon, SuccessIcon } from "../../../assets/svg/CustomSVGs";
import { useNavigate } from "react-router-dom";
import { attestation } from "../../../utils";
import { FolderIcon } from "../../../assets/svg/Auth";
import Checkbox from "../../../components/FormInput/Checkbox";
import { useState } from "react";
import { useAttestationMutation } from "../../../service/kyb";

import Spinner from "../../../components/Spinner/Spinner";

const Attestation = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const [isChecked, setIsChecked] = useState(false);
  const [attest, { isLoading }] = useAttestationMutation();
  const navigate = useNavigate();
  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSubmit = async () => {
    const requiredData = {
      attest: isChecked,
    };
    await attest(requiredData).unwrap();
    handleShow("submit");
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center px-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Attestation
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Please review the details below and confirm their accuracy before
          proceeding. By submitting, you acknowledge that the information
          provided is true and correct to the best of your knowledge
        </p>
      </div>

      <div className=" flex justify-between items-center w-full">
        {attestation?.map((attest) => (
          <div
            className="flex justify-between items-center flex-col gap-2"
            key={attest.id}
          >
            <FolderIcon />
            <p className="title font-medium font-workSans">{attest.title}</p>
            <p
              className="text-positive font-workSans cursor-pointer font-medium"
              onClick={() => navigate(attest.navigate)}
            >
              Edit
            </p>
          </div>
        ))}
      </div>

      <div
        className="p-4 gap-4 rounded-md items-center flex w-full"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          label="I Attest that all the information provided above is correct"
        />
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

      {toggle["submit"] && (
        <PopUp id={"submit"}>
          <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
            <div
              className="p-4 gap-4 rounded-full items-center justify-center flex w-[122px] h-[122px]"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <SuccessIcon />
            </div>

            <div className="flex flex-col gap-4 items-center justify-center">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Your Business Profile is Ready
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-base text-center">
                Congratulations! Your profile has been successfully created
                <br /> and an account number has been assigned to you.
              </p>
            </div>

            <div
              className="p-4 gap-4  rounded-md items-center flex w-[80%] justify-between"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                Account Number:{" "}
                <span className="text-sm font-medium">1234567890</span>
              </p>
              <p className="copy text-xs text-secColor flex items-center gap-2">
                COPY <CopyIcon />
              </p>
            </div>

            <div className="flex justify-center  w-[80%] gap-6">
              <button
                className="main-btn w-full"
                type="submit"
                onClick={() => navigate("/dashboard")}
              >
                Proceed To Dashboard
              </button>
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default Attestation;
