import { isWithinInterval, subMonths, subWeeks } from "date-fns";
import {
  AirtimeActionIcon,
  BankIcon,
  NINIcon,
  PayBillActionIcon,
  TransactionArrowDownIcon,
  TransactionElectricityIcon,
  TransferActionIcon,
} from "../assets/svg/CustomSVGs";
import {
  DataItem,
  IDOption,
  ProgressStepsProps,
  RowDataProps,
} from "../interfaces/Global";
import { BettingIcon, CableIcon, ElectricityIcon } from "../assets/svg/PayBill";
import { Dispatch, SetStateAction } from "react";
import {
  AirtelIcon,
  GLOIcon,
  MobileIcon,
  MTNIcon,
} from "../assets/svg/Airtime";
import { toast } from "react-toastify";
import { persistor } from "../store/store";
import { saveUserInfo } from "../store/slice/authSlice";

export const manageBeneficiaryHeader = [
  { id: 1, title: "Transfer" },
  { id: 2, title: "Airtime & Data" },
  { id: 3, title: "Bills" },
];

export const documentFormats = [
  { id: 1, format: "PDF", logoImage: "https://example.com/logos/pdf-logo.png" },
  {
    id: 2,
    format: "Word",
    logoImage: "https://example.com/logos/word-logo.png",
  },
  {
    id: 3,
    format: "Excel",
    logoImage: "https://example.com/logos/excel-logo.png",
  },
  {
    id: 4,
    format: "PowerPoint",
    logoImage: "https://example.com/logos/powerpoint-logo.png",
  },
  {
    id: 5,
    format: "Text",
    logoImage: "https://example.com/logos/text-logo.png",
  },
];

export const securityQuestions = [
  { id: 1, question: "What was the name of your first pet?" },
  { id: 2, question: "What is your mother's maiden name?" },
  { id: 3, question: "What was the make and model of your first car?" },
  { id: 4, question: "What is the name of the town where you were born?" },
  { id: 5, question: "What was your childhood best friend's name?" },
];

export const KYCProgressSteps: ProgressStepsProps[] = [
  // {
  //   id: 1,
  //   link: "nationality",
  //   title: "Nationality",
  // },
  {
    id: 1,
    link: "identity",
    title: "BVN & NIN",
  },
  {
    id: 2,
    link: "face-verification",
    title: "Face Verification",
  },
  {
    id: 3,
    link: "residential-address",
    title: "Residential Address",
  },
  {
    id: 4,
    link: "business-details",
    title: "Business Details",
  },
  {
    id: 5,
    link: "business-documents",
    title: "Business Document",
  },
  {
    id: 6,
    link: "business-address",
    title: "Business Address",
  },
  {
    id: 7,
    link: "attestation",
    title: "Attestation",
  },
];

export const accountOptions: IDOption[] = [
  {
    icon: BankIcon,
    iconBg: "#f5f5f9",
    title: "Bank Verification Number (BVN)",
    shortCode: "BVN",
  },
  {
    icon: NINIcon,
    iconBg: "#f6fcf9",
    title: "National Identification Number (NIN)",
    shortCode: "NIN",
  },
];

export const payBillOptions: IDOption[] = [
  {
    icon: ElectricityIcon,
    iconBg: "#f5f5f9",
    title: "Electricity",
  },
  {
    icon: CableIcon,
    iconBg: "#f6fcf9",
    title: "Cable TV",
  },
  {
    icon: BettingIcon,
    iconBg: "#f6fcf9",
    title: "Betting",
  },
];

export const AccountTypes: ProgressStepsProps[] = [
  {
    id: 1,
    title: "BVN",
  },
  {
    id: 2,
    title: "NIN",
  },
];

