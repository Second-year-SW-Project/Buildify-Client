import { createContext, useContext, useState } from "react";

const ChatbotContext = createContext();

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChatbotContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ChatbotContext.Provider>
  );
};
