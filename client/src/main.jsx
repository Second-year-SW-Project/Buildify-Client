import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Toaster } from "sonner";
import theme from "./AtomicComponents/theme.jsx";
import store from "./Store/store.js"; // Import your Redux store

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
import CreateGames from "./Admin/CreateGames.jsx";
import ManageGames from "./Admin/ManageGames.jsx";
import OrderList from "./Admin/OrderList.jsx";
import ReceivedOrders from "./Admin/ReceivedOrders.jsx";
//Login pages
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

import Home from "./pages/Home/Home.jsx";
import About from "./pages/About_page/About.jsx";
import LoginPage from "./pages/Login_page/Login_page.jsx";
import CartPage from "./pages/Shopping_cart/CartPage.jsx";
import PaymentGateway from "./pages/Shopping_cart/PaymentGateway.jsx";
import ProductCategoryPage from "./pages/Producat_category/Productcategorypage.jsx";
import ItemPage from "./pages/Single_Item/Itempage.jsx";
import SearchResults from "./pages/Searchbar/SearchResults.jsx";
import LaptopCategoryPage from "./pages/Laptop_category/Laptopcategorypage.jsx";
import SelectGameAndBudgetpage from "./pages/SelectGameAndBudgetPage/SelectGameAndBudgetPage.jsx"

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
    {
        path: "/adminpanel",
        Component: AdminApp,
        children: [
            {
                path: "auth/signup",
                Component: Signup,
            },
            {
                path: "auth/login",
                Component: Login,
            },
            {
                path: "auth/verify",
                Component: Verify,
            },
            {
                path: "auth/resetpassword",
                Component: ResetPassword,
            },
            {
                path: "auth/forgetpassword",
                Component: ForgetPassword,
            },
            {
                path: "user/complaint",
                Component: ComplaintSubmit,
            },
            {
                path: "user/complaintHistory",
                Component: UserComplaints,
            },
            {
                path: "",
                Component: Layout,
                children: [
                    {
                        path: "dashboard",
                        Component: Dashboard,
                    },
                    {
                        path: "admin",
                        Component: AdminProfile,
                    },
                    {
                        path: "admin/profile",
                        Component: AdminProfile,
                    },
                    {
                        path: "admin/setting",
                        Component: AdminSetting,
                    },
                    {
                        path: "games",
                        Component: ManageGames,
                    },
                    {
                        path: "games/managegames",
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
                        path: "products",
                        Component: ManageProducts,
                    },
                    {
                        path: "products/manageproduct",
                        Component: ManageProducts,
                    },
                    {
                        path: "products/createproduct",
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
                        path: "orders",
                        Component: OrderList,
                    },
                    {
                        path: "orders/orderlist",
                        children: [
                            {
                                index: true, //Route when no ID is provided
                                Component: OrderList,
                            },
                            {
                                path: ":id", //Route for editing a product
                                Component: OrderList,
                            },
                        ],
                    },
                    {
                        path: "orders/receivedorders",
                        children: [
                            {
                                index: true, //Route when no ID is provided
                                Component: ReceivedOrders,
                            },
                            {
                                path: ":id", //Route for editing a product
                                Component: ReceivedOrders,
                            },
                        ],
                    },

                    {
                        path: "usermanage",
                        Component: Usermanage,
                    },
                    {
                        path: "feedbackmanage",
                        Component: Complaints,
                    },
                    {
                        path: "feedbackmanage/complaints",
                        Component: Complaints,
                    },
                    {
                        path: "feedbackmanage/rma",
                        Component: RMA,
                    },
                    {
                        path: "feedbackmanage/comments&reviews",
                        Component: Review,
                    },
                    {
                        path: "invoice",
                        Component: InvoiceList,
                    },
                    {
                        path: "invoice/invoicelist",
                        Component: InvoiceList,
                    },
                    {
                        path: "invoice/invoicecreate",
                        Component: InvoiceCreate,
                    },
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
                {/* Customer Routes */}
                <BrowserRouter>
                    <Routes>
                        {/* Main Routes */}
                        <Route path="/" element={<CustomerApp />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/cartpage" element={<CartPage />} />
                        <Route path="/paymentgateway" element={<PaymentGateway />} />
                        <Route
                            path="/productcategorypage"
                            element={<ProductCategoryPage />}
                        />
                        <Route
                            path="/productcategorypage/:categoryName"
                            element={<ProductCategoryPage />}
                        />
                        <Route path="/itempage/:id" element={<ItemPage />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/laptop" element={<LaptopCategoryPage />} />


                        {/* User Routes */}
                        <Route path="/user/complaint" element={<ComplaintSubmit />} />
                        <Route path="/user/complaintHistory" element={<UserComplaints />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/myOrders" element={<MyOrders />} />
                        <Route path="/rmaSupport" element={<RMAsupport />} />
                        <Route path="/orderHistory" element={<OrderHistory />} />
                        <Route path="/savedBuilds" element={<SavedBuilds />} />
                        <Route path="/settings" element={<Settings />} />

                    </Routes>
                </BrowserRouter>
                {/* AdminPanel Routes */}
                <StrictMode>
                    <RouterProvider router={router} />
                </StrictMode>

            </ThemeProvider>

        </PersistGate>
    </Provider>
);