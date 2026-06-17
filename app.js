/* ============================================================
   QuoteMate app controller
   Wires UI, voice (TTS + STT), conversation flow, settings, quotes.
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const { Engine, Parser } = window;

  let settings = Engine.loadSettings();

  /* ---------------- navigation ---------------- */
  const screens = {
    home: $("#screen-home"),
    capture: $("#screen-capture"),
    quote: $("#screen-quote"),
    settings: $("#screen-settings")
  };
  const bottomBarScreens = new Set(["capture", "quote"]);

  function show(name) {
    Object.entries(screens).forEach(([k, el]) => { el.hidden = (k !== name); });
    document.body.classList.toggle("has-bottom-bar", bottomBarScreens.has(name));
    $$(".tab").forEach(t => t.classList.toggle("is-active", t.dataset.go === name));
    if (name === "home") renderRecent();
    if (name === "settings") fillSettingsForm();
    window.scrollTo(0, 0);
  }

  // generic [data-go] navigation
  $$("[data-go]").forEach(el => {
    el.addEventListener("click", (e) => {
      const dest = el.dataset.go;
      if (dest === "capture") { startCapture(); }
      else show(dest);
    });
  });
  $("#home-settings-btn").addEventListener("click", () => show("settings"));

  /* ---------------- toast ---------------- */
  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(() => { t.hidden = true; }, 2200);
  }

  /* ============================================================
     VOICE: text-to-speech (British male) + speech recognition
     ============================================================ */
  const synth = window.speechSynthesis;
  let voice = null;
  function pickVoice() {
    if (!synth) return;
    const voices = synth.getVoices();
    if (!voices.length) return;
    const byName = (re) => voices.find(v => re.test(v.name) && /en[-_]?GB/i.test(v.lang));
    voice =
      byName(/daniel/i) ||                       // Apple British male
      byName(/arthur|oliver|george|james/i) ||
      voices.find(v => /en[-_]?GB/i.test(v.lang) && /male/i.test(v.name)) ||
      voices.find(v => /UK English Male/i.test(v.name)) || // Google
      voices.find(v => /en[-_]?GB/i.test(v.lang)) ||
      voices.find(v => /en[-_]/i.test(v.lang)) ||
      voices[0] || null;
  }
  if (synth) {
    pickVoice();
    synth.onvoiceschanged = pickVoice;
  }
  function speak(text) {
    if (!synth) return;
    try {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      if (voice) u.voice = voice;
      u.rate = 1.0; u.pitch = 1.0;
      synth.speak(u);
    } catch (e) {}
  }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const sttSupported = !!SR;
  let recog = null, listening = false;
  let onResultCb = null;

  function ensureRecog() {
    if (!sttSupported || recog) return;
    recog = new SR();
    recog.lang = "en-GB";
    recog.interimResults = false;
    recog.maxAlternatives = 1;
    recog.onresult = (e) => {
      const txt = e.results[0][0].transcript;
      if (onResultCb) onResultCb(txt);
    };
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);
  }
  function setListening(on) {
    listening = on;
    $("#capture-mic").classList.toggle("is-live", on);
  }
  function startListening(cb) {
    onResultCb = cb;
    if (!sttSupported) { toast("Voice input not supported here — type instead."); return; }
    ensureRecog();
    try {
      if (synth) synth.cancel();   // don't listen to ourselves
      recog.start();
      setListening(true);
    } catch (e) { /* already started */ }
  }
  function stopListening() { try { recog && recog.stop(); } catch (e) {} setListening(false); }

  /* ============================================================
     CHAT UI helpers
     ============================================================ */
  const chat = $("#chat");
  function bubble(text, who) {
    const d = document.createElement("div");
    d.className = "bubble bubble--" + who;
    d.innerHTML = text;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
    return d;
  }
  function botSay(text, mute) {
    bubble(text, "bot");
    if (!mute) speak(stripTags(text));
  }
  function stripTags(s) { return s.replace(/<[^>]+>/g, ""); }

  function jobCardBubble(job) {
    const rows = job.rooms.map(r => {
      let val;
      if (r.type === "stairs") val = r.steps != null ? `${r.steps} steps` : "steps?";
      else val = (r.length && r.width) ? `${r.length} × ${r.width} m` : "size?";
      const extra = r.uplift ? " · uplift" : "";
      return `<div class="jobcard__row"><span class="q">${r.name}</span><span>${val}${extra}</span></div>`;
    }).join("");
    const tier = job.carpetTier ? cap(job.carpetTier) + " range" : "carpet?";
    bubble(
      `<div class="jobcard__row"><span class="q">Carpet</span><span>${tier}</span></div>${rows}`,
      "card"
    );
  }

  /* ============================================================
     CONVERSATION FLOW
     ============================================================ */
  let job = null;
  let mode = "idle";           // 'await_job' | 'await_answer' | 'done'
  let queue = [];
  let current = null;
  let retries = 0;

  function startCapture() {
    show("capture");
    chat.innerHTML = "";
    job = null; mode = "await_job"; queue = []; current = null; retries = 0;
    $("#capture-build").disabled = true;
    $("#capture-input").value = "";
    if (!hasPrices()) {
      botSay("Heads up — set your prices in Settings first so quotes are accurate.", true);
    }
    botSay("Right, let's quote a job. Tell me the rooms and sizes, and which carpet.");
    // first input is via a user tap (home mic already gave a gesture if used)
  }

  // Home hero mic: navigate + listen immediately (uses the tap gesture)
  $("#home-mic").addEventListener("click", () => {
    startCapture();
    setTimeout(() => startListening(handleUserText), 350);
  });

  // composer controls
  $("#capture-mic").addEventListener("click", () => {
    if (listening) { stopListening(); return; }
    startListening(handleUserText);
  });
  $("#capture-send").addEventListener("click", sendTyped);
  $("#capture-input").addEventListener("keydown", (e) => { if (e.key === "Enter") sendTyped(); });
  function sendTyped() {
    const v = $("#capture-input").value.trim();
    if (!v) return;
    $("#capture-input").value = "";
    handleUserText(v);
  }
  $("#capture-build").addEventListener("click", finalize);

  function handleUserText(text) {
    stopListening();
    bubble(escapeHtml(text), "me");

    if (mode === "await_job") {
      job = Parser.parse(text);
      if (!job.rooms.length) {
        botSay("I didn't catch any rooms there. Try: living room four by three, stairs thirteen steps.");
        return;
      }
      jobCardBubble(job);
      buildQueue();
      askNext();
      return;
    }

    if (mode === "await_answer" && current) {
      const ok = applyAnswer(current, text);
      if (!ok) {
        retries++;
        if (retries >= 2) { // accept defaults / skip after struggling
          botSay("No worries, I'll leave that for you to tweak later.", true);
          retries = 0; askNext();
        } else {
          botSay(current.reask);
          armReply();
        }
        return;
      }
      retries = 0;
      askNext();
      return;
    }
  }

  function buildQueue() {
    queue = [];
    if (!job.customer) {
      queue.push({ kind: "customer", q: "Who's the quote for? Say their name, or say skip.", reask: "Say the customer's name, or say skip." });
    }
    job.rooms.forEach(r => {
      if (r.type === "room" && (!r.length || !r.width)) {
        queue.push({ kind: "dims", target: r, q: `What are the dimensions of the ${r.name}? For example, four by three.`, reask: `Say the ${r.name} size as length by width, like four by three.` });
      }
      if (r.type === "stairs" && r.steps == null) {
        queue.push({ kind: "steps", target: r, q: `How many steps on the ${r.name.toLowerCase()}?`, reask: "Just say the number of steps, like thirteen." });
      }
    });
    if (!job.carpetTier) {
      queue.push({ kind: "tier", q: "Which carpet range — budget, mid-range, or premium?", reask: "Say budget, mid-range, or premium." });
    }
  }

  function askNext() {
    current = queue.shift() || null;
    if (!current) { finalize(); return; }
    mode = "await_answer";
    botSay(current.q);
    armReply();
  }

  // visually arm the mic (don't auto-start to stay reliable across browsers)
  function armReply() {
    $("#capture-build").disabled = (queue.length > 0 || current);
  }

  function applyAnswer(c, text) {
    if (c.kind === "customer") {
      if (/^\s*(skip|no|none|nobody|n\/a)\s*$/i.test(text)) { job.customer = ""; }
      else job.customer = titleCase(text.trim());
      return true;
    }
    if (c.kind === "dims") {
      const d = Parser.parseDimensions(text);
      if (!d) return false;
      c.target.length = d.length; c.target.width = d.width;
      return true;
    }
    if (c.kind === "steps") {
      const n = Parser.parseSteps(text);
      if (!n) return false;
      c.target.steps = n; return true;
    }
    if (c.kind === "tier") {
      const t = Parser.detectTier(text) ||
        (/budget|cheap|basic/i.test(text) ? "budget" :
         /premium|luxury|best/i.test(text) ? "premium" :
         /mid|standard|medium/i.test(text) ? "mid" : null);
      if (!t) return false;
      job.carpetTier = t; return true;
    }
    return true;
  }

  function finalize() {
    mode = "done"; current = null;
    $("#capture-build").disabled = true;
    // any rooms still missing sizes? give them a tiny default & warn, so a quote always builds
    let warned = false;
    job.rooms.forEach(r => {
      if (r.type === "room" && (!r.length || !r.width)) { r.length = r.length || 3; r.width = r.width || 3; warned = true; }
      if (r.type === "stairs" && r.steps == null) { r.steps = 13; warned = true; }
    });
    if (!job.carpetTier) job.carpetTier = "mid";
    if (warned) botSay("I filled a couple of gaps with sensible defaults — you can adjust in Settings or re-quote.", true);

    const q = Engine.buildQuote(job, settings);
    currentQuote = q;
    botSay(`Done. That comes to ${Engine.money(q.total)}${q.vatEnabled ? " including VAT" : ""}.`);
    setTimeout(() => { renderQuote(q); show("quote"); speakQuoteSummary(q); }, 700);
  }

  /* ============================================================
     QUOTE SCREEN
     ============================================================ */
  let currentQuote = null;

  function renderQuote(q) {
    const biz = q.business && q.business.name ? q.business.name : "Your Business";
    const bizMeta = [q.business && q.business.phone, q.business && q.business.email].filter(Boolean).join("  ·  ");
    const dateStr = new Date(q.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

    const roomsHtml = q.rooms.map(r => {
      const lines = r.lines.map(l =>
        `<div class="line"><span>${l.label}<br><span class="calc">${l.calc}</span></span><span class="amt">${Engine.money(l.amount)}</span></div>`
      ).join("");
      return `<div class="quote-room">
        <div class="quote-room__title"><span>${r.name}</span><span class="sub">${r.meta}</span></div>
        ${lines}
        <div class="line" style="font-weight:700;margin-top:4px"><span>Subtotal</span><span class="amt">${Engine.money(r.subtotal)}</span></div>
      </div>`;
    }).join("");

    const adj = q.adjustment || 0;
    const grand = Engine.round2(q.total + adj);

    const vatLine = q.vatEnabled
      ? `<div class="totline"><span>VAT (${q.vatRate}%)</span><span class="amt">${Engine.money(q.vat)}</span></div>` : "";
    const adjLine = `<div class="totline"><span>Adjustment (£)</span>
        <input id="adj-input" type="number" step="0.01" inputmode="decimal" value="${adj}"
        style="width:90px;text-align:right;background:var(--bg-elev);border:1px solid var(--line);color:var(--text);border-radius:8px;padding:6px"></div>`;

    $("#quote-doc").innerHTML = `
      <div class="quote-head">
        <div class="quote-biz">${escapeHtml(biz)}</div>
        ${bizMeta ? `<div class="quote-biz-meta">${escapeHtml(bizMeta)}</div>` : ""}
        <div class="quote-cust">
          <div><b>Quote for:</b> ${escapeHtml(q.customer || "—")}</div>
          <div class="muted small">${dateStr} · ${cap(q.carpetTier)} range carpet · ${q.rollWidth}m roll</div>
        </div>
      </div>
      ${roomsHtml}
      <div class="quote-totals">
        <div class="totline"><span>Net</span><span class="amt">${Engine.money(q.net)}</span></div>
        ${vatLine}
        ${adjLine}
        <div class="totline grand"><span>Total</span><span class="amt" id="grand-amt">${Engine.money(grand)}</span></div>
      </div>`;

    const adjInput = $("#adj-input");
    if (adjInput) adjInput.addEventListener("input", () => {
      const a = parseFloat(adjInput.value) || 0;
      currentQuote.adjustment = a;
      $("#grand-amt").textContent = Engine.money(Engine.round2(currentQuote.total + a));
    });
  }

  function speakQuoteSummary(q) {
    const grand = Engine.round2(q.total + (q.adjustment || 0));
    const who = q.customer ? " for " + q.customer : "";
    speak(`Here's the quote${who}. ${q.rooms.length} ${q.rooms.length === 1 ? "area" : "areas"}, total ${spokenMoney(grand)}. Tap share to send it.`);
  }
  $("#quote-speak").addEventListener("click", () => { if (currentQuote) speakQuoteSummary(currentQuote); });

  // Save
  $("#quote-save").addEventListener("click", () => {
    if (!currentQuote) return;
    Engine.saveQuote(currentQuote);
    toast("Quote saved");
    show("home");
  });

  // Share
  $("#quote-share").addEventListener("click", async () => {
    if (!currentQuote) return;
    const text = quoteAsText(currentQuote);
    if (navigator.share) {
      try { await navigator.share({ title: "Your carpet quote", text }); return; } catch (e) {}
    }
    // fallbacks
    try { await navigator.clipboard.writeText(text); toast("Quote copied to clipboard"); }
    catch (e) { window.location.href = "sms:?&body=" + encodeURIComponent(text); }
  });

  // Save PDF / print
  $("#quote-pdf").addEventListener("click", () => { window.print(); });

  function quoteAsText(q) {
    const grand = Engine.round2(q.total + (q.adjustment || 0));
    const biz = (q.business && q.business.name) || "Your Business";
    let s = `${biz}\nQuote for ${q.customer || "—"}\n`;
    s += `${cap(q.carpetTier)} range carpet, ${q.rollWidth}m roll\n\n`;
    q.rooms.forEach(r => { s += `${r.name} (${r.meta}): ${Engine.money(r.subtotal)}\n`; });
    if (q.vatEnabled) s += `\nNet ${Engine.money(q.net)} + VAT ${Engine.money(q.vat)}`;
    s += `\nTOTAL: ${Engine.money(grand)}`;
    return s;
  }

  /* ============================================================
     RECENT QUOTES (home)
     ============================================================ */
  function renderRecent() {
    const list = $("#recent-list");
    const quotes = Engine.loadQuotes();
    $("#home-business-name").textContent = (settings.business && settings.business.name) || "QuoteMate";
    if (!quotes.length) {
      list.innerHTML = `<div class="empty">No quotes yet.<br>Tap “Speak a quote” to make your first one.</div>`;
      return;
    }
    list.innerHTML = quotes.map(q => {
      const grand = Engine.round2(q.total + (q.adjustment || 0));
      const dateStr = new Date(q.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
      const areas = q.rooms.length + (q.rooms.length === 1 ? " area" : " areas");
      return `<button class="recent" data-id="${q.id}">
        <span class="recent__main">
          <div class="recent__name">${escapeHtml(q.customer || "No name")}</div>
          <div class="recent__meta">${dateStr} · ${areas} · ${cap(q.carpetTier)}</div>
        </span>
        <span class="recent__total">${Engine.money(grand)}</span>
      </button>`;
    }).join("");
    $$(".recent", list).forEach(btn => btn.addEventListener("click", () => {
      const q = Engine.loadQuotes().find(x => x.id === btn.dataset.id);
      if (q) { currentQuote = q; renderQuote(q); show("quote"); }
    }));
  }

  /* ============================================================
     SETTINGS
     ============================================================ */
  const form = $("#settings-form");
  function fillSettingsForm() {
    const s = settings;
    form.business.value = s.business.name || "";
    form.phone.value = s.business.phone || "";
    form.email.value = s.business.email || "";
    form.carpet_budget.value = s.prices.carpet.budget;
    form.carpet_mid.value = s.prices.carpet.mid;
    form.carpet_premium.value = s.prices.carpet.premium;
    form.underlay.value = s.prices.underlay;
    form.gripper.value = s.prices.gripper;
    form.doorBar.value = s.prices.doorBar;
    form.uplift.value = s.prices.uplift;
    form.labour.value = s.prices.labour;
    form.stairPerStep.value = s.prices.stairPerStep;
    form.rollWidth.value = String(s.rollWidth);
    form.wastePct.value = s.wastePct;
    form.vatEnabled.checked = !!s.vatEnabled;
    form.vatRate.value = s.vatRate;
  }
  function num(v, d) { const n = parseFloat(v); return isNaN(n) ? d : n; }
  $("#settings-save").addEventListener("click", () => {
    settings = {
      business: { name: form.business.value.trim(), phone: form.phone.value.trim(), email: form.email.value.trim() },
      rollWidth: num(form.rollWidth.value, 4),
      wastePct: num(form.wastePct.value, 10),
      vatEnabled: form.vatEnabled.checked,
      vatRate: num(form.vatRate.value, 20),
      prices: {
        carpet: {
          budget: num(form.carpet_budget.value, 9),
          mid: num(form.carpet_mid.value, 13),
          premium: num(form.carpet_premium.value, 18)
        },
        underlay: num(form.underlay.value, 4),
        gripper: num(form.gripper.value, 1.2),
        doorBar: num(form.doorBar.value, 8),
        uplift: num(form.uplift.value, 3),
        labour: num(form.labour.value, 5),
        stairPerStep: num(form.stairPerStep.value, 25)
      }
    };
    Engine.saveSettings(settings);
    toast("Settings saved");
    show("home");
  });

  function hasPrices() {
    return settings && settings.prices && settings.prices.carpet && settings.prices.carpet.mid > 0;
  }

  /* ============================================================
     small utils
     ============================================================ */
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function titleCase(s) { return s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()); }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function spokenMoney(n) {
    const pounds = Math.floor(n); const pence = Math.round((n - pounds) * 100);
    let s = pounds + (pounds === 1 ? " pound" : " pounds");
    if (pence) s += " " + pence;
    return s;
  }

  /* ---------------- boot ---------------- */
  show("home");
  // warm up voices on first interaction (some browsers need it)
  document.addEventListener("click", function warm() {
    pickVoice();
    document.removeEventListener("click", warm);
  }, { once: true });

})();