export const quickActions = [
  {
    id: 1,
    icon: TransferActionIcon,
    title: "Transfer",
    desc: "Send money to anyone",
    navigation: "/send-money",
  },
  {
    id: 2,
    icon: AirtimeActionIcon,
    title: "Airtime and Data",
    desc: "Recharge your mobile lines",
    navigation: "/utility",
  },
  {
    id: 3,
    icon: PayBillActionIcon,
    title: "Pay Bills",
    desc: "Renew your DSTV subscription",
    navigation: "/utility/pay-bills",
  },
];

export const transactionHistory = [
  {
    id: 1,
    amount: "10,000.00",
    status: "DEBIT",
    icon: TransactionElectricityIcon,
    purpose: "Electricity",
    time: "10:30PM",
    date: "Dec 31, 2024",
  },
  {
    id: 2,
    amount: "20,000.00",
    status: "CREDIT",
    icon: TransactionArrowDownIcon,
    purpose: "Salary",
    time: "09:00AM",
    date: "Dec 31, 2024",
  },
  {
    id: 3,
    amount: "5,000.00",
    status: "DEBIT",
    icon: TransactionElectricityIcon,
    purpose: "Grocery",
    time: "11:45AM",
    date: "Dec 30, 2024",
  },
  {
    id: 4,
    amount: "3,000.00",
    status: "CREDIT",
    icon: TransactionArrowDownIcon,
    purpose: "Refund",
    time: "02:15PM",
    date: "Dec 29, 2024",
  },
  {
    id: 5,
    amount: "15,000.00",
    status: "DEBIT",
    icon: TransactionElectricityIcon,
    purpose: "Rent",
    time: "08:00AM",
    date: "Dec 28, 2024",
  },
  {
    id: 6,
    amount: "1,000.00",
    status: "CREDIT",
    icon: TransactionArrowDownIcon,
    purpose: "Cashback",
    time: "04:30PM",
    date: "Dec 27, 2024",
  },
  {
    id: 7,
    amount: "4,500.00",
    status: "DEBIT",
    icon: TransactionElectricityIcon,
    purpose: "Dining",
    time: "07:00PM",
    date: "Dec 26, 2024",
  },
  {
    id: 8,
    amount: "8,000.00",
    status: "CREDIT",
    icon: TransactionArrowDownIcon,
    purpose: "Freelance Payment",
    time: "10:00AM",
    date: "Dec 25, 2024",
  },
  {
    id: 9,
    amount: "2,500.00",
    status: "DEBIT",
    icon: TransactionElectricityIcon,
    purpose: "Shopping",
    time: "03:30PM",
    date: "Dec 24, 2024",
  },
  {
    id: 10,
    amount: "12,000.00",
    status: "CREDIT",
    icon: TransactionArrowDownIcon,
    purpose: "Gift",
    time: "12:00PM",
    date: "Dec 23, 2024",
  },
];

export const getLastMonthData = (array: DataItem[]): DataItem[] => {
  const today = new Date();
  const priorMonth = subMonths(today, 1);

  return array.filter((item) =>
    isWithinInterval(new Date(item.createdAt), {
      start: priorMonth,
      end: today,
    })
  );
};

export const getLastWeekData = (array: DataItem[]): DataItem[] => {
  const today = new Date();
  const priorWeek = subWeeks(today, 1);

  return array.filter((item) =>
    isWithinInterval(new Date(item.createdAt), {
      start: priorWeek,
      end: today,
    })
  );
};

export const sampleData = [
  { createdAt: "2025-02-01T08:30:00Z", income: 1200 },
  { createdAt: "2025-02-02T12:15:00Z", income: 1500 },
  { createdAt: "2025-02-03T08:30:00Z", income: 1200 },
  { createdAt: "2025-02-03T12:15:00Z", income: 1500 },
  { createdAt: "2025-01-28T14:45:00Z", income: 1000 },
  { createdAt: "2025-01-25T09:10:00Z", income: 800 },
  { createdAt: "2025-01-29T16:30:00Z", income: 1600 },
  { createdAt: "2025-01-01T11:00:00Z", income: 1400 },
  { createdAt: "2025-01-09T10:30:00Z", income: 1100 },
  { createdAt: "2025-01-31T13:15:00Z", income: 1300 },
  { createdAt: "2025-01-24T07:45:00Z", income: 1700 },
  { createdAt: "2025-01-30T15:00:00Z", income: 900 },
];

