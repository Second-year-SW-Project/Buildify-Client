import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Toaster } from "sonner";
import theme from "./AtomicComponents/theme.jsx";
import store from "./Store/store.js";

import CustomerApp from "./CustomerApp.jsx";
import AdminApp from "./AdminApp.jsx";
import Layout from "./Admin/Layout.jsx";

//adminpanel pages
import Dashboard from "./Admin/Dashboard.jsx";
import AdminProfile from "./Admin/AdminProfile.jsx";
import AdminSetting from "./Admin/AdminSetting.jsx";
import ManageProducts from "./Admin/ManageProducts.jsx";
import CreateProducts from "./Admin/CreateProducts.jsx";
import Usermanage from "./Admin/Usermanage.jsx";
import Complaints from "./Admin/Complaints.jsx";
import RMA from "./Admin/RMA.jsx";
import Review from "./Admin/Review.jsx";
import InvoiceList from "./Admin/InvoiceList.jsx";
import InvoiceCreate from "./Admin/InvoiceCreate.jsx";
import InvoiceEdit from "./Admin/InvoiceEdit.jsx";
import CreateGames from "./Admin/CreateGames.jsx";
import ManageGames from "./Admin/ManageGames.jsx";
import OrderList from "./Admin/OrderList.jsx";
import BuildOrderList from "./Admin/BuildOrderList.jsx";
import Comment from "./Admin/Comment.jsx";
import ViewOrder from "./Admin/ViewOrder.jsx";
import ViewBuild from "./Admin/ViewBuild.jsx";
//Login pages
import Signup from "./Login/Signup.jsx";
import Login from "./Login/Login.jsx";
import Verify from "./Login/Verify.jsx";
import ResetPassword from "./Login/Resetpassword.jsx";
import ForgetPassword from "./Login/Forgetpassword.jsx";
import ComplaintSubmit from "./User/ComplaintSubmit.jsx";
import UserComplaints from "./User/UserComplaints.jsx";

