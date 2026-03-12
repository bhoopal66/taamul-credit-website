(function () {
  // Config - update API_URL if you use a custom domain
  const API_URL = (document.currentScript.getAttribute("data-api") || window.location.origin) + "/api/chat";
  const BRAND_COLOR = "#8B1A1A"; // Taamul dark red
  const BRAND_LIGHT = "#f5e6e6";

  let history = [];
  let isOpen = false;

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    #tc-widget-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      width: 56px; height: 56px; border-radius: 50%;
      background: ${BRAND_COLOR}; color: white; border: none;
      cursor: pointer; box-shadow: 0 4px 16px rgba(0,0,0,0.25);
      font-size: 24px; display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s;
    }
    #tc-widget-btn:hover { transform: scale(1.1); }
    #tc-widget-box {
      position: fixed; bottom: 92px; right: 24px; z-index: 9999;
      width: 360px; height: 500px; border-radius: 16px;
      background: white; box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      display: flex; flex-direction: column; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      transition: all 0.25s ease; transform-origin: bottom right;
    }
    #tc-widget-box.hidden { transform: scale(0); opacity: 0; pointer-events: none; }
    #tc-header {
      background: ${BRAND_COLOR}; color: white; padding: 14px 16px;
      display: flex; align-items: center; gap: 10px;
    }
    #tc-header .tc-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center; font-size: 18px;
    }
    #tc-header .tc-info { flex: 1; }
    #tc-header .tc-name { font-weight: 600; font-size: 14px; }
    #tc-header .tc-status { font-size: 11px; opacity: 0.85; }
    #tc-header button {
      background: none; border: none; color: white; cursor: pointer;
      font-size: 20px; padding: 2px; opacity: 0.8;
    }
    #tc-messages {
      flex: 1; overflow-y: auto; padding: 14px; display: flex;
      flex-direction: column; gap: 10px; background: #fafafa;
    }
    .tc-msg { max-width: 80%; padding: 10px 13px; border-radius: 12px; font-size: 13.5px; line-height: 1.5; }
    .tc-msg.bot { background: ${BRAND_LIGHT}; color: #222; border-bottom-left-radius: 4px; align-self: flex-start; }
    .tc-msg.user { background: ${BRAND_COLOR}; color: white; border-bottom-right-radius: 4px; align-self: flex-end; }
    .tc-msg.typing { color: #888; font-style: italic; }
    #tc-suggestions { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 14px; background: #fafafa; }
    .tc-chip {
      font-size: 12px; padding: 5px 10px; border-radius: 20px;
      border: 1px solid ${BRAND_COLOR}; color: ${BRAND_COLOR};
      background: white; cursor: pointer;
    }
    .tc-chip:hover { background: ${BRAND_LIGHT}; }
    #tc-input-row {
      display: flex; gap: 8px; padding: 10px 12px;
      border-top: 1px solid #eee; background: white;
    }
    #tc-input {
      flex: 1; border: 1px solid #ddd; border-radius: 20px;
      padding: 9px 14px; font-size: 13.5px; outline: none;
    }
    #tc-input:focus { border-color: ${BRAND_COLOR}; }
    #tc-send {
      background: ${BRAND_COLOR}; color: white; border: none;
      border-radius: 50%; width: 36px; height: 36px;
      cursor: pointer; font-size: 16px; display: flex;
      align-items: center; justify-content: center;
    }
    #tc-send:disabled { opacity: 0.5; cursor: not-allowed; }
    @media (max-width: 420px) {
      #tc-widget-box { width: calc(100vw - 32px); right: 16px; bottom: 84px; }
    }
  `;
  document.head.appendChild(style);

  // Widget HTML
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <button id="tc-widget-btn" title="Chat with us">💬</button>
    <div id="tc-widget-box" class="hidden">
      <div id="tc-header">
        <div class="tc-avatar">🏦</div>
        <div class="tc-info">
          <div class="tc-name">Taamul Credit Assistant</div>
          <div class="tc-status">● Online — Ask us anything</div>
        </div>
        <button onclick="tcClose()">✕</button>
      </div>
      <div id="tc-messages">
        <div class="tc-msg bot">Hi! I'm here to help with Taamul Credit's financing solutions. What can I help you with today?</div>
      </div>
      <div id="tc-suggestions">
        <button class="tc-chip" onclick="tcSuggest(this)">SME Loans</button>
        <button class="tc-chip" onclick="tcSuggest(this)">Invoice Discounting</button>
        <button class="tc-chip" onclick="tcSuggest(this)">Trade Finance</button>
        <button class="tc-chip" onclick="tcSuggest(this)">Credit Review</button>
      </div>
      <div id="tc-input-row">
        <input id="tc-input" placeholder="Type your question..." />
        <button id="tc-send" onclick="tcSend()">➤</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  // Input enter key
  document.getElementById("tc-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") tcSend();
  });

  // Toggle open/close
  document.getElementById("tc-widget-btn").addEventListener("click", function () {
    isOpen ? tcClose() : tcOpen();
  });

  window.tcOpen = function () {
    isOpen = true;
    document.getElementById("tc-widget-box").classList.remove("hidden");
    document.getElementById("tc-widget-btn").textContent = "✕";
    document.getElementById("tc-input").focus();
  };

  window.tcClose = function () {
    isOpen = false;
    document.getElementById("tc-widget-box").classList.add("hidden");
    document.getElementById("tc-widget-btn").textContent = "💬";
  };

  window.tcSuggest = function (btn) {
    document.getElementById("tc-input").value = btn.textContent;
    tcSend();
  };

  window.tcSend = async function () {
    const input = document.getElementById("tc-input");
    const msg = input.value.trim();
    if (!msg) return;

    input.value = "";
    document.getElementById("tc-suggestions").style.display = "none";
    addMessage(msg, "user");

    const sendBtn = document.getElementById("tc-send");
    sendBtn.disabled = true;

    const typing = addMessage("Typing...", "bot typing");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      const reply = data.reply || data.error || "Sorry, something went wrong.";
      typing.remove();
      addMessage(reply, "bot");
      history.push({ role: "user", content: msg });
      history.push({ role: "assistant", content: reply });
    } catch {
      typing.remove();
      addMessage("Connection error. Please try again or call us directly.", "bot");
    }

    sendBtn.disabled = false;
    input.focus();
  };

  function addMessage(text, type) {
    const msgs = document.getElementById("tc-messages");
    const div = document.createElement("div");
    div.className = "tc-msg " + type;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }
})();