export const filterList = [
  // { value: "week", name: "Weekly" },
  { value: "month", name: "1M" },
  { value: "three", name: "3M" },
  { value: "six", name: "6M" },
  { value: "yearly", name: "1Y" },
];

export const typeList = [
  { value: "income", name: "Income" },
  { value: "expenses", name: "Expenses" },
];

export const attestation = [
  { id: 1, title: "Business Details", navigate: "/kyb/business-details" },
  { id: 2, title: "Business Documents", navigate: "/kyb/business-documents" },
  { id: 3, title: "Business Address", navigate: "/kyb/business-address" },
];

export const newBillProgressSteps: ProgressStepsProps[] = [
  {
    id: 1,
    link: "debit-account",
    title: "Select Debit Account",
  },
  {
    id: 2,
    link: "category",
    title: "Select a Category",
  },
  {
    id: 3,
    link: "provider",
    title: "Select Provider",
  },
  {
    id: 4,
    link: "package",
    title: "Select Package",
  },
  {
    id: 5,
    link: "beneficiary",
    title: "Add Beneficiary",
  },
  {
    id: 6,
    link: "amount",
    title: "Amount",
  },
  {
    id: 7,
    link: "confirmation",
    title: "Confirmation",
  },
];

export const electricityProvider: IDOption[] = [
  {
    icon: ElectricityIcon,
    iconBg: "#f5f5f9",
    title: "Abuja Electricity Distribution",
    package: [
      {
        title: "Abuja Electricity Distribution",
      },
      {
        title: "Gbagbawalada Electricity Distribution",
      },
      {
        title: "FCT Electricity Distribution",
      },
      {
        title: "Jabi Electricity Distribution",
      },
    ],
  },
  {
    icon: CableIcon,
    iconBg: "#f6fcf9",
    title: "Oyo Electricity Distribution",
    package: [
      {
        title: "Ibadan Electricity Distribution",
      },
      {
        title: "Oyo Electricity Distribution",
      },
      {
        title: "Iwo Electricity Distribution",
      },
      {
        title: "Akobo Electricity Distribution",
      },
      {
        title: "Ede Electricity Distribution",
      },
    ],
  },
  {
    icon: BettingIcon,
    iconBg: "#f6fcf9",
    title: "Lagos Electricity Distribution",
    package: [
      {
        title: "Ikeja Electricity Distribution",
      },
      {
        title: "Yaba Electricity Distribution",
      },
      {
        title: "Mayland Electricity Distribution",
      },
      {
        title: "Lekki Electricity Distribution",
      },
      {
        title: "Berger Electricity Distribution",
      },
    ],
  },
  {
    icon: BettingIcon,
    iconBg: "#f6fcf9",
    title: "Ondo Electricity Distribution",
    package: [
      {
        title: "Akure Electricity Distribution",
      },
      {
        title: "Owo Electricity Distribution",
      },
      {
        title: "Ondo Electricity Distribution",
      },
      {
        title: "Ore Electricity Distribution",
      },
    ],
  },
];

export const bettingProvider: IDOption[] = [
  {
    icon: ElectricityIcon,
    iconBg: "#f5f5f9",
    title: "Sporty Bet",
  },
  {
    icon: CableIcon,
    iconBg: "#f6fcf9",
    title: "Bet9ja",
  },
  {
    icon: BettingIcon,
    iconBg: "#f6fcf9",
    title: "KIWI Bet",
  },
  {
    icon: BettingIcon,
    iconBg: "#f6fcf9",
    title: "Sure Bet",
  },
];

