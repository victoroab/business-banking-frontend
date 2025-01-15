import { RouteProps } from "../interfaces/Global";
import Home from "../pages/Auth/Home";
import SignUp from "../pages/Auth/SignUp";
import TransactionPin from "../pages/Auth/TransactionPin";
import Passcode from "../pages/Auth/Passcode";
import ConfirmPasscode from "../pages/Auth/ConfirmPasscode";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import ConfirmTransactionPin from "../pages/Auth/ConfirmTransactionPin";
import KYC from "../pages/Auth/KYC";
import SignIn from "../pages/Auth/SignIn/SignIn";
import SendMoney from "../pages/Dashboard/SendMoney/SendMoney";
import Transaction from "../pages/Dashboard/Transaction/Transaction";
import DashboardHome from "../pages/Dashboard/Home/Home";
import PayBills from "../pages/Dashboard/PayBills/PayBills";
import Cards from "../pages/Dashboard/Cards/Cards";
import Support from "../pages/Dashboard/Support/Support";
import Account from "../pages/Dashboard/Account/Account";
import NewBill from "../pages/Dashboard/PayBills/NewBill";
import NewTransaction from "../pages/Dashboard/SendMoney/NewTransaction";
import AirtimeData from "../pages/Dashboard/AirtimeData/AirtimeData";
import Pos from "../pages/Dashboard/POS/Pos";
import EmailAddress from "../pages/Auth/Email";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import Profile from "../pages/Auth/Profile";
import LoginPasscode from "../pages/Auth/SignIn/Passcode";
import Nationality from "../pages/Auth/Kyc/Nationality";
import IdVerification from "../pages/Auth/Kyc/IdVerification";
import FaceVerification from "../pages/Auth/Kyc/FaceRecognition";
import ResidentialAddress from "../pages/Auth/Kyc/ResidentialAddress";
import BusinessDetails from "../pages/Auth/Kyc/BusinessDetails";
import BusinessDocument from "../pages/Auth/Kyc/BusinessDocument";
import BusinessAddress from "../pages/Auth/Kyc/BusinessAddress";
import Attestation from "../pages/Auth/Kyc/Attestation";
import Beneficiaries from "../pages/Dashboard/Beneficiaries/Beneficiaries";
import Approvals from "../pages/Dashboard/Approvals/Approvals";
import NewBeneficiary from "../pages/Dashboard/Beneficiaries/NewBeneficiary";
import RequestCard from "../pages/Dashboard/Cards/RequestCard";
import VirtualCard from "../pages/Dashboard/Cards/VirtualCard";
import RequestPhysicalCard from "../pages/Dashboard/Cards/RequestPhysicalCard";
import DebitAccount from "../pages/Dashboard/SendMoney/DebitAccount";
import BankDetails from "../pages/Dashboard/SendMoney/BankDetails";
import Amount from "../pages/Dashboard/SendMoney/Amount";
import Confirmation from "../pages/Dashboard/SendMoney/Confirmation";
import Provider from "../pages/Dashboard/AirtimeData/NewTransaction/Provider";
import AddBeneficiary from "../pages/Dashboard/AirtimeData/NewTransaction/AddBeneficiary";
import AirtimeConfirmation from "../pages/Dashboard/AirtimeData/NewTransaction/Confirmation";
import AirtimePackage from "../pages/Dashboard/AirtimeData/NewTransaction/Package";
import Category from "../pages/Dashboard/PayBills/NewBill/Category";
import BillDebitAccount from "../pages/Dashboard/PayBills/NewBill/DebitAccount";
import PosDebitAccount from "../pages/Dashboard/POS/New/PosDebitAccount";
import DeviceType from "../pages/Dashboard/POS/New/DeviceType";
import Details from "../pages/Dashboard/POS/New/Details";
import DeliveryOption from "../pages/Dashboard/POS/New/DeliveryOption";
import PosConfirmation from "../pages/Dashboard/POS/New/PosConfirmation";
import UserCards from "../pages/Dashboard/Cards/UserCards";
import PhysicalCardDetails from "../pages/Dashboard/Cards/PhysicalCardDetails";
import VirtualCardDetails from "../pages/Dashboard/Cards/VirtualCardDetails";
import Upload from "../pages/Dashboard/Upload/Upload";
import BillProvider from "../pages/Dashboard/PayBills/NewBill/Provider";
import BillPackage from "../pages/Dashboard/PayBills/NewBill/Package";
import AddBillBeneficiary from "../pages/Dashboard/PayBills/NewBill/AddBeneficiary";
import BillAmount from "../pages/Dashboard/PayBills/NewBill/Amount";
import BillConfirmation from "../pages/Dashboard/PayBills/NewBill/Confirmation";

