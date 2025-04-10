import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store.js"; // Import your Redux store
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./AtomicComponents/theme.jsx";
import { Toaster } from "sonner";

// Admin Components
import Dashboard from "./Admin/Dashboard.jsx";
import AdminProfile from "./Admin/AdminProfile.jsx";
import AdminSetting from "./Admin/AdminSetting.jsx";
import Layout from "./Admin/Layout.jsx";
import ManageProducts from "./Admin/ManageProducts.jsx";
import CreateProducts from "./Admin/CreateProducts.jsx";
import Usermanage from "./Admin/Usermanage.jsx";
import Complaints from "./Admin/Complaints.jsx";
import RMA from "./Admin/RMA.jsx";
import Review from "./Admin/Review.jsx";
import InvoiceList from "./Admin/InvoiceList.jsx";
import InvoiceCreate from "./Admin/InvoiceCreate.jsx";

// Login Components
import Signup from "./Login/Signup.jsx";
import Login from "./Login/Login.jsx";
import Verify from "./Login/Verify.jsx";
import ResetPassword from "./Login/Resetpassword.jsx";
import ForgetPassword from "./Login/Forgetpassword.jsx";

// User Components
import ComplaintSubmit from "./User/ComplaintSubmit.jsx";
import UserComplaints from "./User/UserComplaints.jsx";
import UserProfile from "./UserdashboardFeature/pages/UserProfile.jsx";
import RMAsupport from "./UserdashboardFeature/pages/RMAsupport.jsx";
import MyOrders from "./UserdashboardFeature/pages/MyOrders.jsx";
import OrderHistory from "./UserdashboardFeature/pages/OrderHistory.jsx";
import SavedBuilds from "./UserdashboardFeature/pages/SavedBuilds.jsx";
import Settings from "./UserdashboardFeature/pages/Settings.jsx";

// Other Pages
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About_page/About.jsx";
import LoginPage from "./pages/Login_page/Login_page.jsx";
import CartPage from "./pages/Shopping_cart/CartPage.jsx";
import PaymentGateway from "./pages/Shopping_cart/PaymentGateway.jsx";
import ProductCategoryPage from "./pages/Producat_category/Productcategorypage.jsx";
import ItemPage from "./pages/Single_Item/Itempage.jsx";
import SearchResults from "./pages/Searchbar/SearchResults.jsx";
import LaptopCategoryPage from "./pages/Laptop_category/Laptopcategorypage.jsx";
import Testing from "./pages/Testing.jsx";
import CreateGames from "./Admin/CreateGames.jsx"; // Import CreateGames
import ManageGames from "./Admin/ManageGames.jsx"; // Placeholder for ManageGames
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const root = document.getElementById("root");

createRoot(root).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Toaster />
      <StrictMode>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}

            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="loginpage" element={<Testing />} />
            <Route path="cartpage" element={<CartPage />} />
            <Route path="paymentgateway" element={<PaymentGateway />} />
            <Route
              path="productcategorypage"
              element={<ProductCategoryPage />}
            />
            <Route
              path="productcategorypage/:categoryName"
              element={<ProductCategoryPage />}
            />
            <Route path="itempage/:id" element={<ItemPage />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="laptop" element={<LaptopCategoryPage />} />

            {/* Authentication Routes */}
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/verify" element={<Verify />} />
            <Route path="/auth/resetpassword" element={<ResetPassword />} />
            <Route path="/auth/forgetpassword" element={<ForgetPassword />} />

            {/* User Routes */}
            <Route path="/user/complaint" element={<ComplaintSubmit />} />
            <Route path="/user/complaintHistory" element={<UserComplaints />} />
            <Route path="/profile" element={<UserProfile />} />

            {/* Admin Routes */}

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<AdminProfile />} />
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin/setting" element={<AdminSetting />} />

            <Route path="products" element={<ManageProducts />} />
            <Route path="products/manageproduct" element={<ManageProducts />} />
            <Route path="products/createproduct" element={<CreateProducts />} />
            <Route path="usermanage" element={<Usermanage />} />
            <Route path="feedbackmanage/complaints" element={<Complaints />} />

            <Route path="games" element={<ManageGames />} />
            <Route path="games/managegames" element={<ManageGames />} />
            <Route path="games/creategame" element={<CreateGames />} />
            <Route path="usermanage" element={<Usermanage />} />
            <Route path="feedbackmanage/complaints" element={<Complaints />} />

            <Route path="feedbackmanage/rma" element={<RMA />} />
            <Route
              path="feedbackmanage/comments&reviews"
              element={<Review />}
            />
            <Route path="invoice/invoicelist" element={<InvoiceList />} />
            <Route path="invoice/invoicecreate" element={<InvoiceCreate />} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </ThemeProvider>
  </Provider>
);
