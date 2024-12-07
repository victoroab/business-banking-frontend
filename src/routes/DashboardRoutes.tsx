import { Route } from "../interfaces/Global";
import Home from "../pages/Auth/Home";
import SignUp from "../pages/Auth/SignUp";
import TransactionPin from "../pages/Auth/TransactionPin";
import Passcode from "../pages/Auth/Passcode";
import ConfirmPasscode from "../pages/Auth/ConfirmPasscode";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import ConfirmTransactionPin from "../pages/Auth/ConfirmTransactionPin";

const authRoutes: Route[] = [
  { path: "/", name: "Home", element: <Home /> },
  { path: "/signup", name: "SignUp", element: <SignUp /> },
  { path: "/verify-otp", name: "VerifyOTP", element: <VerifyOtp /> },
  { path: "/passcode", name: "Passcode", element: <Passcode /> },
  {
    path: "/confirm-passcode",
    name: "Confirm Passcode",
    element: <ConfirmPasscode />,
  },
  {
    path: "/transaction-pin",
    name: "Transaction Pin",
    element: <TransactionPin />,
  },
  {
    path: "/transaction-pin",
    name: "Transaction Pin",
    element: <TransactionPin />,
  },
  {
    path: "/confirm-transaction-pin",
    name: "Confirm Transaction Pin",
    element: <ConfirmTransactionPin />,
  },
];
export default authRoutes;
