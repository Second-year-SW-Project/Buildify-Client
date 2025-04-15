import { Outlet } from "react-router-dom";
import Iconset from "../AtomicComponents/Icons/Iconset";
import theme from "../AtomicComponents/theme";
import { DashboardLayout } from "@toolpad/core";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <Iconset type="dashboard" />,
  },
  {
    segment: "admin",
    title: "Admin",
    icon: <Iconset type="admin" />,
    children: [
      {
        segment: "profile",
        title: "Profile",
        icon: <Iconset type="profile" />,
      },
      {
        segment: "setting",
        title: "Settings",
        icon: <Iconset type="settings" />,
      },
    ],
  },
  {
    kind: "divider",
  },
    {
      kind: 'header',
      title: 'Games',
    },
    {
      segment: 'games',
      title: 'Games',
      icon: <Iconset type="product" />, // Reuse an existing icon or create a new one
      children: [
        {
          segment: 'managegames',
          title: 'Manage Games',
          icon: <Iconset type="productList" />, // Reuse or replace with a game-specific icon
        },
        {
          segment: 'creategame',
          title: 'Create Game',
          icon: <Iconset type="productCreate" />, // Reuse or replace with a game-specific icon
        },
      ],
    },

   
  {
    kind: "header",
    title: "Product & Order",
  },
  {
    segment: "products",
    title: "Products",
    icon: <Iconset type="product" />,
    children: [
      {
        segment: "manageproduct",
        title: "Manage Product",
        icon: <Iconset type="productList" />,
      },
      {
        segment: "createproduct",
        title: "Create Product",
        icon: <Iconset type="productCreate" />,
      },
    ],
  },
  {
    segment: "orders",
    title: "Orders ",
    icon: <Iconset type="order" />,
    children: [
      {
        segment: "orderlist",
        title: "Order List",
        icon: <Iconset type="orderList" />,
      },
      {
        segment: "receiveorder",
        title: "Received Order",
        icon: <Iconset type="receiveOrder" />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "User Section",
  },
  {
    segment: "usermanage",
    title: "User Manage",
    icon: <Iconset type="user-manage" />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Feedbacks",
  },
  {
    segment: "feedbackmanage",
    title: "Feedback Manage",
    icon: <Iconset type="feedback-manage" />,
    children: [
      {
        segment: "complaints",
        title: "Complaints",
        icon: <Iconset type="complains" />,
      },
      {
        segment: "comments&reviews",
        title: "Comments & Reviews",
        icon: <Iconset type="comments" />,
      },
      {
        segment: "rma",
        title: "RMA",
        icon: <Iconset type="RMA" />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Invoices",
  },
  {
    segment: "invoice",
    title: "Invoice ",
    icon: <Iconset type="invoice" />,
    children: [
      {
        segment: "invoicelist",
        title: "Invoice List",
        icon: <Iconset type="invoiceList" />,
      },
      {
        segment: "invoicecreate",
        title: "Create Invoice",
        icon: <Iconset type="createInvoice" />,
      },
    ],
  },
];

export default function Testing() {
  return (
    <DashboardLayout
      navigation={NAVIGATION}
      branding={{
        logo: (
          <img
            src="/src/assets/images/Logos/logo-white.png"
            alt="Logo"
            style={{
              marginLeft: "8px",
              marginTop: "4px",
              maxWidth: "100%",
              height: "auto",
              width: "140px",
            }}
          />
        ),
        title: "",
      }}
      theme={theme}
    >
      <Outlet />
    </DashboardLayout>
  );
}