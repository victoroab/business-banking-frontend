import {
  DashboardIcon,
  // TransactionIcon,
  SendMoneyIcon,
  // PayBillIcons,
  SupportIcon,
  UploadIcon,
  CardIcon,
  SidebarUserIcon,
  SidebarAirtimeIcon,
  SidebarPOSIcon,
  SidebarBeneficiaryIcon,
  SidebarApprovalIcon,
} from "../../assets/svg/Sidebar";

export const SidebarData = [
  {
    id: "tab1",
    icon: DashboardIcon,
    title: "Dashboard",
    url: "/dashboard",
  },
  // {
  //   id: "tab2",
  //   icon: TransactionIcon,
  //   title: "Transactions",
  //   url: "/transactions",
  // },
  {
    id: "tab3",
    icon: SendMoneyIcon,
    title: "Send Money",
    url: "/send-money",
  },
  {
    id: "tab4",
    icon: SidebarAirtimeIcon,
    title: "Airtime & Data",
    url: "/airtime-data",
  },
  // {
  //   id: "tab5",
  //   icon: PayBillIcons,
  //   title: "Pay Bills",
  //   url: "/pay-bills",
  // },
  {
    id: "tab6",
    icon: CardIcon,
    title: "Cards",
    url: "/card",
  },
  {
    id: "tab7",
    icon: SidebarPOSIcon,
    title: "POS",
    url: "/pos",
  },
  {
    id: "tab8",
    icon: SupportIcon,
    title: "Support",
    url: "/support",
  },
  {
    id: "tab9",
    icon: SidebarUserIcon,
    title: "Account Settings",
    url: "/account",
  },
  {
    id: "tab10",
    icon: SidebarApprovalIcon,
    title: "Approval",
    url: "/approval",
  },
  {
    id: "tab11",
    icon: SidebarBeneficiaryIcon,
    title: "Beneficiaries",
    url: "/beneficiaries",
  },
  {
    id: "tab12",
    icon: UploadIcon,
    title: "Uploads",
    url: "/uploads/debit-account",
  },
];
