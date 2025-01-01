import { useGetBVNDetailsQuery } from "../../../../service/kyb";
import Spinner from "../../../../components/Spinner/Spinner";
import {
  selectAuth,
  setKycCurrentStep,
} from "../../../../store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { PhoneIcon } from "../../../../assets/svg/Auth";

const IdentityDetails = () => {
  const { data, isLoading } = useGetBVNDetailsQuery({});
  const { kycIdentityStep } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const handleConfirmation = () => {
    dispatch(setKycCurrentStep(3));
  };
  const bvnData = data?.data;
  return (
    <div className="flex flex-col gap-4 px-4 justify-center items-center">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />{" "}
        </div>
      ) : (
        <div className=" flex flex-col w-full justify-center items-center gap-6">
          <div className="flex flex-col gap-4 justify-center items-center w-[80%]">
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              Is this {kycIdentityStep} Yours?
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
              Confirm the {kycIdentityStep} shown below belongs to you.
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
            className="py-6 px-10 gap-2 rounded-xl justify-center items-center flex flex-col w-[80%]"
            style={{ boxShadow: "0px 1px 5px 2px rgba(229, 229, 229, 0.2)" }}
          >
            <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
              {bvnData?.firstName +
                " " +
                bvnData?.lastName +
                " " +
                bvnData?.otherName}
            </p>
            <p className="text-greyColr font-workSans leading-4 font-medium text-sm flex gap-2 items-center">
              <PhoneIcon /> {bvnData?.phoneNumber}
            </p>
          </div>

          <div className="border-dashed p-4 justify-center items-center gap-2 flex flex-col border rounded-xl w-[80%]">
            <p className="text-lightGreyColor font-workSans leading-4 font-normal text-sm">
              Bank Verification Number(BVN)
            </p>
            <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
              1234567890
            </p>
          </div>
          <div className="flex justify-center w-[80%] gap-6">
            <button
              className="main-btn w-full font-bricolage"
              type="submit"
              onClick={handleConfirmation}
            >
              Yes, It's Mine
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentityDetails;
