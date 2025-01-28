import { useEffect } from "react";
import {
  CameraIcon,
  GlassesIcon,
  LightIcon,
} from "../../../assets/svg/CustomSVGs";

import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../../utils";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";

declare global {
  interface Window {
    Connect: {
      new (options: any): {
        setup: () => void;
        open: () => void;
      };
    };
  }
}

const FaceVerification: React.FC = () => {
  const { userDetails } = useAppSelector(selectAuth);

  const navigate = useNavigate();
  useEffect(() => {
    const options = {
      app_id: import.meta.env.VITE_REACT_APP_DOJAH_APP_ID,
      p_key: import.meta.env.VITE_REACT_APP_P_KEY,
      type: "verification",
      user_data: {
        first_name: userDetails?.firstName,
        last_name: userDetails?.lastName,
        dob: userDetails?.dob,
        email: userDetails?.email,
      },
      metadata: {
        user_id: userDetails?.id,
      },
      config: {
        widget_id: import.meta.env.VITE_REACT_APP_DOJAH_WIDGET_ID,
      },
      onSuccess: function (response: { referenceId: string; message: string }) {
        console.log(response);
        // toast.success(response.message);
      },
      onError: function (err: unknown) {
        errorHandler(err);
      },
      onClose: function () {
        navigate("/kyb/residential-address");
      },
    };

    if (typeof window.Connect !== "undefined") {
      const connect = new window.Connect(options);

      const button = document.getElementById("button-connect");
      if (button) {
        button.addEventListener("click", () => {
          connect.setup();
          connect.open();
        });
      }
    }
  }, [navigate, userDetails]);

  return (
    <div className="flex flex-col gap-6 justify-center items-center ">
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

      <div className="flex justify-center  w-full gap-6">
        <button className="main-btn w-full" type="submit" id="button-connect">
          Continue
        </button>
      </div>
    </div>
  );
};

export default FaceVerification;
