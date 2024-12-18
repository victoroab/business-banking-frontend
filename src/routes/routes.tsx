import { RouteProps } from "../interfaces/Global";
import Home from "../pages/Auth/Home";
import SignUp from "../pages/Auth/SignUp";
import TransactionPin from "../pages/Auth/TransactionPin";
import Passcode from "../pages/Auth/Passcode";
import ConfirmPasscode from "../pages/Auth/ConfirmPasscode";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import ConfirmTransactionPin from "../pages/Auth/ConfirmTransactionPin";
import KYC from "../pages/Auth/KYC";
import SignIn from "../pages/Auth/SignIn";
import SendMoney from "../pages/Dashboard/SendMoney/SendMoney";
import Transaction from "../pages/Dashboard/Transaction/Transaction";
import DashboardHome from "../pages/Dashboard/Home/Home";
import PayBills from "../pages/Dashboard/PayBills/PayBills";
import Cards from "../pages/Dashboard/Cards/Cards";
import Support from "../pages/Dashboard/Support/Support";
import Account from "../pages/Dashboard/Account/Account";
import NewBill from "../pages/Dashboard/PayBills/NewBill";
import NewTransaction from "../pages/Dashboard/SendMoney/NewTransaction";

const authRoutes: RouteProps[] = [
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
  {
    path: "/kyc",
    name: "Know Your Customer",
    element: <KYC />,
  },
  {
    path: "/login",
    name: "Login",
    element: <SignIn />,
  },
];

const dashboardRoutes: RouteProps[] = [
  { path: "/dashboard", name: "Home", element: <DashboardHome /> },
  { path: "/transactions", name: "Transactions", element: <Transaction /> },
  { path: "/send-money", name: "Send Money", element: <SendMoney /> },
  { path: "/pay-bills", name: "Home", element: <PayBills /> },
  { path: "/pay-new-bill", name: "Home", element: <NewBill /> },
  { path: "/card", name: "Home", element: <Cards /> },
  { path: "/support", name: "Home", element: <Support /> },
  { path: "/account", name: "Account", element: <Account /> },
  {
    path: "/new-transaction",
    name: "Transaction",
    element: <NewTransaction />,
  },
];

export { authRoutes, dashboardRoutes };
