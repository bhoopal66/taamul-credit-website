import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "What loans do you offer?",
  "Am I eligible?",
  "Invoice discounting",
  "How it works",
];

const MOCK_REPLIES: Record<string, string> = {
  "What loans do you offer?":
    "We offer business loans from AED 50,000 to AED 500M, including SME loans, corporate loans, working capital finance, invoice discounting, and trade finance — all with zero consultancy fees.",
  "Am I eligible?":
    "Eligibility typically requires a valid UAE trade license, 1+ year of business operation, and a minimum monthly turnover. Our team will review your profile for free — contact us to get started.",
  "Invoice discounting":
    "Invoice discounting lets you unlock cash from unpaid invoices within 24–48 hours. We work with Mashreq, RAKBANK, and other UAE partner banks. No hidden fees.",
  "How it works":
    "Simple 3-step process: (1) Submit your details, (2) We match you with the right bank, (3) Get funded — all at zero cost to you. We're an authorized DSA for leading UAE banks.",
};

interface Message {
  role: "bot" | "user";
  text: string;
}

function TypingDots() {
  return (
    <div className="flex gap-1 px-4 py-3 bg-blue-50 rounded-2xl rounded-bl-sm self-start w-16">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-700"
          style={{
            animation: "tcBounce 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm the Taamul Credit AI assistant. Ask me about business loans, eligibility, or our services — I'm here to help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async (msg: string) => {
    if (!msg.trim()) return;
    setInput("");
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          history: messages.map((m) => ({
            role: m.role === "bot" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "Sorry, something went wrong. Please try again." },
      ]);
    } catch {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Connection issue. Please call us at +971 4 550 2800 or email info@taamulcredit.com",
        },
      ]);
    }
  };

  return (
    <>
      <style>{`
        @keyframes tcBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes tcSlideUp {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes tcPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(29, 78, 216, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(29, 78, 216, 0); }
        }
      `}</style>

      {/* Chat popup */}
      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden bg-white rounded-2xl shadow-2xl"
          style={{
            bottom: "140px",
            right: "16px",
            width: "340px",
            height: "460px",
            animation: "tcSlideUp 0.25s ease",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-800">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 text-lg">
              🏦
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Taamul Credit AI</div>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-xs text-blue-200">Online — Ask us anything</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col flex-1 gap-2.5 p-3 overflow-y-auto bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[82%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl ${
                  m.role === "bot"
                    ? "bg-blue-50 text-gray-800 rounded-bl-sm self-start"
                    : "bg-blue-800 text-white rounded-br-sm self-end"
                }`}
              >
                {m.text}
              </div>
            ))}
            {typing && <TypingDots />}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="flex flex-wrap gap-1.5 px-3 py-2 bg-gray-50 border-t border-gray-100">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-blue-700 text-blue-700 bg-white hover:bg-blue-50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 px-3 py-2.5 bg-white border-t border-gray-100">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Type your question..."
              className="flex-1 text-sm px-4 py-2 border border-gray-200 rounded-full outline-none focus:border-blue-600"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-800 text-white text-base disabled:opacity-40 hover:bg-blue-700 transition-colors flex-shrink-0"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating button — sits above the yellow call button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="fixed z-50 flex items-center justify-center w-13 h-13 rounded-full bg-blue-800 text-white shadow-lg hover:bg-blue-700 transition-all"
        style={{
          bottom: "84px", // sits just above the yellow call button
          right: "16px",
          width: "52px",
          height: "52px",
          animation: !open ? "tcPulse 2.5s infinite" : "none",
        }}
        title="Chat with us"
      >
        {open ? (
          <span className="text-xl">✕</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
              fill="white"
            />
            <circle cx="8" cy="10" r="1.5" fill="white" />
            <circle cx="12" cy="10" r="1.5" fill="white" />
            <circle cx="16" cy="10" r="1.5" fill="white" />
          </svg>
        )}
      </button>
    </>
  );
}
