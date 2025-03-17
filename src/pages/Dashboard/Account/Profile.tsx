import { useAppSelector } from "../../../hooks";
import { useUserProfileQuery } from "../../../service/kyb";
import { selectAccount } from "../../../store/slice/account";

const Profile = () => {
  const { data } = useUserProfileQuery({});
  const { businessKYBDetails } = useAppSelector(selectAccount);

  console.log(businessKYBDetails);
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
        Personal Profile
      </h3>
      <div
        className="p-4 gap-4 rounded-md items-center flex flex-col w-full"
        style={{
          boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
        }}
      >
        <div className="flex justify-start items-start w-full">
          <div className="flex items-center justify-center w-[64px] h-[64px] bg-[#f1f2f3] p-4 rounded-full">
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              {data?.data?.firstName?.charAt(0) +
                data?.data?.lastName?.charAt(0)}
            </h3>
          </div>
        </div>
        <div className="column flex justify-between items-center w-full">
          <div className="flex flex-col items-start justify-start">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              First Name
            </p>
            <p className="text-base text-greyColr font-workSans font-medium">
              {data?.data?.firstName}
            </p>
          </div>
          <div className="flex flex-col justify-end items-end">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              Last Name
            </p>
            <p className="text-base text-greyColr font-workSans font-medium">
              {data?.data?.lastName}
            </p>
          </div>
        </div>
        <div className="column flex justify-between items-center w-full">
          <div className="flex flex-col items-start justify-start">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              Email Address
            </p>
            <p className="text-base text-greyColr font-workSans font-medium">
              {data?.data?.email}
            </p>
          </div>
          <div className="flex flex-col justify-end items-end">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              Phone Number
            </p>
            <p className="text-base text-greyColr font-workSans font-medium">
              {data?.data?.phoneNumber}
            </p>
          </div>
        </div>
        <div className="column flex justify-between items-center w-full">
          <div className="flex flex-col items-start justify-start">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              Date of Birth
            </p>
            <p className="text-base text-greyColr font-workSans font-medium">
              {data?.data?.dob}
            </p>
          </div>
          {/* <div className="flex flex-col justify-end items-end">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              Next of Kin
            </p>
            <p className="text-base text-greyColr font-workSans font-medium">
              Olaniyan Remilekun
            </p>
          </div> */}
        </div>
      </div>

      <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6 mt-6">
        Business Profile
      </h3>

      <div
        className="p-4 gap-4 rounded-md items-center flex flex-col w-full"
        style={{
          boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
        }}
      >
        <div className="flex justify-start items-start w-full">
          <div className="flex items-center justify-center w-[64px] h-[64px] bg-[#f1f2f3] p-4 rounded-full">
            <img
              src={businessKYBDetails?.logo}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
        <div className="column flex justify-between items-center w-full">
          <div className="flex flex-col items-start justify-start">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              Business Name
            </p>
            <p className="text-base text-greyColr font-workSans font-medium">
              {businessKYBDetails?.businessName}
            </p>
          </div>
          <div className="flex flex-col justify-end items-end">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              Business Industry
            </p>
            <p className="text-base text-greyColr font-workSans font-medium">
              {businessKYBDetails?.industry}
            </p>
          </div>
        </div>
        <div className="column flex justify-between items-center w-full">
          <div className="flex flex-col items-start justify-start">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              Size
            </p>
            <p className="text-base text-greyColr font-workSans font-medium">
              {businessKYBDetails?.size}
            </p>
          </div>
          <div className="flex flex-col justify-end items-end">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              Estimated Annual Income
            </p>
            <p className="text-base text-greyColr font-workSans font-medium">
              {businessKYBDetails?.income}
            </p>
          </div>
        </div>
        <div className="column flex justify-between items-center w-full">
          <div className="flex flex-col items-start justify-start">
            <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
              Business Address
            </p>
            <p className="text-base text-greyColr font-workSans font-medium ">
              {businessKYBDetails?.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
