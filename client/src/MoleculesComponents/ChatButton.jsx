import { useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import theme from "../AtomicComponents/theme";

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const chatRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        chatRef.current &&
        !chatRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-1000">
      <IconButton
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="bg-purple-500 text-white p-3"
        sx={{
          backgroundColor: open
            ? theme.palette.primary900.main
            : theme.palette.primary700.main,
          color: "white",
          padding: "16px",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: open
              ? theme.palette.primary900.main
              : theme.palette.primary700.main,
          },
        }}
      >
        <ChatIcon />
      </IconButton>
      {open && (
        <div
          ref={chatRef}
          className="absolute bottom-14 right-0 w-80 h-96 bg-white shadow-lg p-4 rounded-lg"
        >
          <h1>gqyeghopih</h1>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
