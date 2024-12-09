import { BankIcon, NINIcon } from "../assets/svg/CustomSVGs";
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
  },
  {
    icon: NINIcon,
    iconBg: "#f6fcf9",
    title: "National Identification Number (NIN)",
  },
];
