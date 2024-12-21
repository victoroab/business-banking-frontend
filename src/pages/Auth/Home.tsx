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
      <div className="text-center flex justify-center items-center flex-col mt-10 ">
        <MobileIcon />
        <div
          className="flex w-[500px] py-6 p-20 flex-col gap-6 rounded-md"
          style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
        >
          <div className="flex flex-col gap-1">
            <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
              Do You Have A Personal Alert Account?
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-xs">
              Get an Alert business account faster and in less steps <br /> when
              you sign up using your personal Alert account.
            </p>
          </div>

          <div className="flex justify-center  w-full gap-6">
            <button
              className="yellow-frame-btn w-1/2"
              type="submit"
              onClick={() => handleAccountStatus(false)}
            >
              No, I Don't
            </button>
            <button
              className="main-btn w-1/2"
              type="submit"
              onClick={() => handleAccountStatus(true)}
            >
              Yes, I do
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Home;
