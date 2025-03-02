import React, { useState } from "react";
import SideNav from "../SideNav";
import Navbar from "../../MoleculesComponents/User_navbar_and_footer/Navbar";

export default function MyOrders() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="flex flex-1">
          <SideNav />

          <main className="flex-1 mt-36 p-6 pl-64">
            <h1>orders orderersbbfvobowbn</h1>
          </main>
        </div>
      </div>
    </div>
  );
}