export const cableProvider: IDOption[] = [
  {
    icon: ElectricityIcon,
    iconBg: "#f5f5f9",
    title: "DSTV",
  },
  {
    icon: CableIcon,
    iconBg: "#f6fcf9",
    title: "GoTV",
  },
  {
    icon: BettingIcon,
    iconBg: "#f6fcf9",
    title: "Startimes",
  },
  {
    icon: BettingIcon,
    iconBg: "#f6fcf9",
    title: "Showmax",
  },
];

export const newTransaction: ProgressStepsProps[] = [
  {
    id: 1,
    link: "debit-account",
    title: "Select Debit Account",
  },
  {
    id: 2,
    link: "bank-details",
    title: "Bank Details",
  },
  {
    id: 3,
    link: "amount",
    title: "Amount",
  },

  {
    id: 4,
    link: "option",
    title: "Delivery Option",
  },
  {
    id: 5,
    link: "confirmation",
    title: "Confirmation",
  },
];

export const airtimeStep: ProgressStepsProps[] = [
  {
    id: 1,
    link: "debit-account",
    title: "Select Debit Account",
  },

  {
    id: 2,
    link: "amount",
    title: "Amount",
  },
  {
    id: 3,
    link: "provider",
    title: "Select Provider",
  },
  {
    id: 4,
    link: "beneficiary",
    title: "Add Beneficiary",
  },
  {
    id: 5,
    link: "confirmation",
    title: "Confirmation",
  },
];
export const dataStep: ProgressStepsProps[] = [
  {
    id: 1,
    link: "debit-account",
    title: "Select Debit Account",
  },
  {
    id: 2,
    link: "provider",
    title: "Select Provider",
  },
  {
    id: 3,
    link: "package",
    title: "Select Packge",
  },
  {
    id: 4,
    link: "beneficiary",
    title: "Add Beneficiary",
  },
  {
    id: 5,
    link: "confirmation",
    title: "Confirmation",
  },
];

export const androidStep: ProgressStepsProps[] = [
  {
    id: 1,
    link: "debit-account",
    title: "Select Debit Account",
  },
  {
    id: 2,
    link: "device-type",
    title: "Select Device Type",
  },
  {
    id: 3,
    link: "pos-details",
    title: "Enter POS Details",
  },
  {
    id: 4,
    link: "delivery-option",
    title: "Select Delivery Option",
  },
  {
    id: 5,
    link: "confirmation",
    title: "Confirmation",
  },
];
// export const analogStep: ProgressStepsProps[] = [
//   {
//     id: 1,
//     link: "debit-account",
//     title: "Select Debit Account",
//   },
//   {
//     id: 2,
//     link: "pos-details",
//     title: "Enter POS Details",
//   },
//   {
//     id: 3,
//     link: "delivery-package",
//     title: "Select Delivery Option",
//   },
//   {
//     id: 4,
//     link: "confirmation",
//     title: "Confirmation",
//   },
// ];
export const tableCustomStyles = {
  headCells: {
    style: {
      color: "var(--Grey1)",
      fontWeight: 600,
      backgroundColor: "#F6F6F7",
      fontSize: 14,
      display: "flex",
      justifyContent: "center",
    },
  },
  cells: {
    style: {
      color: "#352F36",
      fontSize: "14px",
      fontWeight: "400",
      display: "flex",
      verticalAlign: "middle",
      padding: "30px 10px",
      justifyContent: "center",
    },
  },
  columns: {
    0: {
      style: {
        textAlign: "left",
        border: "solid red 2px !important",
        display: "flex",
        justifyContent: "start !important",
      },
    },
  },
};

