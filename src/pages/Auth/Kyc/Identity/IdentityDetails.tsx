import React from "react";
import { useGetBVNDetailsQuery } from "../../../../service/kyb";

import Spinner from "../../../../components/Spinner/Spinner";
import { setKycCurrentStep } from "../../../../store/slice/authSlice";
import { useAppDispatch } from "../../../../hooks";

const IdentityDetails: React.FC<{ identityType: string }> = ({
  identityType,
}) => {
  const { data, isLoading } = useGetBVNDetailsQuery({});
  const dispatch = useAppDispatch();
  const handleConfirmation = () => {
    dispatch(setKycCurrentStep(3));
  };
  const bvnData = data?.data;
  return (
    <div className="flex flex-col gap-4 px-4 justify-center items-center">
      {isLoading ? (
        <>
          <Spinner />{" "}
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 justify-center items-center w-[70%]">
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              Is this {identityType} Yours?
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
              Confirm the {identityType} shown below belongs to you.
            </p>
          </div>

          <div className="image">
            <img
              src={`data:image/jpeg;base64,${bvnData?.image}`}
              alt="Uploaded Preview"
              className="w-12 h-12 rounded-full mr-4"
            />
          </div>

          <div
            className="py-6 px-10 gap-2 rounded-md justify-center items-center flex flex-col w-[70%]"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
          >
            <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
              {bvnData?.firstName +
                " " +
                bvnData?.lastName +
                " " +
                bvnData?.otherName}
            </p>
            <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
              {bvnData?.phoneNumber}
            </p>
          </div>

          <div className="border-dashed p-2 justify-center items-center flex flex-col border rounded-md w-[70%]">
            <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
              Bank Verification Number(BVN)
            </p>
            <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
              1234567890
            </p>
          </div>
          <div className="flex justify-center px-14 w-full gap-6">
            <button
              className="red-frame-btn w-1/2 font-bricolage"
              type="submit"
              onClick={handleConfirmation}
            >
              No, It Isn't
            </button>
            <button
              className="main-btn w-1/2 font-bricolage"
              type="submit"
              onClick={handleConfirmation}
            >
              Yes, It's Mine
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default IdentityDetails;
