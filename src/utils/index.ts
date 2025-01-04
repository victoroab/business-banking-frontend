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
  {
    id: 1,
    title: "Nationality",
  },
  {
    id: 2,
    title: "BVN & NIN",
  },
  {
    id: 3,
    title: "Face Verification",
  },
  {
    id: 4,
    title: "Residential Address",
  },
  {
    id: 5,
    title: "Business Details",
  },
  {
    id: 6,
    title: "Business Document",
  },
  {
    id: 7,
    title: "Business Address",
  },
  {
    id: 8,
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
  },
  {
    id: 2,
    icon: AirtimeActionIcon,
    title: "Airtime and Data",
    desc: "Recharge your mobile lines",
  },
  {
    id: 3,
    icon: PayBillActionIcon,
    title: "Pay Bills",
    desc: "Renew your DSTV subscription",
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
  { createdAt: "2024-12-30T08:30:00Z", income: 1200 },
  { createdAt: "2024-12-29T12:15:00Z", income: 1500 },
  { createdAt: "2024-12-28T08:30:00Z", income: 1200 },
  { createdAt: "2024-12-28T12:15:00Z", income: 1500 },
  { createdAt: "2024-12-27T14:45:00Z", income: 1000 },
  { createdAt: "2024-12-26T09:10:00Z", income: 800 },
  { createdAt: "2024-12-25T16:30:00Z", income: 1600 },
  { createdAt: "2024-12-24T11:00:00Z", income: 1400 },
  { createdAt: "2024-12-25T10:30:00Z", income: 1100 },
  { createdAt: "2024-12-24T13:15:00Z", income: 1300 },
  { createdAt: "2024-12-23T07:45:00Z", income: 1700 },
  { createdAt: "2024-12-22T15:00:00Z", income: 900 },
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
  { id: 1, title: "Business Details", navigate: 5 },
  { id: 2, title: "Business Documents", navigate: 6 },
  { id: 3, title: "Business Address", navigate: 7 },
];

export const newBillProgressSteps: ProgressStepsProps[] = [
  {
    id: 1,
    title: "Select Debit Account",
  },
  {
    id: 2,
    title: "Select a Category",
  },
  {
    id: 3,
    title: "Select Provider",
  },
  {
    id: 4,
    title: "Select Package",
  },
  {
    id: 5,
    title: "Add Beneficiary",
  },
  {
    id: 6,
    title: "Amount",
  },
  {
    id: 7,
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
    title: "Select Debit Account",
  },
  {
    id: 2,
    title: "Bank Details",
  },
  {
    id: 3,
    title: "Amount",
  },

  {
    id: 4,
    title: "Confirmation",
  },
];

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
    sender: "John Doe",
    beneficiary: "Jane Smith",
    bank: "Bank of America",
    amount: 10000.5,
    transactionType: "transfer",
    status: "successful",
    createdAt: "2024-12-15T14:30:00Z",
  },
  {
    id: 2,
    sender: "Alice Green",
    beneficiary: "Bob White",
    bank: "Chase Bank",
    amount: 250000.0,
    transactionType: "credit",
    status: "successful",
    createdAt: "2024-12-17T09:45:00Z",
  },
  {
    id: 3,
    sender: "Charlie Black",
    beneficiary: "David Blue",
    bank: "Citibank",
    amount: 5000000.75,
    transactionType: "debit",
    status: "failed",
    createdAt: "2024-12-18T12:00:00Z",
  },
  {
    id: 4,
    sender: "Eve White",
    beneficiary: "Frank Gray",
    bank: "Wells Fargo",
    amount: 30000.0,
    transactionType: "transfer",
    status: "successful",
    createdAt: "2024-12-18T13:00:00Z",
  },
  {
    id: 5,
    sender: "Grace Black",
    beneficiary: "Henry Yellow",
    bank: "HSBC",
    amount: 150000.0,
    transactionType: "credit",
    status: "failed",
    createdAt: "2024-12-19T10:30:00Z",
  },
  {
    id: 6,
    sender: "John Doe",
    beneficiary: "Jane Smith",
    bank: "Bank of America",
    amount: 10000.5,
    transactionType: "transfer",
    status: "successful",
    createdAt: "2024-12-15T14:30:00Z",
  },
  {
    id: 7,
    sender: "Alice Green",
    beneficiary: "Bob White",
    bank: "Chase Bank",
    amount: 250000.0,
    transactionType: "credit",
    status: "successful",
    createdAt: "2024-12-17T09:45:00Z",
  },
  {
    id: 8,
    sender: "Charlie Black",
    beneficiary: "David Blue",
    bank: "Citibank",
    amount: 5000000.75,
    transactionType: "debit",
    status: "failed",
    createdAt: "2024-12-18T12:00:00Z",
  },
  {
    id: 9,
    sender: "Eve White",
    beneficiary: "Frank Gray",
    bank: "Wells Fargo",
    amount: 30000.0,
    transactionType: "transfer",
    status: "successful",
    createdAt: "2024-12-18T13:00:00Z",
  },
  {
    id: 10,
    sender: "Grace Black",
    beneficiary: "Henry Yellow",
    bank: "HSBC",
    amount: 150000.0,
    transactionType: "credit",
    status: "failed",
    createdAt: "2024-12-19T10:30:00Z",
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
    title: "Change Transaction PIN",
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