export const transactionsData: RowDataProps[] = [
  {
    id: 1,
    sender: "Bamidele",
    beneficiary: "Remilekun Olaniyan",
    bank: "Union Bank",
    amount: 10000.5,
    transactionType: "Airtime",
    status: "successful",
    createdAt: "2024-12-15T14:30:00Z",
  },
  {
    id: 2,

    sender: "Bamidele ",
    beneficiary: "Remilekun Olaniyan",
    bank: "First Bank",
    amount: 2500.0,
    transactionType: "Airtime",
    status: "successful",
    createdAt: "2024-12-17T09:45:00Z",
  },
  {
    id: 3,
    sender: "Bamidele",
    beneficiary: "Remilekun Olaniyan",
    bank: "Unity Bank",
    amount: 5000.75,
    transactionType: "Airtime",
    status: "failed",
    createdAt: "2024-12-18T12:00:00Z",
  },
  {
    id: 4,
    sender: "Bamidele",
    beneficiary: "Remilekun Olaniyan",
    bank: "Wells Fargo",
    amount: 300.0,
    transactionType: "Airtime",
    status: "successful",
    createdAt: "2024-12-18T13:00:00Z",
  },
  {
    id: 5,
    sender: "Bamidele",
    beneficiary: "Remilekun Olaniyan",
    bank: "Unity Bank",
    amount: 1500.0,
    transactionType: "Airtime",
    status: "failed",
    createdAt: "2024-12-19T10:30:00Z",
  },
  {
    id: 6,
    sender: "Bamidele",
    beneficiary: "Remilekun Olaniyan",
    bank: "Unity Bank",
    amount: 100.5,
    transactionType: "Airtime",
    status: "successful",
    createdAt: "2024-12-15T14:30:00Z",
  },
  {
    id: 7,
    sender: "Bamidele",
    beneficiary: "Remilekun Olaniyan",
    bank: "Alert Bank",
    amount: 2500.0,
    transactionType: "Airtime",
    status: "successful",
    createdAt: "2024-12-17T09:45:00Z",
  },
];

export const billlData: RowDataProps[] = [
  {
    id: 1,
    sender: "Bamidele",
    beneficiary: "Remilekun Olaniyan",
    bank: "Union Bank",
    amount: 10000.5,
    transactionType: "DSTV",
    status: "successful",
    createdAt: "2024-12-15T14:30:00Z",
  },
  {
    id: 2,

    sender: "Bamidele ",
    beneficiary: "Remilekun Olaniyan",
    bank: "First Bank",
    amount: 2500.0,
    transactionType: "GoTV",
    status: "successful",
    createdAt: "2024-12-17T09:45:00Z",
  },
  {
    id: 3,
    sender: "Bamidele",
    beneficiary: "Remilekun Olaniyan",
    bank: "Unity Bank",
    amount: 5000.75,
    transactionType: "Bet9ja",
    status: "failed",
    createdAt: "2024-12-18T12:00:00Z",
  },
];

export const industries = [
  { id: 1, industry: "Financial technology" },
  { id: 2, industry: "Ecommerce" },
  { id: 3, industry: "Education" },
  { id: 4, industry: "Health" },
  { id: 5, industry: "Technology" },
];

export const companyType = [
  { id: 1, type: "COMPANY" },
  { id: 2, type: "BUSINESS_NAME" },
  { id: 3, type: "INCORPORATED_TRUSTESS" },
  { id: 4, type: "LIMITED_PARTNERSHIP" },
  { id: 5, type: "LIMITED_LIABILITY_PARTNERSHIP" },
];

export const companySize = [
  { id: 1, size: "1-100" },
  { id: 2, size: "101-200" },
  { id: 3, size: "201-300" },
];

export const companyEntity = [
  { id: 1, entity: "Sole Proprietorship" },
  { id: 2, entity: "Partnership" },
  { id: 3, entity: "Corporation" },
  { id: 4, entity: "Limited Liability Company (LLC)" },
  { id: 5, entity: "Cooperative" },
  { id: 6, entity: "Nonprofit Organization" },
];

export const annualIncome = [
  { id: 1, income: "100,000-1,000,000" },
  { id: 2, income: "1,000,000-10,000,000" },
  { id: 3, income: "10,000,000-100,000,000" },
];

