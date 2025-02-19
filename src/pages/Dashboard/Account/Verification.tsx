import { accountVerificationOptions } from "../../../utils";

const Verification = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Verification
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {accountVerificationOptions.map((option: any, index) => (
          <div
            className="account-option flex cursor-pointer rounded-xl p-6 gap-4 items-center justify-between"
            style={{
              boxShadow: "0px 1px 7px 5px rgba(216, 216, 216, 0.2)",
            }}
            key={index}
            // onClick={() => handleNavigate(option?.shortCode as string)}
          >
            <div className="flex">
              <div
                className="flex items-center justify-center w-[40px] h-[40px] p-2 rounded-sm"
                style={{ backgroundColor: option?.iconBg }}
              >
                {<option.icon />}
              </div>
              <div className="flex items-center justify-between ">
                <h2 className="text-base font-medium text-lightGreyColor m-0 font-workSans">
                  {option?.title}
                </h2>
              </div>
            </div>

            <p
              className={`${
                option?.status === "Verified"
                  ? "bg-positive-Light text-positive"
                  : option?.status === "Unverified"
                  ? "bg-nagative-Light text-nagative"
                  : "bg-secColor-Light text-secColor"
              } px-2 py-1`}
            >
              {option?.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Verification;
