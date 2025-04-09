import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store";
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
import RMA from "./Admin/RMA.jsx";
import { Toaster } from "sonner";
import ComplaintSubmit from "./User/ComplaintSubmit.jsx";
import UserComplaints from "./User/UserComplaints.jsx";
import Review from "./Admin/Review.jsx";
import CreateGames from "./Admin/CreateGames.jsx"; // Import CreateGames
import ManageGames from "./Admin/ManageGames.jsx"; // Placeholder for ManageGames

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Define the router configuration
const router = createBrowserRouter([
  {
    Component: App,
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
                index: true,
                Component: CreateProducts,
              },
              {
                path: ":id",
                Component: CreateProducts,
              },
            ],
          },
          // New Games Section
          {
            path: "/games",
            Component: ManageGames, // Default route for games
          },
          {
            path: "/games/managegames",
            Component: ManageGames,
          },
          {
            path: "/games/creategame",
            children: [
              {
                index: true, // Default route for creating a new game
                Component: CreateGames,
              },
              {
                path: ":id", // Dynamic route for editing a game
                Component: CreateGames,
              },
            ],
          },
          {
            path: "/usermanage",
            Component: Usermanage,
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
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Toaster />
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </ThemeProvider>
  </Provider>
);