export const accountSettingsSteps: ProgressStepsProps[] = [
  {
    id: 1,
    title: "Profile",
  },
  {
    id: 2,
    title: "Verification",
  },
  {
    id: 3,
    title: "Transaction Limit",
  },
  {
    id: 4,
    title: "Notification Preferences",
  },
  {
    id: 5,
    title: "Reset Passcode",
  },
  {
    id: 6,
    title: "Set Transaction PIN",
  },
  {
    id: 7,
    title: "Security Question",
  },
  {
    id: 8,
    title: "Bank Statement",
  },
  {
    id: 9,
    title: "Manage Beneficiaries",
  },
  {
    id: 10,
    title: "Device Management",
  },
  {
    id: 11,
    title: "Contact US",
  },
  {
    id: 12,
    title: "Terms and Conditions",
  },
  {
    id: 13,
    title: "Visit our Website",
  },
];

export const accountVerificationOptions: IDOption[] = [
  {
    icon: BankIcon,
    iconBg: "#f5f5f9",
    status: "Verified",
    title: "Bank Verification Number (BVN)",
  },
  {
    icon: NINIcon,
    iconBg: "#f6fcf9",
    status: "Unverified",
    title: "National Identification Number (NIN)",
  },
  {
    icon: NINIcon,
    iconBg: "#f6fcf9",
    status: "Pending",
    title: "Address Verification",
  },
];

export const creditPreference = [
  {
    id: 1,
    title: "Payment (Credit)",
    subText: "Notifications for credits into you account from transfers, etc",
  },
  { id: 2, title: "Email" },
  { id: 3, title: "Push" },
  { id: 4, title: "Whatsapp" },
  { id: 5, title: "SMS", subText: "*Charges apply - Each SMMS alert costs" },
];

export const debitPreference = [
  {
    id: 1,
    title: "Payment (Debit)",
    subText: "Notifications for debits into you account from transfers, etc",
  },
  { id: 2, title: "Email" },
  { id: 3, title: "Push" },
  { id: 4, title: "Whatsapp" },
  { id: 5, title: "SMS", subText: "*Charges apply - Each SMMS alert costs" },
];

export const handleFileUpload = (
  setBase64Document: Dispatch<SetStateAction<string>>,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    const base64String = reader.result as string;
    setBase64Document(base64String);
  };

  reader.readAsDataURL(file);
};

export const dataProvider: IDOption[] = [
  {
    icon: MTNIcon,
    iconBg: "#f5f5f9",
    title: "MTN",
  },
  {
    icon: GLOIcon,
    iconBg: "#f6fcf9",
    title: "Glo",
  },
  {
    icon: MobileIcon,
    iconBg: "#f6fcf9",
    title: "9Mobile",
  },
  {
    icon: AirtelIcon,
    iconBg: "#f6fcf9",
    title: "Airtel",
  },
];

export const dataPackage: IDOption[] = [
  {
    shortCode: "1",
    title: "2.5GB for 2 Days NGN 600.00",
  },
  {
    shortCode: "2",
    title: "2.5GB for 2 Days NGN 600.00",
  },
  {
    shortCode: "3",
    title: "2.5GB for 2 Days NGN 600.00",
  },
  {
    shortCode: "4",
    title: "2.5GB for 2 Days NGN 600.00",
  },
];

export const posDevice: IDOption[] = [
  {
    shortCode: "Free",
    title: "Android",
  },
  {
    shortCode: "Free",
    title: "Analog",
  },
];

export const uploadHeader = [
  { id: 1, title: "Bulk Payment", link: "/send-money/uploads/debit-account" },
  { id: 2, title: "Bulk Airtime", link: "/send-money/uploads/debit-account" },
  { id: 3, title: "Bulk Data", link: "/send-money/uploads/debit-account" },
  {
    id: 4,
    title: "Pension Upload",
    link: "/send-money/uploads/employer-details",
  },
  {
    id: 5,
    title: "Beneficiaries List",
    link: "/send-money/uploads/upload-file",
  },
];

