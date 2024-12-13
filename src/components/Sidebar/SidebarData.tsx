import {
  DashboardIcon,
  TransactionIcon,
  SendMoneyIcon,
  PayBillIcons,
  SupportIcon,
  CardIcon,
  SidebarUserIcon,
  SidebarAirtimeIcon,
  SidebarPOSIcon,
} from "../../assets/svg/Sidebar";

export const SidebarData = [
  {
    id: "tab1",
    icon: <DashboardIcon />,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    id: "tab2",
    icon: <TransactionIcon />,
    title: "Transactions",
    url: "/transactions",
  },
  {
    id: "tab3",
    icon: <SendMoneyIcon />,
    title: "Send Money",
    url: "/send-money",
  },
  {
    id: "tab4",
    icon: <SidebarAirtimeIcon />,
    title: "Airtime & Data",
    url: "/pay-bills",
  },
  {
    id: "tab5",
    icon: <PayBillIcons />,
    title: "Pay Bills",
    url: "/pay-bills",
  },
  {
    id: "tab6",
    icon: <CardIcon />,
    title: "Cards",
    url: "/card",
  },
  {
    id: "tab7",
    icon: <SidebarPOSIcon />,
    title: "POS",
    url: "/pay-bills",
  },
  {
    id: "tab8",
    icon: <SupportIcon />,
    title: "Supports",
    url: "/support",
  },
  {
    id: "tab9",
    icon: <SidebarUserIcon />,
    title: "Account",
    url: "/account",
  },
];
