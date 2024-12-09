import { Layout } from "../interfaces/Global";
import { NavListIcon } from "../assets/svg/CustomSVGs";
import BackNavigation from "../components/ArrowBack/Back";

const AuthLayout: React.FC<Layout> = ({ children, loginBtn, terms }) => {
  return (
    <main className="border-red-950 h-screen w-full flex">
      <section className="flex flex-col w-1/2 bg-pryColor-Light px-20 py-6 justify-between">
        <div className="flex gap-2 item-center ">
          <NavListIcon />
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

        <p className="footer-text font-normal text-sm text-greyColr font-workSans leading-4">
          Alert MFB is licensed by the Central Bank of Nigeria. All deposits are
          insured by the NDIC.
        </p>
      </section>
      <section className="w-1/2 bg-white px-20 pt-4">
        {loginBtn && (
          <div className="flex justify-end">
            <button className="main-btn w-[160px]" type="submit">
              Log In
            </button>
          </div>
        )}
        <div className={loginBtn ? "" : "h-[100%] flex justify-end flex-col"}>
          <div
            className={
              loginBtn ? "" : "h-[90%] flex items-center flex-col shadow-lg"
            }
          >
            {children}

            {terms && (
              <div className="flex p-6 flex-col gap-8">
                <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                  By using Alert, you agree to our{" "}
                  <span className="font-bold cursor-pointer text-black">
                    Terms of Use
                  </span>{" "}
                  and{" "}
                  <span className="font-bold cursor-pointer text-black">
                    Privacy Policy
                  </span>
                </p>

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
