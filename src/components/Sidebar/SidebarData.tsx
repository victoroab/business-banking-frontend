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
  SidebarAuditTrailIcon,
  SidebarReportIcon,
} from "../../assets/svg/Sidebar";
import { SidebarDataProps } from "../../interfaces/Global";

export const SidebarData: SidebarDataProps[] = [
  {
    id: "tab1",
    icon: DashboardIcon,
    title: "Dashboard",
    url: "/",
  },

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
        title: "Bulk Uploads",
        url: "/send-money/uploads/debit-account",
      },
      {
        id: "tab3",
        icon: SidebarApprovalIcon,
        title: "Approval",
        url: "/send-money/approval",
      },
    ],
  },
  {
    id: "tab4",
    icon: SidebarAirtimeIcon,
    title: "Airtime | Data | Bills",
    url: "/utility",

    subNav: [
      {
        id: "tab1",
        icon: SidebarAirtimeIcon,
        title: "Airtime & Data",
        url: "/utility",
      },
      {
        id: "tab2",
        icon: PayBillIcons,
        title: "Pay Bills",
        url: "/utility/pay-bills",
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
    id: "tab9",
    icon: SidebarReportIcon,
    title: "Reports",
    url: "/reports",
  },

  {
    id: "tab9",
    icon: SidebarAuditTrailIcon,
    title: "Audit Trail",
    url: "/audit-trail",
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
