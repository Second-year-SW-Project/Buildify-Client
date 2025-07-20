import React, { useRef } from "react";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    const newUserMessage = { role: "user", text: userMessage };
    const updatedHistory = [...chatHistory, newUserMessage];

    setChatHistory(updatedHistory);

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse(updatedHistory);
    }, 600);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center gap-2 w-full"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        required
      />
      <button
        type="submit"
        className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
      >
        <ArrowUpwardOutlinedIcon />
      </button>
    </form>
  );
};

export default ChatForm;
