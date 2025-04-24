import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
// import Footer from "../MoleculesComponents/User_navbar_and_footer/Footer";

const CustomerApp = () => {
    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow">
                <Outlet />
            </main>

        </div>
    );
};

export default CustomerApp;
