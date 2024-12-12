import {
  BalanceIcon,
  CopyIcon,
  EyeIcon,
  NavListIcon,
} from "../../../assets/svg/CustomSVGs";

interface CardProps {
  type: string;
}
const AccountCard = ({ type }: CardProps) => {
  return (
    <div className="rounded-lg py-4 px-6 bg-white items-center flex w-[48%] justify-between">
      <div className=" flex flex-col gap-4">
        <div className="items-center flex gap-2">
          <p className="text-greyColr font-workSans shadow-sm flex gap-2  items-center rounded-md px-2 py-1 leading-4 font-normal text-sm">
            <NavListIcon /> Bamidele Akinyemi
            <span className="text-sm font-medium text-pryColor">
              1234567890
            </span>
          </p>
          <div className="rounded-full flex justify-center items-center p-2 shadow-sm cursor-pointer">
            <CopyIcon />
          </div>
        </div>

        <p className="text-lightGreyColor font-workSans flex items-center gap-2 leading-4 font-medium text-base text-center">
          {type} Balance <EyeIcon />
        </p>
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          #0.00
        </h3>
      </div>

      <div className="">
        <BalanceIcon />
      </div>
    </div>
  );
};

export default AccountCard;
