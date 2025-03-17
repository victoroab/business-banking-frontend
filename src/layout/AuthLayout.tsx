import { Layout } from "../interfaces/Global";
import { AlertLogoIcon } from "../assets/svg/Sidebar";
import BackNavigation from "../components/ArrowBack/Back";
// import { useNavigate } from "react-router-dom";
import { CBNIcon, NDICIcon } from "../assets/svg/Auth";
// import { useState } from "react";

const AuthLayout: React.FC<Layout> = ({ children, loginBtn, terms }) => {
  // const navigate = useNavigate();

  // console.log(isChecked, "sdfd");
  return (
    <main className="h-screen w-full flex">
      <section className="fixed h-full flex flex-col w-1/2 bg-pryColor-Light px-20 py-6 justify-between">
        <div className="flex gap-2 item-center ">
          <AlertLogoIcon />
          <h1 className="font-bold text-base text-pryColor font-bricolage m-0 p-1">
            Alert Business
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-pryColor font-semibold text-[40px] font-bricolage leading-12">
            Welcome to Alert – <br />
            Redefining Business <br /> Banking
          </h1>

          <p className="text-greyColr font-workSans leading-6 font-normal text-sm">
            We’re excited to have you with us! Alert is your all-in-one business{" "}
            <br />
            banking solution, designed to simplify financial management, <br />
            enhance efficiency, and help your business grow
          </p>
        </div>
        <div className="flex flex-col">
          <p className="footer-text font-normal text-base text-greyColr font-workSans leading-4 flex items-center gap-1">
            Alert MFB is licensed by the Central Bank of Nigeria{" "}
            <span className="flex items-center gap-1">
              <CBNIcon /> All deposits are
            </span>{" "}
          </p>
          <p className="footer-text font-normal text-base text-greyColr font-workSans leading-4 flex items-center gap-1">
            insured by the NDIC{" "}
            <span>
              {" "}
              <NDICIcon />
            </span>
          </p>
        </div>
      </section>
      <section className="ml-[50%] w-1/2 bg-white px-20 pt-4 overflow-y-auto">
        {/* {loginBtn && (
          <div className="flex justify-end font-workSans text-base items-center gap-2">
            <p className="question">Already have an account?</p>
            <button
              className="main-btn w-[160px]"
              type="submit"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        )} */}
        <div className={loginBtn ? "" : "h-[100%] flex justify-end flex-col"}>
          <div
            className={
              loginBtn
                ? ""
                : "h-[90%] flex items-center flex-col shadow-default"
            }
          >
            {children}

            {terms && (
              <div className="flex p-6 flex-col gap-8">
                {/* <p className="text-greyColr font-workSans leading-6 text-left font-normal text-sm w-full px-6 flex">
                  <label className="purple-checkbox gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <span className="checkmark"></span>
                    <span className="text-greyColr font-workSans leading-4 font-normal text-sm">
                      By useing Aert Business, I agree to the{" "}
                      <span className="font-bold cursor-pointer text-black">
                        Terms of Use
                      </span>{" "}
                      and{" "}
                      <span className="font-bold cursor-pointer text-black">
                        Privacy Policy
                      </span>
                    </span>
                  </label>
                </p> */}

                <BackNavigation />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
