import {
  CameraIcon,
  GlassesIcon,
  LightIcon,
} from "../../../assets/svg/CustomSVGs";

import { useNavigate } from "react-router-dom";

interface Window {
  dojah: {
    init: (config: {
      widget_id: string;
      user_data?: Record<string, string>;
      gov_data?: Record<string, string>;
      onSuccess?: (data: any) => void;
      onClose?: () => void;
      onError?: (error: any) => void;
    }) => { open: () => void };
  };
}

const FaceVerification: React.FC = () => {
  // const navigate = useNavigate();

  const handleButtonClick = () => {
    if (typeof window.dojah === "undefined") {
      alert(
        "The Dojah widget failed to load. Please refresh the page and try again."
      );
      return;
    }

    const widget = window.dojah.init({
      widget_id: "67935812ab804ca5b9037717",
      user_data: {
        first_name: "test",
        last_name: "test",
        dob: "1889-04-04",
      },
      gov_data: {
        nin: "1223445555",
        bvn: "2222222222",
      },
      onSuccess: (data) => {
        console.log("Success:", data);
      },
      onClose: () => {
        console.log("Widget closed");
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });

    widget.open();
  };
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div className="rounded-full p-6 w-[138px] h-[138px] bg-[#fdfbf6] flex justify-center items-center">
        <CameraIcon />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Verify Your Identity with a Photo
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm text-center">
          We need to match your face with your provided information to
          <br /> ensure your account’s security. Please follow the guidelines
          below <br />
          for a successful capture.
        </p>
      </div>

      <div className="border-dashed p-6 bg-pryColor-Light flex flex-col border gap-4 rounded-xl w-[100%]">
        <div className="flex gap-4 items-center">
          <LightIcon />
          <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
            Make sure you are in a brightly lit space
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <GlassesIcon />
          <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
            Take off glasses, hats, face masks, or any coverings that obscure
            your face
          </p>
        </div>
      </div>

      <div className="flex justify-center w-full gap-6">
        <button
          className="main-btn w-full"
          type="submit"
          aria-label="Continue to face verification"
          onClick={handleButtonClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FaceVerification;
