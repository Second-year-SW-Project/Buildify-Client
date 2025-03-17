import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";  // Import Provider
import store from "./Store/store";  // Import your Redux store
import "./index.css";
import App from "./App.jsx";
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

// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/auth/signup",
        Component: Signup, // Add Signup route here
      },
      {
        path: "/auth/login",
        Component: Login, // Add Signup route here
      },
      {
        path: "/auth/verify",
        Component: Verify, // Add Signup route here
      },
      {
        path: "/auth/resetpassword",
        Component: ResetPassword, // Add Signup route here
      },
      {
        path: "/auth/forgetpassword",
        Component: ForgetPassword, // Add Signup route here
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
            path: "/products",
            Component: ManageProducts,
          },
          {
            path: "/products/manageproduct",
            Component: ManageProducts,
          },
          {
            path: "/products/createproduct",
            Component: CreateProducts,
          },
          {
            path: "/usermanage",
            Component: Usermanage,
          },
          {
            path: "/feedbackmanage/complaints",
            Component: Complaints,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}> {/* Wrap everything with Provider */}
    <ThemeProvider theme={theme}>
      <StrictMode>
        <RouterProvider router={router} /> {/* Only use RouterProvider here */}
      </StrictMode>
    </ThemeProvider>
  </Provider>
);
