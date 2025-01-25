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
  PayBillIcons,
} from "../../assets/svg/Sidebar";

export const SidebarData = [
  {
    id: "tab1",
    icon: DashboardIcon,
    title: "Dashboard",
    url: "/",
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
    subNav: [
      {
        id: "tab1",
        icon: SendMoneyIcon,
        title: "Send Money",
        url: "/send-money",
      },
      {
        id: "tab2",
        icon: UploadIcon,
        title: "Uploads",
        url: "/uploads/debit-account",
      },
      {
        id: "tab3",
        icon: SidebarApprovalIcon,
        title: "Approval",
        url: "/approval",
      },
    ],
  },
  {
    id: "tab4",
    icon: SidebarAirtimeIcon,
    title: "Airtime & Data",
    url: "/airtime-data",

    subNav: [
      {
        id: "tab1",
        icon: SidebarAirtimeIcon,
        title: "Airtime & Data",
        url: "/airtime-data",
      },
      {
        id: "tab2",
        icon: PayBillIcons,
        title: "Pay Bills",
        url: "/pay-bills",
      },
    ],
  },
  {
    id: "tab7",
    icon: CardIcon,
    title: "Cards",
    url: "/card",
  },
  {
    id: "tab8",
    icon: SidebarPOSIcon,
    title: "POS",
    url: "/pos",
  },
  {
    id: "tab9",
    icon: SidebarBeneficiaryIcon,
    title: "Beneficiaries",
    url: "/beneficiaries",
  },
  {
    id: "tab10",
    icon: SupportIcon,
    title: "Support",
    url: "/support",
  },
  {
    id: "tab11",
    icon: SidebarUserIcon,
    title: "Account Settings",
    url: "/account",
  },
];
