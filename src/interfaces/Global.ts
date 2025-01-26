import { ReactElement, ReactNode } from "react";

export interface Modal {
  id?: string | number;
  close?: () => void;
}
export interface Layout {
  children: ReactNode;
  loginBtn: boolean;
  terms: boolean;
}
export interface NavbarProps {
  title: string;
  subtitle: string;
}

export interface ProgressStepsProps {
  id: number | string;
  title: string;
  link?: string;
}
export interface AddProps {
  setActiveTab: any;
}

export interface IFormInputProps {
  label?: string;
  placeholder?: string;
  id: string;
  name?: string;
  filter?: boolean;
  shortP?: string;
  error?: string | undefined;
  defaultValue?: string | number;
  type?: React.HTMLInputTypeAttribute | "textarea" | "select";
  inputClassName?: string;
  className?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  icon?: JSX.Element | string;
  required?: boolean;
  sublabel?: string;
  disabled?: boolean;
  selectOptions?: any[];
  valuePropertyName?: string;
  keyPropertyName?: string;
  itemPropertyName?: string;
}

export interface DashboardLayoutProps {
  children: ReactNode;
}
export interface RouteProps {
  path: string;
  name: string;
  element: ReactElement;
}
export interface OTPProps {
  inputCount: number;
  title: string;
  paragraph: ReactElement;
  setOtpCode: React.Dispatch<React.SetStateAction<string>>;
  otpCode: string;
}

export interface KYCPageProps {
  setCurrentStep: any;
}

export interface IDOption {
  icon?: any;
  title: string;
  iconBg?: string;
  status?: string;
  shortCode?: string;
  package?: {
    title: string;
    shortCode?: string;
  }[];
}
export interface DataItem {
  createdAt: string;
}

export interface AnalyticsChartProps {
  data: { createdAt: string }[];
}

export interface GraphData {
  name: string;
  income: number;
}

export type StepComponentProps = {
  step: number;
  component: React.ComponentType<any>;
};

export interface ProgressProps {
  stepsComponents?: StepComponentProps[];
  progressSteps: ProgressStepsProps[];
  currentStep?: number;
  isDashboard: boolean;
  navTitle?: string;
  navDesc?: string;
  isUpload?: boolean;
}

type TransactionType = "debit" | "credit" | "transfer";
type TransactionStatus = "successful" | "failed";

export interface RowDataProps {
  id: number;
  sender: string;
  beneficiary: string;
  bank: string;
  amount: number;
  transactionType: TransactionType;
  status: TransactionStatus;
  createdAt: string;
}

export interface TransferDataProps {
  id: string;
  bankName: string;
  beneficiaryType: string;
  accountName: string;
  accountNumber: string;
  createdAt: string;
}

export interface AirtimeRowDataProps {
  id: string;
  sender: string;
  beneficiaryType: string;
  phoneNumber: string;
  networkProvider: string;
  transactionType: TransactionType;
  status: TransactionStatus;
  createdAt: string;
}

export interface TVRowDataProps {
  id: string;
  tvCardName?: string;
  tvCardNumber?: string;
  beneficiaryType: string;
  tvProvider?: string;
  transactionType: TransactionType;
  status: TransactionStatus;
  createdAt: string;
}
export interface IColData {
  selector?: (row: any) => string;
  cell?: (row: any) => ReactNode;
  [key: string]: string | number | any;
}

export interface SidebarDataProps {
  id: string;
  icon: any;
  title: string;
  url: string;
  subNav?: SidebarDataProps[];
}
export interface SidebarItemProps {
  item: SidebarDataProps;
}
