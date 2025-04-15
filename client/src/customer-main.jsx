import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store.js"; // Import your Redux store
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerApp from "./CustomerApp.jsx";


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
import Testing from "./pages/Testing.jsx";


import SelectGameAndBudgetpage from "./pages/SelectGameAndBudgetPage/SelectGameAndBudgetPage.jsx"
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <BrowserRouter basename="/customer">
            <Routes>
                <Route path="/" element={<CustomerApp />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
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


                {/* User Routes */}
                <Route path="user/complaint" element={<ComplaintSubmit />} />
                <Route path="user/complaintHistory" element={<UserComplaints />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="myOrders" element={<MyOrders />} />
                <Route path="rmaSupport" element={<RMAsupport />} />
                <Route path="orderHistory" element={<OrderHistory />} />
                <Route path="savedBuilds" element={<SavedBuilds />} />
                <Route path="settings" element={<Settings />} />

            </Routes>
        </BrowserRouter>
    </Provider>
);