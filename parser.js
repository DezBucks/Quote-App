/* ============================================================
   QuoteMate parser
   Turns natural spoken/typed job notes into a structured job.
   Exposed as window.Parser
   ============================================================ */
(function () {
  "use strict";

  const ONES = {
    zero: 0, oh: 0, o: 0, one: 1, two: 2, three: 3, four: 4, five: 5,
    six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
    thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
    eighteen: 18, nineteen: 19
  };
  const TENS = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };

  // Convert a run of number-words into a number, supporting "point".
  // e.g. ["four","point","two"] -> 4.2 ; ["twenty","one"] -> 21
  function wordsToNumber(tokens) {
    // integer part until "point"
    let i = 0, intPart = 0, used = false;
    while (i < tokens.length) {
      const t = tokens[i];
      if (t === "point" || t === ".") break;
      if (TENS[t] != null) { intPart += TENS[t]; used = true; i++; continue; }
      if (ONES[t] != null) { intPart += ONES[t]; used = true; i++; continue; }
      break;
    }
    let value = intPart;
    let consumed = i;
    if (tokens[i] === "point" || tokens[i] === ".") {
      i++;
      let dec = "";
      while (i < tokens.length) {
        const t = tokens[i];
        if (ONES[t] != null && ONES[t] < 10) { dec += ONES[t]; i++; used = true; continue; }
        // allow "twenty five" style after point? rare — stop
        break;
      }
      if (dec.length) { value = intPart + parseFloat("0." + dec); consumed = i; }
    }
    return used ? { value, consumed } : null;
  }

  // Normalise text: digits-with-words mix, symbols → words we understand.
  function normalise(text) {
    let t = " " + text.toLowerCase() + " ";
    t = t.replace(/[×x]/g, " by ");
    t = t.replace(/metres|meters|metre|meter|\bm\b/g, " ");
    t = t.replace(/&/g, " and ");
    // keep common combined areas together so we don't split on their "and"
    t = t.replace(/stairs?\s+and\s+landing/g, " stairs landing ");
    t = t.replace(/hall(way)?\s+and\s+landing/g, " hallway landing ");
    t = t.replace(/[,;]/g, " , ");
    t = t.replace(/\./g, " . "); // keep decimals? we handle digit decimals separately below
    return t;
  }

  // Pull plain numeric tokens like "4.2" too.
  function tokenize(seg) {
    // protect decimals like 4.2 before we split on spaces
    return seg
      .replace(/(\d)\s*\.\s*(\d)/g, "$1.$2")
      .split(/\s+/)
      .filter(Boolean);
  }

  // Find numbers (word or digit) in a token list; returns [{value, index}]
  function extractNumbers(tokens) {
    const nums = [];
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (/^\d+(\.\d+)?$/.test(t)) { nums.push({ value: parseFloat(t), index: i, len: 1 }); continue; }
      if (ONES[t] != null || TENS[t] != null) {
        const r = wordsToNumber(tokens.slice(i));
        if (r) { nums.push({ value: r.value, index: i, len: r.consumed }); i += r.consumed - 1; }
      }
    }
    return nums;
  }

  const ROOM_WORDS = [
    { re: /living\s*room|lounge|sitting\s*room|front\s*room/, name: "Living room" },
    { re: /dining\s*room/, name: "Dining room" },
    { re: /master\s*bedroom/, name: "Master bedroom" },
    { re: /bedroom|bed\s*room/, name: "Bedroom" },
    { re: /hall\s*way|hallway|\bhall\b|landing\s*and\s*hall/, name: "Hallway" },
    { re: /landing/, name: "Landing" },
    { re: /kitchen/, name: "Kitchen" },
    { re: /bathroom/, name: "Bathroom" },
    { re: /study|office/, name: "Study" },
    { re: /conservatory/, name: "Conservatory" },
    { re: /nursery/, name: "Nursery" },
    { re: /\broom\b/, name: "Room" }
  ];

  function detectTier(text) {
    if (/premium|luxury|high\s*end|top\s*range|best/.test(text)) return "premium";
    if (/budget|cheap|basic|entry|economy/.test(text)) return "budget";
    if (/mid|standard|medium/.test(text)) return "mid";
    return null;
  }

  // main entry
  function parse(text) {
    const original = text || "";
    const norm = normalise(original);
    const tierGlobal = detectTier(norm);

    // split into segments on commas, " and ", and " then "
    const segments = norm.split(/\s,\s|\sand\s|\sthen\s|\splus\s/).map(s => s.trim()).filter(Boolean);

    const rooms = [];
    const usedCounts = {};

    for (const seg of segments) {
      const tokens = tokenize(seg);
      const joined = " " + tokens.join(" ") + " ";

      // stairs?
      const stairMatch = /stair|step/.test(joined);
      // dimensions: look for "<num> by <num>"
      const byIdx = tokens.indexOf("by");
      let dims = null;
      if (byIdx > -1) {
        const before = extractNumbers(tokens.slice(0, byIdx));
        const after = extractNumbers(tokens.slice(byIdx + 1));
        if (before.length && after.length) {
          dims = { length: before[before.length - 1].value, width: after[0].value };
        }
      }
      const nums = extractNumbers(tokens);

      // room name
      let roomName = null;
      for (const rw of ROOM_WORDS) {
        if (rw.re.test(joined)) { roomName = rw.name; break; }
      }

      const uplift = /uplift|take\s*away|dispose|remove\s*(the\s*)?old|rip\s*up|old\s*carpet/.test(joined);

      if (stairMatch) {
        // steps count = a number near "step"
        let steps = null;
        if (nums.length) steps = Math.round(nums[0].value);
        rooms.push({ type: "stairs", name: roomName === "Landing" ? "Stairs & landing" : "Stairs", steps: steps, uplift });
        // a "landing" mentioned alongside with its own dims handled if separate segment
        continue;
      }

      if (roomName || dims) {
        const name = uniqueName(roomName || "Room", usedCounts);
        rooms.push({
          type: "room",
          name,
          length: dims ? dims.length : null,
          width: dims ? dims.width : null,
          uplift,
          doors: 1
        });
      } else if (uplift && rooms.length) {
        // a stand-alone "uplift the old carpet" → apply to the last floor room
        let i = rooms.length - 1;
        while (i >= 0 && rooms[i].type !== "room") i--;
        if (i < 0) i = rooms.length - 1;
        rooms[i].uplift = true;
      }
    }

    return {
      rooms,
      carpetTier: tierGlobal,
      raw: original
    };
  }

  function uniqueName(base, counts) {
    counts[base] = (counts[base] || 0) + 1;
    return counts[base] === 1 ? base : `${base} ${counts[base]}`;
  }

  // parse a short answer to "what are the dimensions" → {length,width}
  function parseDimensions(text) {
    const norm = normalise(text);
    const tokens = tokenize(norm);
    const byIdx = tokens.indexOf("by");
    if (byIdx > -1) {
      const before = extractNumbers(tokens.slice(0, byIdx));
      const after = extractNumbers(tokens.slice(byIdx + 1));
      if (before.length && after.length) {
        return { length: before[before.length - 1].value, width: after[0].value };
      }
    }
    const nums = extractNumbers(tokens);
    if (nums.length >= 2) return { length: nums[0].value, width: nums[1].value };
    return null;
  }

  function parseSteps(text) {
    const nums = extractNumbers(tokenize(normalise(text)));
    return nums.length ? Math.round(nums[0].value) : null;
  }

  window.Parser = { parse, parseDimensions, parseSteps, detectTier, wordsToNumber, extractNumbers };
})();