export const bulkPayment: ProgressStepsProps[] = [
  {
    id: 1,
    link: "debit-account",
    title: "Select Debit Account",
  },
  {
    id: 2,
    link: "payment-mode",
    title: "Select Payment Mode",
  },
  {
    id: 3,
    link: "payment-date",
    title: "Add Payment Due Date",
  },
  {
    id: 4,
    link: "upload-file",
    title: "Upload File",
  },
];

export const bulkAirtime: ProgressStepsProps[] = [
  {
    id: 1,
    link: "debit-account",
    title: "Select Debit Account",
  },
  {
    id: 2,
    link: "payment-date",
    title: "Add Payment Due Date",
  },
  {
    id: 3,
    link: "upload-file",
    title: "Upload File",
  },
];

export const bulkData: ProgressStepsProps[] = [
  {
    id: 1,
    link: "debit-account",
    title: "Select Debit Account",
  },
  {
    id: 2,
    link: "payment-date",
    title: "Add Payment Due Date",
  },
  {
    id: 3,
    link: "upload-file",
    title: "Upload File",
  },
];

export const pensionUpload: ProgressStepsProps[] = [
  {
    id: 1,
    link: "employer-details",
    title: "Enter Employer Details",
  },
  {
    id: 2,
    link: "payment-period",
    title: "Select Payment Period",
  },
  {
    id: 3,
    link: "upload-file",
    title: "Upload File",
  },
];

export const UploadBeneficiaryList: ProgressStepsProps[] = [
  {
    id: 1,
    link: "upload-file",
    title: "Upload Beneficiary File",
  },
];

export const queryBuilder = (params: { [key: string]: string }) => {
  const filteredParams = Object.entries(params)
    .filter(
      ([_, value]) => value !== null && value != undefined && value !== ""
    )
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

  const query = new URLSearchParams(filteredParams);
  return query;
};

export const errorHandler = (error: unknown) => {
  if (error instanceof Error) {
    toast.error(error.message);
  } else if (typeof error === "object" && error && "data" in error) {
    // Assuming error.data.message exists
    const apiError = error as { data?: { message?: string } };
    toast.error(apiError.data?.message || "An unexpected error occurred");
  } else {
    toast.error("An unexpected error occurred");
  }
};

export const formatTimestamp = (
  timestamp: string,
  includeTime: boolean = true
): string => {
  const date = new Date(timestamp);

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  if (includeTime) {
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  }

  return formattedDate;
};

export const businessDocuments = [
  { name: "cac", title: "CAC Certificate of your business" },
  { name: "memorandum", title: "Memorandum of Incorporation" },
  { name: "scuml", title: "SCUML Document" },
  {
    name: "utilityBill",
    title: "Utility Bill (Valid bill within the last 90 days)",
  },
];

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  } catch (err) {
    toast.error("Failed to copy!");
  }
};

export const accounts = [
  {
    id: 1,
    accountName: "John Doe",
    accountNumber: "1234567890",
    accountType: "POS",
  },
  {
    id: 2,
    accountName: "Jane Smith",
    accountNumber: "0987654321",
    accountType: "ACCOUNT",
  },
  {
    id: 3,
    accountName: "Michael Johnson",
    accountNumber: "1122334455",
    accountType: "POS",
  },
  {
    id: 4,
    accountName: "Emily Brown",
    accountNumber: "5566778899",
    accountType: "ACCOUNT",
  },
];

export const logoutUser = (navigate: any, dispatch: any) => {
  console.log("Logging out user..."); // Debugging
  localStorage.removeItem("persist:alert-business");
  localStorage.clear();
  sessionStorage.clear();
  persistor.purge();
  dispatch(saveUserInfo(undefined));
  console.log("Local storage cleared and persistor purged."); // Debugging
  navigate("/login");
};
