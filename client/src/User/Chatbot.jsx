import React, { useEffect, useState, useRef } from "react";
import ChatForm from "./Chatform";
import { companyInfo } from "./companyInfo";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { useChatbot } from "./ChatbotContext";
import ProductCompareDrawer from "./ProductCompareDrawer";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const { isOpen, setIsOpen } = useChatbot();
  const chatBodyRef = useRef();
  const chatbotRef = useRef();
  const toggleBtnRef = useRef();
  const [compare, setCompare] = useState({ open: false, products: [] });

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
    const tryCompareAnswer = async () => {
      const text = lastUserMessage;
      // Detect patterns: "A vs B" or "compare A and B"
      const vsMatch = text.match(/(.+?)\s+vs\s+(.+)/i);
      const compareMatch = text.match(/compare\s+(.+?)\s+(and|&)\s+(.+)/i);
      const names = vsMatch
        ? [vsMatch[1], vsMatch[2]]
        : compareMatch
          ? [compareMatch[1], compareMatch[3]]
          : null;
      if (!names) return false;

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const effectiveBackendUrl = backendUrl || (typeof window !== 'undefined'
        ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:8000'
            : 'https://buildify-server-d5yu.vercel.app')
        : '');
      if (!effectiveBackendUrl) return false;

      const fetchOne = async (query) => {
        const params = new URLSearchParams();
        params.set("search", query);
        params.set("limit", "5");
        const res = await fetch(`${effectiveBackendUrl}/api/product/all?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        let arr = Array.isArray(data?.data) ? data.data : [];
        // pick best name match
        const q = query.toLowerCase();
        let scored = arr
          .map((p) => ({ p, s: (p.name || '').toLowerCase().includes(q) ? 2 : 1 }))
          .sort((a, b) => b.s - a.s);
        let candidate = scored[0]?.p || arr[0];
        if (candidate) return candidate;

        // Fallback: if nothing found, try GPU type filter and match tokens (helps for "rtx 3060", "rx 6600")
        const tokenDigits = (q.match(/\d{3,4}/g) || []);
        const tokenWords = (q.match(/[a-zA-Z]+/g) || []).filter((w) => w.length >= 2);
        const fparams = new URLSearchParams();
        fparams.set("attribute", "type");
        fparams.set("value", "gpu");
        const fres = await fetch(`${effectiveBackendUrl}/api/product/filter?${fparams.toString()}`);
        if (fres.ok) {
          const fall = await fres.json();
          if (Array.isArray(fall) && fall.length) {
            const scoreGpu = (p) => {
              const name = (p.name || '').toLowerCase();
              let s = 0;
              tokenDigits.forEach((d) => { if (name.includes(d)) s += 2; });
              tokenWords.forEach((w) => { if (name.includes(w)) s += 1; });
              return s;
            };
            const ranked = fall
              .map((p) => ({ p, s: scoreGpu(p) }))
              .sort((a, b) => b.s - a.s);
            return ranked[0]?.p;
          }
        }
        return undefined;
      };

      try {
        const [p1, p2] = await Promise.all([fetchOne(names[0]), fetchOne(names[1])]);
        if (!p1 || !p2) {
          updateHistory("I couldn't find both items to compare. Try more specific names.");
          return true;
        }

        const price = (v) => typeof v === 'number' ? `LKR ${v.toLocaleString()}` : `${v ?? 'N/A'}`;
        const link = (id) => id ? `/itempage/${id}` : '';

        // Pick key attributes by type; fallback to generic fields
        const pick = (obj, keys) => keys.filter((k) => obj?.[k] !== undefined && obj?.[k] !== '').map((k) => [k, obj[k]]);
        const commonKeys = [
          'type','manufacturer','price','tdp','socket_type','core_count','thread_count','base_clock','boost_clock',
          'memory_type','memory_speed','memory_capacity',
          'interface_type','length','power_connectors','vram','gpu_chipset','gpu_cores',
          'motherboard_chipset','form_factor','ram_slots','max_ram','supported_memory_types',
          'storage_type','storage_capacity','max_gpu_length','max_cooler_height','wattage','efficiency_rating',
          'display_size','resolution','refresh_rate','panel_type'
        ];
        const rows = [['Name', p1.name || 'N/A', p2.name || 'N/A'], ['Price', price(p1.price), price(p2.price)]];
        const added = new Set(['name','price']);
        for (const key of commonKeys) {
          if (added.has(key)) continue;
          const v1 = p1[key];
          const v2 = p2[key];
          if ((v1 !== undefined && v1 !== '') || (v2 !== undefined && v2 !== '')) {
            rows.push([key.replace(/_/g,' '), `${v1 ?? '—'}`, `${v2 ?? '—'}`]);
            added.add(key);
          }
          if (rows.length >= 10) break; // keep it concise
        }

        const lines = [
          `Comparing:`,
          `1) ${p1.name} — ${price(p1.price)} ${link(p1._id)}`,
          `2) ${p2.name} — ${price(p2.price)} ${link(p2._id)}`,
          '',
          ...rows.map(([k,a,b]) => `${k}: ${a} | ${b}`)
        ];
        setCompare({ open: true, products: [p1, p2] });
        updateHistory(lines.join('\n') + "\n\nOpened a comparison view for more details.");
        return true;
      } catch (e) {
        updateHistory(`Comparison failed: ${e.message}`, true);
        return true;
      }
    };
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
    // Try comparison first
    const compared = await tryCompareAnswer();
    if (compared) return;

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

      <ProductCompareDrawer
        open={compare.open}
        products={compare.products}
        onClose={() => setCompare({ open: false, products: [] })}
      />
    </div>
  );
};

export default Chatbot;
