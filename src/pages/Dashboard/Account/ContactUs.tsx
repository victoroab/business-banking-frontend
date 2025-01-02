import {
  AddressIcon,
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  LiveChatIcon,
  PhoneIcon,
  TwitterIcon,
} from "../../../assets/svg/Accout";

const ContactUs = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Contact Us
        </h3>

        <div
          className="p-6 gap-4 rounded-md items-center flex flex-col w-full"
          style={{
            boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
          }}
        >
          <div className="flex gap-2 w-full items-center">
            <AddressIcon />
            <div className="flex flex-col items-start justify-start">
              <p className="text-greyColr font-workSans font-normal">Address</p>
              <p className="text-[13px] text-lightGreyColor font-workSans font-normal">
                123, Herbert Macaulay Way, Yaba, Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-4 gap-4 rounded-md items-center flex flex-col w-full"
          style={{
            boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
          }}
        >
          <div className="flex gap-2 w-full items-center">
            <PhoneIcon />

            <p className="text-greyColr font-workSans font-normal">
              09012345678
            </p>
          </div>
          <div className="flex gap-2 w-full items-center">
            <EmailIcon />

            <p className="text-greyColr font-workSans font-normal">
              customercare@alertmfb.com.ng
            </p>
          </div>
          <div className="flex gap-2 w-full items-center">
            <LiveChatIcon />
            <div className="flex flex-col items-start justify-start">
              <p className="text-greyColr font-workSans font-normal">
                Live chat
              </p>
              <p className="text-[13px] text-lightGreyColor font-workSans font-normal">
                Start a conversation
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-4 gap-4 rounded-md items-center flex flex-col w-full"
          style={{
            boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
          }}
        >
          <div className="flex gap-2 w-full items-center">
            <FacebookIcon />

            <p className="text-greyColr font-workSans font-normal">Facebook</p>
          </div>
          <div className="flex gap-2 w-full items-center">
            <InstagramIcon />

            <p className="text-greyColr font-workSans font-normal">Instagram</p>
          </div>
          <div className="flex gap-2 w-full items-center">
            <TwitterIcon />

            <p className="text-greyColr font-workSans font-normal">Twwitter</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