const authRoutes: RouteProps[] = [
  { path: "/", name: "Home", element: <Home /> },
  { path: "/signup", name: "SignUp", element: <SignUp /> },
  { path: "/verify-otp", name: "VerifyOTP", element: <VerifyOtp /> },
  { path: "/email-address", name: "Email", element: <EmailAddress /> },
  { path: "/verify-email", name: "Passcode", element: <VerifyEmail /> },
  { path: "/passcode", name: "Passcode", element: <Passcode /> },
  { path: "/signin-passcode", name: "Passcode", element: <LoginPasscode /> },
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
  { path: "/profile", name: "Profile", element: <Profile /> },
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
  { path: "/request-card", name: "Card", element: <RequestCard /> },
  { path: "/virtual-card", name: "Card", element: <VirtualCard /> },
  { path: "/cards", name: "Cards", element: <UserCards /> },
  { path: "/uploads", name: "Upload", element: <Upload /> },
  {
    path: "/physical-card-details",
    name: "Cards",
    element: <PhysicalCardDetails />,
  },
  {
    path: "/virtual-card-details",
    name: "Cards",
    element: <VirtualCardDetails />,
  },
  {
    path: "/request-physical-card",
    name: "Card",
    element: <RequestPhysicalCard />,
  },
  { path: "/support", name: "Home", element: <Support /> },
  { path: "/account", name: "Account", element: <Account /> },
  { path: "/pos", name: "Account", element: <Pos /> },
  { path: "/airtime-data", name: "Account", element: <AirtimeData /> },
  { path: "/approval", name: "Approval", element: <Approvals /> },
  { path: "/beneficiaries", name: "Beneficiaries", element: <Beneficiaries /> },
  {
    path: "/new-transaction",
    name: "Transaction",
    element: <NewTransaction />,
  },
  {
    path: "/new-beneficiary",
    name: "Beneficiary",
    element: <NewBeneficiary />,
  },
];

const kybRoutes: RouteProps[] = [
  {
    path: "nationality",
    name: "Nationality",
    element: <Nationality />,
  },
  {
    path: "identity",
    name: "BVN & NIN",
    element: <IdVerification />,
  },
  {
    path: "face-verification",
    name: "Face Verification",
    element: <FaceVerification />,
  },
  {
    path: "residential-address",
    name: "Residential Address",
    element: <ResidentialAddress />,
  },
  {
    path: "business-details",
    name: "Business Details",
    element: <BusinessDetails />,
  },
  {
    path: "business-documents",
    name: "Business Document",
    element: <BusinessDocument />,
  },
  {
    path: "business-address",
    name: "Business Address",
    element: <BusinessAddress />,
  },
  {
    path: "attestation",
    name: "Attestation",
    element: <Attestation />,
  },
];

const sendMoneyRoutes: RouteProps[] = [
  {
    path: "debit-account",
    name: "Debit Account",
    element: <DebitAccount />,
  },
  {
    path: "bank-details",
    name: "Bank Details",
    element: <BankDetails />,
  },
  {
    path: "amount",
    name: "Amount",
    element: <Amount />,
  },
  {
    path: "confirmation",
    name: "Confirmation",
    element: <Confirmation />,
  },
];

const airtimeDataRoutes: RouteProps[] = [
  {
    path: "debit-account",
    name: "Debit Account",
    element: <DebitAccount />,
  },
  {
    path: "bank-details",
    name: "Bank Details",
    element: <BankDetails />,
  },
  {
    path: "provider",
    name: "Provider",
    element: <Provider />,
  },
  {
    path: "amount",
    name: "Amount",
    element: <Amount />,
  },
  {
    path: "beneficiary",
    name: "Add beneficiary",
    element: <AddBeneficiary />,
  },
  {
    path: "package",
    name: "Select Package",
    element: <AirtimePackage />,
  },
  {
    path: "confirmation",
    name: "Confirmation",
    element: <AirtimeConfirmation />,
  },
];

const posRoutes: RouteProps[] = [
  {
    path: "debit-account",
    name: "Debit Account",
    element: <PosDebitAccount />,
  },
  {
    path: "device-type",
    name: "Select Device Type",
    element: <DeviceType />,
  },
  {
    path: "pos-details",
    name: "POS Details",
    element: <Details />,
  },
  {
    path: "delivery-option",
    name: "Delivery Option",
    element: <DeliveryOption />,
  },
  {
    path: "confirmation",
    name: "Confirmation",
    element: <PosConfirmation />,
  },
];

const payBillDataRoutes: RouteProps[] = [
  {
    path: "debit-account",
    name: "Debit Account",
    element: <BillDebitAccount />,
  },
  {
    path: "category",
    name: "Select Category",
    element: <Category />,
  },
  {
    path: "provider",
    name: "Provider",
    element: <BillProvider />,
  },
  {
    path: "amount",
    name: "Amount",
    element: <BillAmount />,
  },
  {
    path: "beneficiary",
    name: "Add beneficiary",
    element: <AddBillBeneficiary />,
  },
  {
    path: "package",
    name: "Select Package",
    element: <BillPackage />,
  },
  {
    path: "confirmation",
    name: "Confirmation",
    element: <BillConfirmation />,
  },
];

export {
  authRoutes,
  dashboardRoutes,
  kybRoutes,
  sendMoneyRoutes,
  posRoutes,
  airtimeDataRoutes,
  payBillDataRoutes,
};
