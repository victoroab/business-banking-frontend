import {
  AppleStoreImage,
  GooglePlayStoreImage,
  SmallAppImage,
} from "../../../assets/svg/CustomSVGs";

const MobileAppsCard = () => {
  return (
    <div className="rounded-2xl flex justify-between items-center bg-pryColor p-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-white font-semibold text-[32px] font-bricolage leading-10">
          Get the Alert Mobile App – Banking at Your Fingertips
        </h3>
        <p className="text-white font-workSans leading-4 font-normal text-sm">
          Take your personal banking experience to the next level with the Alert
          mobile app! Manage your finances, track <br /> transactions, and stay
          in control—anytime, anywhere
        </p>
        <div className="flex gap-2">
          {" "}
          <GooglePlayStoreImage /> <AppleStoreImage />{" "}
        </div>
      </div>
      <SmallAppImage />
    </div>
  );
};

export default MobileAppsCard;
