/* ============================================================
   QuoteMate pricing engine
   Pure, deterministic carpet-quoting maths (no AI, always correct).
   Exposed as window.Engine
   ============================================================ */
(function () {
  "use strict";

  // ---- defaults (fitter can change all of these in Settings) ----
  const DEFAULT_SETTINGS = {
    business: { name: "", phone: "", email: "" },
    rollWidth: 4,      // metres (broadloom roll width)
    wastePct: 10,      // trim allowance added to ordered carpet length
    vatEnabled: false,
    vatRate: 20,
    prices: {
      carpet: { budget: 9.0, mid: 13.0, premium: 18.0 }, // £/m²
      underlay: 4.0,     // £/m²
      gripper: 1.2,      // £/m
      doorBar: 8.0,      // £ each
      uplift: 3.0,       // £/m² (uplift + disposal of old carpet)
      labour: 5.0,       // £/m² fitting
      stairPerStep: 25.0 // £/step (carpet + fitting bundled)
    }
  };

  function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

  function loadSettings() {
    try {
      const raw = localStorage.getItem("cq_settings");
      if (!raw) return deepClone(DEFAULT_SETTINGS);
      const s = JSON.parse(raw);
      // merge so new fields always exist
      return mergeDefaults(deepClone(DEFAULT_SETTINGS), s);
    } catch (e) {
      return deepClone(DEFAULT_SETTINGS);
    }
  }
  function mergeDefaults(def, over) {
    for (const k in over) {
      if (over[k] && typeof over[k] === "object" && !Array.isArray(over[k])) {
        def[k] = mergeDefaults(def[k] || {}, over[k]);
      } else if (over[k] !== undefined && over[k] !== null && over[k] !== "") {
        def[k] = over[k];
      }
    }
    return def;
  }
  function saveSettings(s) { localStorage.setItem("cq_settings", JSON.stringify(s)); }

  const money = (n) => "£" + (Math.round(n * 100) / 100).toFixed(2);
  const round2 = (n) => Math.round(n * 100) / 100;

  /* ----------------------------------------------------------
     Carpet ordering off a fixed-width roll.
     Carpet comes in a roll of fixed width (e.g. 4m). You cannot
     buy a custom width — so a room narrower than the roll still
     "costs" the full roll width. We pick the orientation that
     wastes the least, then add a trim allowance.
     Returns ordered length, billed area, waste, and a note.
  ---------------------------------------------------------- */
  function carpetOrder(length, width, rollWidth, wastePct) {
    const trim = 1 + (wastePct / 100);
    const options = [];

    // Orientation A: roll runs along `length`, must span `width` across roll
    if (width <= rollWidth) {
      const orderedLen = round2(length * trim);
      options.push({
        orderedLen,
        billedArea: round2(orderedLen * rollWidth),
        across: width,
        note: `${orderedLen.toFixed(2)}m off a ${rollWidth}m roll`
      });
    }
    // Orientation B: roll runs along `width`, must span `length` across roll
    if (length <= rollWidth) {
      const orderedLen = round2(width * trim);
      options.push({
        orderedLen,
        billedArea: round2(orderedLen * rollWidth),
        across: length,
        note: `${orderedLen.toFixed(2)}m off a ${rollWidth}m roll`
      });
    }

    if (options.length === 0) {
      // Both sides wider than the roll → needs seaming/joins.
      // Estimate: run drops along the shorter side; number of widths needed.
      const dropLen = Math.min(length, width);   // length of each drop
      const span = Math.max(length, width);      // total width to cover
      const widthsNeeded = Math.ceil(span / rollWidth);
      const orderedLen = round2(dropLen * widthsNeeded * trim);
      return {
        orderedLen,
        billedArea: round2(orderedLen * rollWidth),
        seamed: true,
        note: `needs ${widthsNeeded} widths joined (${orderedLen.toFixed(2)}m total) — please double-check`
      };
    }
    // choose least waste
    options.sort((a, b) => a.billedArea - b.billedArea);
    return options[0];
  }

  /* ---------- compute a single floor room ---------- */
  function computeRoom(room, s, carpetRate) {
    const L = room.length, W = room.width;
    const floorArea = round2(L * W);
    const order = carpetOrder(L, W, s.rollWidth, s.wastePct);
    const p = s.prices;
    const lines = [];

    // carpet
    lines.push({
      label: "Carpet",
      calc: `${order.billedArea.toFixed(2)} m² (${order.note})`,
      amount: round2(order.billedArea * carpetRate)
    });
    // underlay (actual area + small waste)
    const underlayArea = round2(floorArea * 1.05);
    lines.push({
      label: "Underlay",
      calc: `${underlayArea.toFixed(2)} m² × ${money(p.underlay)}`,
      amount: round2(underlayArea * p.underlay)
    });
    // gripper rod (perimeter minus a doorway)
    const doors = room.doors != null ? room.doors : 1;
    const perimeter = round2(2 * (L + W) - 0.8 * doors);
    lines.push({
      label: "Gripper rod",
      calc: `${perimeter.toFixed(1)} m × ${money(p.gripper)}`,
      amount: round2(perimeter * p.gripper)
    });
    // door bars
    if (doors > 0) {
      lines.push({
        label: doors > 1 ? `Door bars × ${doors}` : "Door bar",
        calc: `${doors} × ${money(p.doorBar)}`,
        amount: round2(doors * p.doorBar)
      });
    }
    // uplift / disposal
    if (room.uplift) {
      lines.push({
        label: "Uplift & disposal",
        calc: `${floorArea.toFixed(2)} m² × ${money(p.uplift)}`,
        amount: round2(floorArea * p.uplift)
      });
    }
    // fitting labour
    lines.push({
      label: "Fitting",
      calc: `${floorArea.toFixed(2)} m² × ${money(p.labour)}`,
      amount: round2(floorArea * p.labour)
    });

    const subtotal = round2(lines.reduce((a, l) => a + l.amount, 0));
    return {
      name: room.name,
      meta: `${L} × ${W} m · ${floorArea.toFixed(2)} m²`,
      lines,
      subtotal
    };
  }

  /* ---------- compute stairs (priced per step) ---------- */
  function computeStairs(room, s) {
    const steps = room.steps;
    const p = s.prices;
    const lines = [{
      label: "Stairs (carpet + fitting)",
      calc: `${steps} steps × ${money(p.stairPerStep)}`,
      amount: round2(steps * p.stairPerStep)
    }];
    if (room.uplift) {
      const upl = round2(steps * 0.5 * p.uplift); // ~0.5 m² per step
      lines.push({ label: "Uplift & disposal", calc: `${steps} steps`, amount: upl });
    }
    const subtotal = round2(lines.reduce((a, l) => a + l.amount, 0));
    return { name: room.name || "Stairs", meta: `${steps} steps`, lines, subtotal };
  }

  /* ---------- build a full quote ---------- */
  function buildQuote(job, s) {
    const tier = job.carpetTier || "mid";
    const carpetRate = (s.prices.carpet[tier] != null) ? s.prices.carpet[tier] : s.prices.carpet.mid;
    const rooms = [];
    for (const r of job.rooms) {
      if (r.type === "stairs") rooms.push(computeStairs(r, s));
      else rooms.push(computeRoom(r, s, carpetRate));
    }
    const net = round2(rooms.reduce((a, r) => a + r.subtotal, 0));
    const vat = s.vatEnabled ? round2(net * (s.vatRate / 100)) : 0;
    const total = round2(net + vat);
    return {
      id: "q_" + Date.now(),
      date: new Date().toISOString(),
      customer: job.customer || "",
      carpetTier: tier,
      carpetRate,
      rollWidth: s.rollWidth,
      business: deepClone(s.business),
      vatEnabled: s.vatEnabled,
      vatRate: s.vatRate,
      rooms,
      net, vat, total
    };
  }

  /* ---------- saved quotes ---------- */
  function loadQuotes() {
    try { return JSON.parse(localStorage.getItem("cq_quotes") || "[]"); }
    catch (e) { return []; }
  }
  function saveQuote(q) {
    const all = loadQuotes();
    const i = all.findIndex(x => x.id === q.id);
    if (i >= 0) all[i] = q; else all.unshift(q);
    localStorage.setItem("cq_quotes", JSON.stringify(all.slice(0, 50)));
  }

  window.Engine = {
    DEFAULT_SETTINGS,
    loadSettings, saveSettings,
    buildQuote, computeRoom, computeStairs, carpetOrder,
    loadQuotes, saveQuote,
    money, round2
  };
})();
