import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { accountOptions, accountSettingsSteps } from "../../../utils";

const Account = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  return (
    <div className="px-10">
      <Navbar title="Account" subtitle="View all your account settings here" />
      <div className=" flex gap-4 justify-between">
        <div className="flex border-r p-6 flex-col gap-4 bg-white w-[35%]">
          {accountSettingsSteps?.map((step) => (
            <div
              onClick={() => setCurrentTab(step.id)}
              className={` p-3 cursor-pointer font-workSans
            ${
              currentTab === step.id
                ? "bg-gray-50 border border-gray-200 font-normal text-[var(--pryColor)] rounded-xl"
                : "text-[#8E949A] font-normal"
            }
          `}
            >
              <p className="p">{step.title}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 bg-white w-full p-14">
          {currentTab === 1 && (
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
                      BA
                    </h3>
                  </div>
                </div>
                <div className="column flex justify-between items-center w-full">
                  <div className="flex flex-col items-start justify-start">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      First Name
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium">
                      Bamidele
                    </p>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      Last Name
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium">
                      Akinyemi
                    </p>
                  </div>
                </div>
                <div className="column flex justify-between items-center w-full">
                  <div className="flex flex-col items-start justify-start">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      Email Address
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium">
                      bamidele.akinyemi@alertgroup.com.ng
                    </p>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      Phone Number
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium">
                      09131683009
                    </p>
                  </div>
                </div>
                <div className="column flex justify-between items-center w-full">
                  <div className="flex flex-col items-start justify-start">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      Date of Birth
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium">
                      15/12/2024
                    </p>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      Next of Kin
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium">
                      Olaniyan Remilekun
                    </p>
                  </div>
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
                    <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                      BA
                    </h3>
                  </div>
                </div>
                <div className="column flex justify-between items-center w-full">
                  <div className="flex flex-col items-start justify-start">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      Business Name
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium">
                      Bammy World
                    </p>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      Business Industry
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium">
                      ICT
                    </p>
                  </div>
                </div>
                <div className="column flex justify-between items-center w-full">
                  <div className="flex flex-col items-start justify-start">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      Size
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium">
                      1000-10000
                    </p>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      Estimated Annual Income
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium">
                      NGN 10,000,000 - NGN 100,000,000
                    </p>
                  </div>
                </div>
                <div className="column flex justify-between items-center w-full">
                  <div className="flex flex-col items-start justify-start">
                    <p className="tit text-sm text-lightGreyColor font-workSans font-normal">
                      Business Address
                    </p>
                    <p className="text-base text-greyColr font-workSans font-medium ">
                      132 Herbert Macuarly Way, Yaba, Lagos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 2 && (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                  Verification
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                {accountOptions.map((option: any, index) => (
                  <div
                    className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
                    style={{
                      boxShadow: "0px 1px 7px 5px rgba(216, 216, 216, 0.2)",
                    }}
                    key={index}
                    // onClick={() => handleNavigate(option?.shortCode as string)}
                  >
                    <div
                      className="flex items-center justify-center w-[40px] h-[40px] p-2 rounded-sm"
                      style={{ backgroundColor: option?.iconBg }}
                    >
                      {<option.icon />}
                    </div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-medium text-lightGreyColor m-0 font-workSans">
                        {option?.title}
                      </h2>
                      {/* <ArrowRightIcon /> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
