import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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


const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: "/",
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
          
        ],
      },
    ],
  },
],
);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ThemeProvider>
);
