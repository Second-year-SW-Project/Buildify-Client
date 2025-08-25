import { useEffect, useState, useRef } from "react";
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
        let [p1, p2] = await Promise.all([fetchOne(names[0]), fetchOne(names[1])]);
        if (!p1 || !p2) {
          updateHistory("I couldn't find both items to compare. Try more specific names.");
          return true;
        }

        // If categories differ, try resolving the second within first's category for a fair comparison
        if (p1.type && p2.type && p1.type !== p2.type) {
          const tryWithinType = async (name, type) => {
            const params = new URLSearchParams();
            params.set("search", name);
            params.set("limit", "10");
            const res = await fetch(`${effectiveBackendUrl}/api/product/all?${params.toString()}`);
            if (res.ok) {
              const data = await res.json();
              const arr = Array.isArray(data?.data) ? data.data : [];
              const sameType = arr.filter((x) => (x.type || '').toLowerCase() === (type || '').toLowerCase());
              if (sameType.length) {
                const q = name.toLowerCase();
                const scored = sameType
                  .map((p) => ({ p, s: (p.name || '').toLowerCase().includes(q) ? 2 : 1 }))
                  .sort((a, b) => b.s - a.s);
                return scored[0]?.p || sameType[0];
              }
            }
            return undefined;
          };
          const replacement = await tryWithinType(names[1], p1.type);
          if (replacement) p2 = replacement;
        }

        const price = (v) => typeof v === 'number' ? `LKR ${v.toLocaleString()}` : `${v ?? 'N/A'}`;
        const typeAttributes = {
          gpu: ['gpu_chipset','vram','gpu_cores','boost_clock','interface_type','length','power_connectors','tdp'],
          processor: ['socket_type','core_count','thread_count','base_clock','boost_clock','tdp','integrated_graphics','includes_cooler'],
          ram: ['memory_type','memory_capacity','memory_speed','tdp'],
          motherboard: ['motherboard_chipset','socket_type','form_factor','ram_slots','max_ram','supported_memory_types','pcie_slots','storage_interfaces'],
          storage: ['storage_type','storage_capacity','tdp'],
          casing: ['form_factor','supported_motherboard_sizes','max_gpu_length','max_cooler_height'],
          power: ['wattage','efficiency_rating','modular_type'],
          cooling: ['cooler_type','supported_socket','max_tdp','height','tdp'],
          monitor: ['display_size','resolution','refresh_rate','panel_type'],
          laptop: ['cpu','ram','storage','graphic_card','display_size','resolution','refresh_rate'],
          prebuild: ['cpu','cpu_cores','cpu_threads','cpu_base_clock','cpu_boost_clock','graphic_card','gpu_series','gpu_vram','ram_size','ram_speed','ram_type','storage','desktop_type']
        };
        const numericHigherBetter = new Set([
          'core_count','thread_count','base_clock','boost_clock','memory_speed','memory_capacity','gpu_cores','vram','ram_slots','max_ram','refresh_rate','wattage'
        ]);
        const lowerBetterByType = {
          gpu: new Set(['tdp','length']),
          processor: new Set(['tdp']),
          cooling: new Set(['tdp','height']),
          casing: new Set([]),
          motherboard: new Set([]),
          ram: new Set([]),
          storage: new Set([]),
          power: new Set([]),
          monitor: new Set([]),
          laptop: new Set(['tdp'])
        };
        const parseNum = (val) => {
          if (val === undefined || val === null) return NaN;
          if (typeof val === 'number') return val;
          const m = String(val).match(/[\d.]+/);
          return m ? Number(m[0]) : NaN;
        };
        const efficiencyOrder = ['80_plus','80_plus_bronze','80_plus_silver','80_plus_gold','80_plus_platinum','80_plus_titanium'];
        const normalizeEff = (v) => {
          if (!v) return -1;
          const s = String(v).toLowerCase().replace(/\s+/g,'_');
          const i = efficiencyOrder.indexOf(s);
          return i >= 0 ? i : -1;
        };

        // Pick key attributes by type; fallback to generic fields
        // helper omitted; we build rows directly to keep bundle small
        const commonKeys = [
          'type','manufacturer','price','tdp','socket_type','core_count','thread_count','base_clock','boost_clock',
          'memory_type','memory_speed','memory_capacity',
          'interface_type','length','power_connectors','vram','gpu_chipset','gpu_cores',
          'motherboard_chipset','form_factor','ram_slots','max_ram','supported_memory_types',
          'storage_type','storage_capacity','max_gpu_length','max_cooler_height','wattage','efficiency_rating',
          'display_size','resolution','refresh_rate','panel_type'
        ];
        const type = (p1.type || p2.type || '').toLowerCase();
        const prioritized = typeAttributes[type] || [];
        const rows = [['Name', p1.name || 'N/A', p2.name || 'N/A'], ['Price', price(p1.price), price(p2.price)]];
        const added = new Set(['name','price']);
        const keysOrder = [...prioritized, ...commonKeys];
        for (const key of keysOrder) {
          if (added.has(key)) continue;
          const v1 = p1[key];
          const v2 = p2[key];
          if ((v1 !== undefined && v1 !== '') || (v2 !== undefined && v2 !== '')) {
            let left = `${v1 ?? '—'}`;
            let right = `${v2 ?? '—'}`;
            const dir = (lowerBetterByType[type] && lowerBetterByType[type].has(key)) ? 'lower' : (numericHigherBetter.has(key) ? 'higher' : null);
            const n1 = parseNum(v1), n2 = parseNum(v2);
            if (dir && !isNaN(n1) && !isNaN(n2) && n1 !== n2) {
              if (dir === 'higher') { if (n1 > n2) left += ' ▲'; else right += ' ▲'; }
              else { if (n1 < n2) left += ' ▲'; else right += ' ▲'; }
            }
            if (key === 'efficiency_rating') {
              const e1 = normalizeEff(v1), e2 = normalizeEff(v2);
              if (e1 >= 0 && e2 >= 0 && e1 !== e2) {
                // Higher index => better (e.g., titanium highest)
                if (e1 > e2) left += ' ▲'; else right += ' ▲';
              }
            }
            rows.push([key.replace(/_/g,' '), left, right]);
            added.add(key);
          }
          if (rows.length >= 10) break; // keep it concise
        }

        const lines = [
          `Comparing${type ? ` (${type})` : ''}:`,
          `- ${p1.name} — ${price(p1.price)}${p1._id ? `\n   View: /itempage/${p1._id}` : ''}`,
          `- ${p2.name} — ${price(p2.price)}${p2._id ? `\n   View: /itempage/${p2._id}` : ''}`,
          '',
          ...rows.map(([k,a,b]) => `${k}: ${a} | ${b}`)
        ];
        // Open items in normal browser windows/tabs
        if (typeof window !== 'undefined') {
          if (p1?._id) window.open(`/itempage/${p1._id}`, '_blank');
          if (p2?._id) window.open(`/itempage/${p2._id}`, '_blank');
        }
        updateHistory(lines.join('\n') + "\n\nOpened product pages in new tabs for details.");
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
        const lines = top.map((p) => {
          const price = typeof p.price === "number" ? `LKR ${p.price.toLocaleString()}` : `${p.price}`;
          const name = p.name || "Unnamed";
          const id = p._id || p.id || "";
          const path = id ? `/itempage/${id}` : "";
          const view = path ? `\n   View: ${path}` : "";
          return `- ${name} — ${price}${view}`;
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

  // Render helper: hyperlink URLs and /itempage/<id> paths to keep lists tidy and clickable
  const renderLinkedText = (text) => {
    const content = String(text ?? "");
    const parts = content.split(/(https?:\/\/[^\s]+|\/itempage\/[A-Za-z0-9]+)/g);
    return parts.map((part, idx) => {
      if (/^https?:\/\//.test(part) || /^\/itempage\//.test(part)) {
        return (
          <a key={idx} href={part} target="_blank" rel="noreferrer" className="text-purple-700 underline">
            {part}
          </a>
        );
      }
      return <span key={idx}>{part}</span>;
    });
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
  }, [isOpen, setIsOpen]);

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
                  className={`inline-block px-3 py-2 rounded max-w-[80%] whitespace-pre-wrap break-words ${
                    chat.role === "user"
                      ? "bg-purple-100"
                      : chat.isError
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {renderLinkedText(chat.text)}
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
