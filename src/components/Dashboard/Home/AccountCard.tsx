import { BalanceIcon, CopyIcon, EyeIcon } from "../../../assets/svg/CustomSVGs";
import { AlertLogoIcon } from "../../../assets/svg/Sidebar";
import { copyToClipboard } from "../../../utils";
// import { AlertLogoIcon } from "../../../assets/svg/Sidebar";

interface CardProps {
  type: string;
  accountName?: string;
  accountNumber?: string;
}
const AccountCard = ({ type, accountName, accountNumber }: CardProps) => {
  return (
    <div className="rounded-lg py-4 px-6 bg-white items-center flex w-[48%] justify-between">
      <div className=" flex flex-col gap-4">
        {accountName !== undefined && accountNumber !== undefined && (
          <div className="items-center flex gap-2">
            <p
              className="text-greyColr font-workSans flex gap-2  items-center rounded-md px-2 py-1 leading-4 font-normal text-sm"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <AlertLogoIcon /> {accountName}
              <span className="text-sm font-medium text-pryColor">
                {accountNumber}
              </span>
            </p>
            <div
              className="rounded-full flex justify-center items-center p-2  cursor-pointer"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
              onClick={() => copyToClipboard(accountNumber as string)}
            >
              <CopyIcon />
            </div>
          </div>
        )}

        <p className="text-lightGreyColor font-workSans flex items-center gap-2 leading-4 font-medium text-base text-center">
          {type} Balance <EyeIcon />
        </p>
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          &#8358;0.00
        </h3>
      </div>

      <div className="">
        <BalanceIcon />
      </div>
    </div>
  );
};

export default AccountCard;
