import AccountCard from "../../../components/Dashboard/Home/AccountCard";
import MobileAppsCard from "../../../components/Dashboard/Home/MobileAppsCard";
import QuickAction from "../../../components/Dashboard/Home/QuickAction";
import TransactionChart from "../../../components/Dashboard/Home/TransactionChart";
import TransactionHistory from "../../../components/Dashboard/Home/TransactionHistory";
import Navbar from "../../../components/Navbar/Navbar";
import { errorHandler, sampleData } from "../../../utils";
import { CautionIcon } from "../../../assets/svg/PayBill";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectAuth, setUserDetails } from "../../../store/slice/authSlice";
import {
  useGetBusinessKYBDetailsMutation,
  useUserProfileQuery,
} from "../../../service/kyb";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import AddEmail from "../../../components/Dashboard/Home/AddEmail";
import { selectGlobal } from "../../../store/slice/globalSlice";
import AddPhoneNumber from "../../../components/Dashboard/Home/AddPhoneNumber";
import { useGetAccountsMutation } from "../../../service/account";
import { useEffect, useState } from "react";
import {
  setAccountDetails,
  setBusinessKYBDetials,
} from "../../../store/slice/account";
import TransactionPin from "../../../components/Dashboard/Home/TransactionPin";

const Dashboard = () => {
  const navigate = useNavigate();
  // const { kybDetails } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { handleShow } = useGlobalHooks();
  const [withdrawableAmount, setWithdrawableAmount] = useState<any>();
  const toggle = useAppSelector(selectGlobal);
  const { data: profile } = useUserProfileQuery({});
  const [businessKYBDetails] = useGetBusinessKYBDetailsMutation();
  const [account] = useGetAccountsMutation();
  const { userDetails } = useAppSelector(selectAuth);

  const date = new Date();
  const handleFetchAccount = async () => {
    try {
      const response = await account().unwrap();
      setWithdrawableAmount(response?.data[0]);
      dispatch(setAccountDetails(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleFetchBusinessKYBDetails = async () => {
    try {
      const response = await businessKYBDetails().unwrap();
      dispatch(setBusinessKYBDetials(response?.data));
    } catch (error) {
      errorHandler(error);
    }
  };
  useEffect(() => {
    handleFetchAccount();
    handleFetchBusinessKYBDetails();
    dispatch(setUserDetails(profile?.data));
  }, []);

  const Greeting = () => {
    let hours = date.getHours();
    let greet;

    if (hours < 12) {
      greet = "Good Morning";
    } else if (hours >= 12 && hours <= 16) {
      greet = "Good Afternoon";
    } else if (hours >= 16 && hours <= 24) {
      greet = "Good Evening";
    }
    return greet;
  };

  return (
    <div className="border">
      <Navbar
        title={
          Greeting() +
          ", " +
          `${
            profile?.data?.firstName?.charAt(0).toUpperCase() +
            profile?.data?.firstName?.slice(1).toLowerCase()
          }`
        }
        subtitle="Here’s your dashboard overview."
      />
      {profile?.data?.kybStatus !== "APPROVED" && (
        <div className="flex justify-between bg-secColor p-3 mb-2 mx-10">
          <div className="flex text-white w-[80%] gap-2 items-center">
            <CautionIcon />
            <p className="text-white font-workSans leading-4 font-semibold text-sm">
              Thank you for choosing Alert as your preferred banking platform!
              To fully activate your account and enable secure transactions, it
              is mandatory to complete your Know Your Business(KYB)
              verification.
            </p>
          </div>
          <button
            className="white-btn"
            onClick={() => navigate("/kyb/identity")}
          >
            Complete KYB
          </button>
        </div>
      )}

      {profile?.data?.email === null && (
        <div className="flex justify-between bg-secColor p-3 mb-2 mx-10">
          <div className="flex text-white w-[70%] gap-2 items-center">
            <CautionIcon />
            <p className="text-white font-workSans leading-4 font-semibold text-sm">
              Hi, {profile?.data?.firstName}! You currently don’t have an email
              address linked to your account. Click the button to add your email
              address.
            </p>
          </div>
          <button className="white-btn" onClick={() => handleShow("add-email")}>
            Add Email Address
          </button>
        </div>
      )}

      {profile?.data?.phoneNumber === null && (
        <div className="flex justify-between bg-secColor p-3 mb-2 mx-10">
          <div className="flex justify-between text-white w-[70%] gap-4 items-center">
            <CautionIcon />
            <p className="text-white font-workSans leading-4 font-semibold text-sm">
              Hi, {profile?.data?.firstName}! You currently don’t have a phone
              number linked to your account. Click the button to add your phone
              number.
            </p>
          </div>
          <button className="white-btn" onClick={() => handleShow("add-phone")}>
            Add Phone Number
          </button>
        </div>
      )}
      <div className="px-10 flex flex-col gap-10 pb-14">
        <MobileAppsCard />
        <div className="justify-between flex items-center">
          <AccountCard
            type="Account"
            accountName={withdrawableAmount?.accountName}
            accountNumber={withdrawableAmount?.accountNumber}
            balance={
              withdrawableAmount?.withdrawableAmount !== undefined
                ? withdrawableAmount?.withdrawableAmount
                : 0
            }
          />
          <AccountCard type="POS" balance={"0"} />
        </div>
        <QuickAction />
        <div className="flex gap-10 items-center">
          <TransactionChart
            data={sampleData}
            withdrawableAmount={
              withdrawableAmount?.withdrawableAmount as string
            }
          />
          <TransactionHistory />
        </div>
      </div>
      {toggle["add-email"] && <AddEmail />}
      {toggle["add-phone"] && <AddPhoneNumber />}

      {userDetails !== undefined && !userDetails?.isPinSet && (
        <TransactionPin />
      )}
    </div>
  );
};

export default Dashboard;
