import React from "react";
import { Outlet } from "react-router-dom";
import Chatbot from "./User/Chatbot";
// import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
// import Footer from "../MoleculesComponents/User_navbar_and_footer/Footer";
import { ChatbotProvider } from "./User/ChatbotContext";

const CustomerApp = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ChatbotProvider>
        <main className="flex-grow">
          <Outlet />
        </main>
        <Chatbot />
      </ChatbotProvider>
    </div>
  );
};

export default CustomerApp;