// User Components
import UserProfile from "./User/UserProfile.jsx";
import RMAsupport from "./User/RMAsupport.jsx";
import MyOrders from "./User/MyOrders.jsx";
import OrderHistory from "./User/OrderHistory.jsx";
import SavedBuilds from "./User/SavedBuilds.jsx";
import Settings from "./User/Settings.jsx";
import OrderDetails from "./User/OrderDetails.jsx";
import ReviewSubmitPage from "./User/ReviewSubmitPage.jsx";
import Reviews from "./User/Reviews.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About_page/About.jsx";
import LoginPage from "./pages/Login_page/Login_page.jsx";
import CartPage from "./pages/Shopping_cart/CartPage.jsx";
import PaymentGateway from "./pages/Shopping_cart/PaymentGateway.jsx";
import ProductCategoryPage from "./pages/Producat_category/Productcategorypage.jsx";
import ItemPage from "./pages/Single_Item/Itempage.jsx";
import SearchResults from "./pages/Searchbar/SearchResults.jsx";
import LaptopCategoryPage from "./pages/Laptop_category/Laptopcategorypage.jsx";
import SelectGameAndBudgetpage from "./pages/SelectGameAndBudgetPage/SelectGameAndBudgetPage.jsx";
import ChoosePartsPage from "./pages/ChoosePartsPage/ChoosePartsPage.jsx";
import ModelSelectPage from "./pages/ModeSelectPage/ModelSelectPage.jsx";
import ContinuePurchasePage from "./pages/ContinuePurchasePage/ContinuePurchasePage.jsx";
import ErrorStatus from "./Login/Errorstatus.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
  {
    //Admin Routes
    path: "/adminpanel",
    element: <AdminApp />,
    children: [
      { path: "auth/signup", element: <Signup /> },
      { path: "auth/login", element: <Login /> },
      { path: "auth/verify", element: <Verify /> },
      { path: "auth/resetpassword", element: <ResetPassword /> },
      { path: "auth/forgetpassword", element: <ForgetPassword /> },
      { path: "user/complaint", element: <ComplaintSubmit /> },
      { path: "user/complaintHistory", element: <UserComplaints /> },
      {
        path: "",
        element: <Layout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "admin", element: <AdminProfile /> },
          { path: "admin/profile", element: <AdminProfile /> },
          { path: "admin/setting", element: <AdminSetting /> },
          { path: "games", element: <ManageGames /> },
          { path: "games/managegames", element: <ManageGames /> },
          {
            path: "games/creategame",
            children: [
              { index: true, element: <CreateGames /> },
              { path: ":id", element: <CreateGames /> },
            ],
          },
          { path: "products", element: <ManageProducts /> },
          { path: "products/manageproduct", element: <ManageProducts /> },
          {
            path: "products/createproduct",
            children: [{ index: true, element: <CreateProducts /> }],
          },
          {
            path: "products/editproduct/:id",
            element: <CreateProducts />,
          },
          { path: "orders", element: <OrderList /> },
          {
            path: "orders/orderlist",
            children: [
              { index: true, element: <OrderList /> },
              { path: ":id", element: <OrderList /> },
            ],
          },
          {
            path: "orders/buildorderlist",
            children: [
              { index: true, element: <BuildOrderList /> },
              { path: ":id", element: <BuildOrderList /> },
            ],
          },
          {
            path: "orders/vieworder/:id",
            element: <ViewOrder />,
          },
          {
            path: "orders/viewbuild/:id",
            element: <ViewBuild />,
          },
          { path: "usermanage", element: <Usermanage /> },
          { path: "feedbackmanage", element: <Complaints /> },
          { path: "feedbackmanage/complaints", element: <Complaints /> },
          { path: "feedbackmanage/rma", element: <RMA /> },
          { path: "commentreview/comment", element: <Comment /> },
          { path: "commentreview/review", element: <Review /> },
          { path: "invoice", element: <InvoiceList /> },
          { path: "invoice/invoicelist", element: <InvoiceList /> },
          { path: "invoice/invoicecreate", element: <InvoiceCreate /> },
          { path: "invoice/invoiceedit/:invoiceId", element: <InvoiceEdit /> },
        ],
      },
    ],
  },
  {
    //Customer Routes
    path: "/",
    element: <CustomerApp />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "cartpage", element: <CartPage /> },
      { path: "paymentgateway", element: <PaymentGateway /> },
      { path: "productcategorypage", element: <ProductCategoryPage /> },
      {
        path: "productcategorypage/:categoryName",
        element: <ProductCategoryPage />,
      },
      { path: "itempage/:id", element: <ItemPage /> },
      { path: "search", element: <SearchResults /> },
      { path: "laptop", element: <LaptopCategoryPage /> },
      { path: "selectgame", element: <SelectGameAndBudgetpage /> },
      { path: "chooseparts", element: <ChoosePartsPage /> },
      { path: "modeselect", element: <ModelSelectPage /> },
      { path: "continuepurchase", element: <ContinuePurchasePage /> },

      //User
      {
        path: "user",
        children: [
          { path: "complaint", element: <ComplaintSubmit /> },
          { path: "complaintHistory", element: <UserComplaints /> },
          { path: "profile", element: <UserProfile /> },
          { path: "orders", element: <MyOrders /> },
          { path: "orders/:orderId", element: <OrderDetails /> },
          {
            path: "orders/review-submit/:orderId/:productId?",
            element: <ReviewSubmitPage />,
          },
          { path: "reviews", element: <Reviews /> },
          { path: "rmaSupport", element: <RMAsupport /> },
          { path: "orderHistory", element: <OrderHistory /> },
          { path: "orderHistory/:orderId", element: <OrderDetails /> },
          { path: "savedBuilds", element: <SavedBuilds /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

const root = document.getElementById("root");
const persistor = persistStore(store);

createRoot(root).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <Toaster />
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
