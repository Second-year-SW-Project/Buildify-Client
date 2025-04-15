import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";  // Import Provider
import store from "./Store/store";  // Import your Redux store
import "./index.css";
import AdminApp from "./AdminApp.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./AtomicComponents/theme.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import AdminProfile from "./Admin/AdminProfile.jsx";
import AdminSetting from "./Admin/AdminSetting.jsx";
import Layout from "./Admin/Layout.jsx";
import ManageProducts from "./Admin/ManageProducts.jsx";
import CreateProducts from "./Admin/CreateProducts.jsx";
import Usermanage from "./Admin/Usermanage.jsx";
import Complaints from "./Admin/Complaints.jsx";
import Signup from "./Login/Signup.jsx";
import Login from "./Login/Login.jsx";
import Verify from "./Login/Verify.jsx";
import ResetPassword from "./Login/Resetpassword.jsx";
import ForgetPassword from "./Login/Forgetpassword.jsx";
import RMA from "./Admin/RMA.jsx";
import ComplaintSubmit from "./User/ComplaintSubmit.jsx";
import UserComplaints from "./User/UserComplaints.jsx";
import Review from "./Admin/Review.jsx";
import InvoiceList from "./Admin/InvoiceList.jsx";
import InvoiceCreate from "./Admin/InvoiceCreate.jsx";
import CreateGames from "./Admin/CreateGames.jsx";
import ManageGames from "./Admin/ManageGames.jsx";
import { Toaster } from "sonner";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Define the router configuration
const router = createBrowserRouter([
  {

    Component: AdminApp,
    children: [
      {
        path: "/auth/signup",
        Component: Signup,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/verify",
        Component: Verify,
      },
      {
        path: "/auth/resetpassword",
        Component: ResetPassword,
      },
      {
        path: "/auth/forgetpassword",
        Component: ForgetPassword,
      },
      {
        path: "/user/complaint",
        Component: ComplaintSubmit,
      },
      {
        path: "/user/complaintHistory",
        Component: UserComplaints,
      },
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "/dashboard",
            Component: Dashboard,
          },
          {
            path: "/admin",
            Component: AdminProfile,
          },
          {
            path: "/admin/profile",
            Component: AdminProfile,
          },
          {
            path: "/admin/setting",
            Component: AdminSetting,
          },
          {
            path: "/games",
            Component: ManageGames,
          },
          {
            path: "/games/managegames",
            Component: ManageGames,
          },
          {
            path: "games/creategame",
            children: [
              {
                index: true, // Route when no ID is provided
                Component: CreateGames,
              },
              {
                path: ":id", // Route for editing a product
                Component: CreateGames,
              },
            ],
          },
          {
            path: "/products",
            Component: ManageProducts,
          },
          {
            path: "/products/manageproduct",
            Component: ManageProducts,
          },
          {
            path: "/products/createproduct",
            children: [
              {
                index: true, //Route when no ID is provided
                Component: CreateProducts,
              },
              {
                path: ":id", //Route for editing a product
                Component: CreateProducts,
              },
            ],
          },
          {
            path: "/usermanage",
            Component: Usermanage,
          },
          {
            path: "/feedbackmanage",
            Component: Complaints,
          },
          {
            path: "/feedbackmanage/complaints",
            Component: Complaints,
          },
          {
            path: "/feedbackmanage/rma",
            Component: RMA,
          },
          {
            path: "/feedbackmanage/comments&reviews",
            Component: Review,
          },
          {
            path: "/invoice",
            Component: InvoiceList,
          },
          {
            path: "/invoice/invoicelist",
            Component: InvoiceList,
          },
          {
            path: "/invoice/invoicecreate",
            Component: InvoiceCreate,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}> {/* Wrap everything with Provider */}
    <ThemeProvider theme={theme}>
      <Toaster />
      <StrictMode>
        <RouterProvider router={router} /> {/* Only use RouterProvider here */}
      </StrictMode>
    </ThemeProvider>
  </Provider>
);
