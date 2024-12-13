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
import { DataItem, IDOption, ProgressStepsProps } from "../interfaces/Global";

export const progressSteps: ProgressStepsProps[] = [
  {
    id: 1,
    title: "Nationality",
  },
  {
    id: 2,
    title: "BVN or NIN",
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

export const AccountTypes: ProgressStepsProps[] = [
  {
    id: 1,
    title: "BVN",
  },
  {
    id: 2,
    title: "BVN",
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
  { createdAt: "2024-12-20T08:30:00Z", income: 1200 },
  { createdAt: "2024-12-19T12:15:00Z", income: 1500 },
  { createdAt: "2024-12-10T08:30:00Z", income: 1200 },
  { createdAt: "2024-12-18T12:15:00Z", income: 1500 },
  { createdAt: "2024-12-17T14:45:00Z", income: 1000 },
  { createdAt: "2024-12-16T09:10:00Z", income: 800 },
  { createdAt: "2024-12-15T16:30:00Z", income: 1600 },
  { createdAt: "2024-12-14T11:00:00Z", income: 1400 },
  { createdAt: "2024-12-15T10:30:00Z", income: 1100 },
  { createdAt: "2024-12-14T13:15:00Z", income: 1300 },
  { createdAt: "2024-12-13T07:45:00Z", income: 1700 },
  { createdAt: "2024-12-12T15:00:00Z", income: 900 },
];

export const filterList = [
  { value: "week", name: "Weekly" },
  { value: "month", name: "1M" },
  { value: "three", name: "3M" },
  { value: "six", name: "6M" },
  { value: "yearly", name: "1Y" },
];

export const typeList = [
  { value: "income", name: "Income" },
  { value: "expenses", name: "Expenses" },
];
