import { useNavigate } from "react-router-dom";
import { MobileIcon } from "../../assets/svg/Mobile";
import AuthLayout from "../../layout/AuthLayout";

const Home = () => {
  const navigate = useNavigate();
  const handleAccountStatus = () => {
    navigate("/signup");
  };
  return (
    <AuthLayout loginBtn={true} terms={false}>
      <div className="text-center flex justify-center items-center flex-col">
        <MobileIcon />
        <div
          className="flex w-[600px] py-6 p-10 flex-col gap-4 rounded-md mb-4"
          style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
        >
          <div className="flex flex-col gap-3">
            <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
              Join Alert Business Today!
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-xs flex flex-col gap-2">
              {/* Yes? Great! You're one step closer to unlocking seamless business
              banking. */}
              Take control of your business with an all-in-one platform designed
              to simplify operations, track transactions, and boost growth. Sign
              up today and experience seamless business management!
            </p>
            <button
              className="main-btn w-full"
              type="submit"
              onClick={handleAccountStatus}
            >
              Get Started
            </button>
          </div>

          <div className="flex justify-center flex-col w-full gap-3">
            {/* <p className="text-greyColr font-workSans leading-4 font-normal text-xs flex flex-col gap-2">
              No? Tap “Create Account” to create your account .
            </p> */}
            <button
              className="yellow-frame-btn w-full"
              type="submit"
              // onClick={() => handleAccountStatus(false)}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Home;
