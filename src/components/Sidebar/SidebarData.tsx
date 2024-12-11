import {
  DashboardIcon,
  TransactionIcon,
  SendMoneyIcon,
  PayBillIcons,
  SupportIcon,
  CardIcon,
} from "../../assets/svg/CustomSVGs";

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
    icon: <PayBillIcons />,
    title: "Pay Bills",
    url: "/pay-bills",
  },
  {
    id: "tab5",
    icon: <CardIcon />,
    title: "Cards",
    url: "/card",
  },
  {
    id: "tab5",
    icon: <SupportIcon />,
    title: "Supports",
    url: "/support",
  },
];
