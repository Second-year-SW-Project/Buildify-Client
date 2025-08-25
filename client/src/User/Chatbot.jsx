import React, { useEffect, useState, useRef } from "react";
import ChatForm from "./Chatform";
import { companyInfo } from "./companyInfo";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { useChatbot } from "./ChatbotContext";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const { isOpen, setIsOpen } = useChatbot();
  const chatBodyRef = useRef();
  const chatbotRef = useRef();
  const toggleBtnRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    const lastUserMessage =
      history
        .filter((msg) => msg.role === "user")
        .slice(-1)[0]
        ?.text?.toLowerCase() || "";

    // 1. Priority: Special profile/account keywords for direct instructions
    if (
      lastUserMessage.includes("profile") ||
      lastUserMessage.includes("account settings") ||
      lastUserMessage.includes("change email") ||
      lastUserMessage.includes("change password") ||
      lastUserMessage.includes("update profile") ||
      lastUserMessage.includes("edit profile")
    ) {
      return updateHistory(
        "You can update your profile info, including email and password, by going to your dashboard and clicking your profile icon or username at the top right."
      );
    }

    // 2. Priority: "Where find" navigation shortcuts for various sections
    if (lastUserMessage.includes("where") && lastUserMessage.includes("find")) {
      if (
        lastUserMessage.includes("order history") ||
        lastUserMessage.includes("past orders") ||
        lastUserMessage.includes("previous orders")
      ) {
        return updateHistory(
          "You can find your order history under 'My Orders' in your dashboard menu."
        );
      }
      if (
        lastUserMessage.includes("saved builds") ||
        lastUserMessage.includes("builds")
      ) {
        return updateHistory(
          "Your saved builds are accessible from your dashboard under 'Saved Builds'."
        );
      }
      if (
        lastUserMessage.includes("support") ||
        lastUserMessage.includes("help") ||
        lastUserMessage.includes("contact")
      ) {
        return updateHistory(
          "You can find the support section in your dashboard menu under 'Support', or use the chat widget at the bottom right."
        );
      }
      if (
        lastUserMessage.includes("order") ||
        lastUserMessage.includes("tracking") ||
        lastUserMessage.includes("status")
      ) {
        return updateHistory(
          "Track your orders anytime from 'My Orders' in your dashboard to see current status and tracking information."
        );
      }
      if (
        lastUserMessage.includes("complaint") ||
        lastUserMessage.includes("file complaint") ||
        lastUserMessage.includes("check complaint")
      ) {
        return updateHistory(
          "You can submit and track complaints in the 'My Complaints' section of your dashboard."
        );
      }
      if (
        lastUserMessage.includes("return") ||
        lastUserMessage.includes("refund") ||
        lastUserMessage.includes("RMA")
      ) {
        return updateHistory(
          "Return, refund, and RMA requests can be made from your order details page in the dashboard."
        );
      }
      // fallback for 'where find'
      return updateHistory(
        "You can find various sections such as Orders, Builds, Profile, Support, and Complaints in your dashboard menu."
      );
    }

    // 3. Then FAQ keyword matching
    for (const faq of companyInfo.faqs || []) {
      for (const keyword of faq.keywords) {
        if (lastUserMessage.includes(keyword)) {
          return updateHistory(faq.answer);
        }
      }
    }

    // 4. Product-aware replies: detect product intent and query backend
    const tryProductAnswer = async () => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const effectiveBackendUrl = backendUrl || (typeof window !== 'undefined'
        ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:8000'
            : 'https://buildify-server-d5yu.vercel.app')
        : '');
      if (!effectiveBackendUrl) return false;

      const text = lastUserMessage;

      // Heuristics: detect product type, manufacturer and budget
      const typeAliases = {
        processor: ["cpu", "processor"],
        gpu: ["gpu", "graphics", "graphic card", "graphics card"],
        ram: ["ram", "memory"],
        motherboard: ["motherboard", "mobo"],
        storage: ["ssd", "hdd", "nvme", "storage", "hard drive"],
        casing: ["case", "casing"],
        power: ["psu", "power", "power supply"],
        cooling: ["cooler", "cooling", "cpu cooler"],
        monitor: ["monitor", "display"],
        laptop: ["laptop"],
        prebuild: ["prebuilt", "pre-build", "prebuild", "desktop"],
      };

      const manufacturers = [
        "intel",
        "amd",
        "nvidia",
        "msi",
        "asus",
        "gigabyte",
        "kingston",
        "corsair",
        "samsung",
        "wd",
        "seagate",
        "cooler master",
        "thermaltake",
        "seasonic",
      ];

      const findType = () => {
        for (const [type, aliases] of Object.entries(typeAliases)) {
          if (aliases.some((a) => text.includes(a))) return type;
        }
        return null;
      };

      const findManufacturer = () => {
        const found = manufacturers.find((m) => text.includes(m));
        return found ? found : null;
      };

      const findMaxPrice = () => {
        // Match phrases like: under 150000, below 200k, < 100000, under LKR 250,000
        const priceRegex = /(under|below|less than|<)\s*(lkr|rs\.?|\$)?\s*([\d,.]+)/i;
        const m = text.match(priceRegex);
        if (!m) return null;
        const raw = m[3].replace(/[,]/g, "");
        const val = Number(raw);
        return isNaN(val) ? null : val;
      };

      const qType = findType();
      const qBrand = findManufacturer();
      const qMax = findMaxPrice();

      const looksLikeProductSearch =
        /find|show|recommend|looking for|suggest|best|budget|cheap|upgrade|buy|price/i.test(text) ||
        qType !== null;

      if (!looksLikeProductSearch) return false;

      try {
        let products = [];

        if (qType) {
          const params = new URLSearchParams();
          params.set("attribute", "type");
          params.set("value", qType);
          if (qBrand) params.set("manufacturer", qBrand);
          if (qMax) params.set("maxPrice", String(qMax));

          const res = await fetch(`${effectiveBackendUrl}/api/product/filter?${params.toString()}`);
          if (!res.ok) throw new Error("Failed to fetch products");
          products = await res.json(); // array
        } else {
          const params = new URLSearchParams();
          params.set("search", text);
          params.set("limit", "5");
          const res = await fetch(`${effectiveBackendUrl}/api/product/all?${params.toString()}`);
          if (!res.ok) throw new Error("Failed to fetch products");
          const data = await res.json();
          products = Array.isArray(data?.data) ? data.data : [];
        }

        if (!products || products.length === 0) {
          updateHistory(
            qType
              ? `I couldn't find ${qBrand ? qBrand + " " : ""}${qType} ${qMax ? "under LKR " + qMax : ""}. Try adjusting your filters or search terms.`
              : "I couldn't find matching products. Try a shorter or different query."
          );
          return true;
        }

        const top = products.slice(0, 5);
        const lines = top.map((p, i) => {
          const price = typeof p.price === "number" ? `LKR ${p.price.toLocaleString()}` : `${p.price}`;
          const name = p.name || "Unnamed";
          const id = p._id || p.id || "";
          const path = id ? `/itempage/${id}` : "";
          return `${i + 1}. ${name} — ${price}${path ? ` — ${path}` : ""}`;
        });

        const header = qType
          ? `Here are some ${qBrand ? qBrand + " " : ""}${qType}${qMax ? ` under LKR ${qMax}` : ""}:\n`
          : `Top matches for "${history.filter((m) => m.role === "user").slice(-1)[0]?.text}":\n`;

        updateHistory(header + lines.join("\n"));
        return true;
      } catch (err) {
        updateHistory(`Product lookup failed: ${err.message}`, true);
        return true; // handled
      }
    };

    // Try product-aware path before general company info
    const productHandled = await tryProductAnswer();
    if (productHandled) return;

    // 5. Then company info shortcuts
    if (lastUserMessage.includes("email"))
      return updateHistory(`Our email is: ${companyInfo.email}`);
    if (lastUserMessage.includes("phone") || lastUserMessage.includes("call"))
      return updateHistory(`Our phone number is: ${companyInfo.phone}`);
    if (
      lastUserMessage.includes("address") ||
      lastUserMessage.includes("location")
    )
      return updateHistory(
        `Our address is: ${companyInfo.address.line1}, ${companyInfo.address.line2}, ${companyInfo.address.city}, ${companyInfo.address.state} ${companyInfo.address.zip}, ${companyInfo.address.country}`
      );
    if (lastUserMessage.includes("name"))
      return updateHistory(`Our company name is: ${companyInfo.name}`);
    if (lastUserMessage.includes("tagline"))
      return updateHistory(`Our tagline is: ${companyInfo.tagline}`);
    if (
      lastUserMessage.includes("about") ||
      lastUserMessage.includes("description")
    )
      return updateHistory(companyInfo.description);
    if (lastUserMessage.includes("social")) {
      const s = companyInfo.socialLinks;
      return updateHistory(
        `Facebook: ${s.facebook}\nTwitter: ${s.twitter}\nInstagram: ${s.instagram}\nLinkedIn: ${s.linkedin}\nGitHub: ${s.github}`
      );
    }

    // Fallback: send to backend (LLM or external service)
    const formattedHistory = [
      {
        role: "user",
        parts: [
          {
            text:
              `You are a customer support assistant for Buildify, a PC building platform. ` +
              `Only respond using the provided company information and FAQs. ` +
              `Avoid generic responses or asking users to clarify. If you don’t have a direct answer, say: ` +
              `"Please contact support@buildify.com".`,
          },
        ],
      },
      ...history.map(({ role, text }) => ({
        role,
        parts: [{ text }],
      })),
    ];

    try {
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: formattedHistory }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error?.message || "Something went wrong!");

      const responseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text
          ?.replace(/\*\*(.*?)\*\*/g, "$1")
          .trim() || "Sorry, I couldn't generate a response.";

      updateHistory(responseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  useEffect(() => {
    function handleClickOutside(event) {
      // if chatbot is open and click is outside chatbot AND toggle button
      if (
        isOpen &&
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <button
        ref={toggleBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700"
      >
        <SmartToyOutlinedIcon />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatbotRef}
          className="mt-2 w-[350px] h-[500px] bg-white border rounded-xl shadow-lg flex flex-col"
        >
          {/* Header */}
          <div className="bg-purple-600 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <SmartToyOutlinedIcon />
              <span className="font-semibold">Buildify Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <KeyboardArrowDownOutlinedIcon />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50"
          >
            <div className="text-left text-sm">
              <span className="inline-block bg-purple-100 px-3 py-2 rounded text-gray-800">
                Hey there! How can I help you today?
              </span>
            </div>

            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`text-sm ${
                  chat.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded max-w-[80%] break-words ${
                    chat.role === "user"
                      ? "bg-purple-100"
                      : chat.isError
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {chat.text}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex border-t p-2 bg-white">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
