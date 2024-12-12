import {
  AirtimeActionIcon,
  BankIcon,
  NINIcon,
  PayBillActionIcon,
  TransferActionIcon,
} from "../assets/svg/CustomSVGs";
import { IDOption, ProgressStepsProps } from "../interfaces/Global";

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
    title: "Business Address",
  },
  {
    id: 7,
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
