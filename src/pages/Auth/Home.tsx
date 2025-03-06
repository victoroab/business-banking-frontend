import { useNavigate } from "react-router-dom";
import { MobileIcon } from "../../assets/svg/Mobile";
import AuthLayout from "../../layout/AuthLayout";
import { useAppDispatch } from "../../hooks";
import { setHavePersonalAccount } from "../../store/slice/globalSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAccountStatus = (status: boolean) => {
    dispatch(setHavePersonalAccount(status));
    navigate("/signup");
  };
  return (
    <AuthLayout loginBtn terms={false}>
      <div className="text-center flex justify-center items-center flex-col">
        <MobileIcon />
        <div
          className="flex w-[600px] py-6 p-10 flex-col gap-4 rounded-md mb-4"
          style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
        >
          <div className="flex flex-col gap-3">
            <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
              Do You Have An Alert Account?
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-xs flex flex-col gap-2">
              {/* Yes? Great! You're one step closer to unlocking seamless business
              banking. */}
              Get an Alert business account faster and in less steps when you
              sign up using your personal Alert account.
            </p>
            <button
              className="main-btn w-full"
              type="submit"
              onClick={() => handleAccountStatus(true)}
            >
              Yes? Set Up Business Profile
            </button>
          </div>

          <div className="flex justify-center flex-col w-full gap-3">
            {/* <p className="text-greyColr font-workSans leading-4 font-normal text-xs flex flex-col gap-2">
              No? Tap “Create Account” to create your account .
            </p> */}
            <button
              className="yellow-frame-btn w-full"
              type="submit"
              onClick={() => handleAccountStatus(false)}
            >
              No? Create Account
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Home;
