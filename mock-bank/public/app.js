const I18N = {
  en: {
    kicker: "Programmable Money for Buddhist Merit",
    title: "Every baht the temple spends, verified on-chain.",
    tagline: "Sila Protocol is a smart-contract rule engine that <strong>allows</strong> spending that serves the temple — utilities, hospitals, food, schools — and <strong>blocks</strong> everything else, before the money moves.",
    statAllowed: "approved on-chain",
    statBlocked: "blocked by the rule",
    engineLabel: "Engine",
    featGoodTitle: "Approved",
    featGoodBody: "Utilities · Hospitals · Schools · Groceries · Charities",
    featRuleTitle: "The Sila Rule",
    featRuleBody: "An on-chain whitelist of merchant categories. The contract reverts before non-merit spending can settle.",
    featBadTitle: "Blocked",
    featBadBody: "Jewelry · Gambling · Alcohol · Anything not on the whitelist",
    presetTitle: "Try a transaction",
    presetDesc: "Each click runs through Mock Bank → Rust Integrity Engine → SilaIntegrityCore on a local EVM. Approved transactions get an on-chain tx hash; forbidden ones revert.",
    groupGood: "Useful for the temple",
    groupBad: "Forbidden by the rule",
    customTitle: "Or send a custom transaction",
    customLabelPh: "Label",
    customMccPh: "MCC",
    customAmtPh: "Amount (THB)",
    sendBtn: "Send",
    receiptTitle: "Last receipt",
    receiptEmpty: "No transactions yet — click any button on the left.",
    historyTitle: "Live ledger",
    historyDesc: "Every approved transaction is a real on-chain transaction. Every blocked one is a smart-contract revert.",
    historyWaiting: "Waiting for first transaction...",
    historyEmpty: "No transactions yet.",
    footer: "POC for the 2026 e-Donation mandate. <strong>DEMO ONLY</strong> — no real funds, mock bank API, local Hardhat node.",
    thTime: "Time", thLabel: "Label", thMcc: "MCC", thCategory: "Category",
    thAmount: "Amount", thStatus: "Status", thDetail: "Detail",
    statusChecking: "checking...",
    statusOnline: "online",
    statusOnlineNoContract: "online (no contract)",
    statusOffline: "offline",
    sending: "Sending → Bank → Engine → Contract...",
    networkError: "Network error: ",
    receiptStatus: "STATUS",
    receiptLabel: "LABEL",
    receiptMcc: "MCC",
    receiptAmount: "AMOUNT",
    receiptReason: "REASON",
    receiptTxHash: "TX HASH",
    receiptBlock: "BLOCK",
    expectsApproved: "should approve",
    expectsBlocked: "should block",
    badgeApproved: "approved",
    badgeBlocked: "blocked",
    badgeError: "error",
    customAlert: "Provide a numeric MCC and a positive amount.",
    presets: {
      electricity: "Pay Electricity Bill",
      hospital:    "Hospital Donation",
      school:      "School Supplies",
      groceries:   "Groceries for Kitchen",
      rolex:       "Gold Rolex",
      casino:      "Casino Chips",
      bar:         "Bar Tab",
    },
    categories: {
      "Utilities": "Utilities",
      "Education": "Education",
      "Hospitals": "Hospitals",
      "Groceries": "Groceries",
      "Charitable Organizations": "Charitable Organizations",
    },
    reasonApproved: "Aligns with merit principles",
    reasonBlocked: "SILA_PROTOCOL: NON_MERIT_EXPENDITURE_DETECTED",
  },
  th: {
    kicker: "เงินตั้งโปรแกรมได้ เพื่อบุญในพุทธศาสนา",
    title: "ทุกบาทที่วัดใช้จ่าย ตรวจสอบได้บนบล็อกเชน",
    tagline: "Sila Protocol คือกลไกสมาร์ทคอนแทรกต์ที่ <strong>อนุญาต</strong> รายจ่ายที่เกื้อกูลวัด — สาธารณูปโภค โรงพยาบาล อาหาร โรงเรียน — และ <strong>ระงับ</strong> รายจ่ายอื่นทั้งหมด ก่อนเงินจะเคลื่อนย้าย",
    statAllowed: "อนุมัติบนบล็อกเชน",
    statBlocked: "ถูกระงับโดยกฎ",
    engineLabel: "เอนจิน",
    featGoodTitle: "อนุมัติ",
    featGoodBody: "สาธารณูปโภค · โรงพยาบาล · โรงเรียน · ของชำ · การกุศล",
    featRuleTitle: "หลักศีล",
    featRuleBody: "บัญชีรายชื่อหมวดหมู่ร้านค้าบนบล็อกเชน สัญญาจะ revert ก่อนรายจ่ายผิดศีลจะสำเร็จ",
    featBadTitle: "ระงับ",
    featBadBody: "เครื่องประดับ · พนัน · แอลกอฮอล์ · ทุกอย่างที่ไม่อยู่ในรายการ",
    presetTitle: "ลองทำธุรกรรม",
    presetDesc: "ทุกคลิกจะถูกส่งผ่าน Mock Bank → Rust Integrity Engine → SilaIntegrityCore บน EVM ภายในเครื่อง รายการที่อนุมัติจะได้ tx hash จริง รายการที่ห้ามจะถูก revert",
    groupGood: "เป็นประโยชน์ต่อวัด",
    groupBad: "ต้องห้ามตามกฎ",
    customTitle: "หรือส่งรายการแบบกำหนดเอง",
    customLabelPh: "ชื่อรายการ",
    customMccPh: "MCC",
    customAmtPh: "จำนวน (บาท)",
    sendBtn: "ส่ง",
    receiptTitle: "ใบเสร็จล่าสุด",
    receiptEmpty: "ยังไม่มีธุรกรรม — กดปุ่มทางซ้ายเพื่อเริ่ม",
    historyTitle: "บัญชีธุรกรรมเรียลไทม์",
    historyDesc: "รายการที่อนุมัติคือธุรกรรมจริงบนบล็อกเชน รายการที่ระงับคือสมาร์ทคอนแทรกต์ revert",
    historyWaiting: "รอรายการแรก...",
    historyEmpty: "ยังไม่มีธุรกรรม",
    footer: "ต้นแบบสำหรับนโยบาย e-Donation ปี 2026 — <strong>เพื่อการสาธิตเท่านั้น</strong> ไม่มีเงินจริง ใช้ Mock Bank API และ Hardhat node ภายในเครื่อง",
    thTime: "เวลา", thLabel: "รายการ", thMcc: "MCC", thCategory: "หมวดหมู่",
    thAmount: "จำนวน", thStatus: "สถานะ", thDetail: "รายละเอียด",
    statusChecking: "กำลังตรวจสอบ...",
    statusOnline: "ออนไลน์",
    statusOnlineNoContract: "ออนไลน์ (ยังไม่มีสัญญา)",
    statusOffline: "ออฟไลน์",
    sending: "กำลังส่ง → ธนาคาร → เอนจิน → สัญญา...",
    networkError: "ข้อผิดพลาดเครือข่าย: ",
    receiptStatus: "สถานะ",
    receiptLabel: "รายการ",
    receiptMcc: "MCC",
    receiptAmount: "จำนวน",
    receiptReason: "เหตุผล",
    receiptTxHash: "TX HASH",
    receiptBlock: "บล็อก",
    expectsApproved: "ควรจะอนุมัติ",
    expectsBlocked: "ควรจะระงับ",
    badgeApproved: "อนุมัติ",
    badgeBlocked: "ระงับ",
    badgeError: "ผิดพลาด",
    customAlert: "กรุณาระบุ MCC เป็นตัวเลข และจำนวนเงินมากกว่าศูนย์",
    presets: {
      electricity: "จ่ายค่าไฟฟ้า",
      hospital:    "บริจาคให้โรงพยาบาล",
      school:      "อุปกรณ์การเรียน",
      groceries:   "ของชำสำหรับโรงครัว",
      rolex:       "นาฬิกา Rolex ทองคำ",
      casino:      "ชิปบ่อนคาสิโน",
      bar:         "ค่าบาร์/แอลกอฮอล์",
    },
    categories: {
      "Utilities": "สาธารณูปโภค",
      "Education": "การศึกษา",
      "Hospitals": "โรงพยาบาล",
      "Groceries": "ของชำ",
      "Charitable Organizations": "องค์กรการกุศล",
    },
    reasonApproved: "สอดคล้องกับหลักบุญ",
    reasonBlocked: "SILA_PROTOCOL: ตรวจพบรายจ่ายที่ไม่เป็นบุญ",
  },
};

const PRESETS_GOOD = [
  { key: "electricity", mcc: 4900, amount: 1200,   expect: "approved" },
  { key: "hospital",    mcc: 8062, amount: 5000,   expect: "approved" },
  { key: "school",      mcc: 8211, amount: 2500,   expect: "approved" },
  { key: "groceries",   mcc: 5411, amount: 800,    expect: "approved" },
];
const PRESETS_BAD = [
  { key: "rolex",       mcc: 5944, amount: 850000, expect: "blocked" },
  { key: "casino",      mcc: 7995, amount: 100000, expect: "blocked" },
  { key: "bar",         mcc: 5813, amount: 4500,   expect: "blocked" },
];

let lang = (() => {
  const saved = localStorage.getItem("sila.lang");
  if (saved === "en" || saved === "th") return saved;
  return (navigator.language || "en").toLowerCase().startsWith("th") ? "th" : "en";
})();

let lastHistoryKey = "";          // signature of last-rendered history (for fade-in detection)
let approvedCount = 0;
let blockedCount  = 0;
let approvedDisplayed = 0;
let blockedDisplayed  = 0;

const t = (k) => I18N[lang][k] ?? I18N.en[k] ?? k;
const tCategory = (cat) => {
  if (!cat) return "";
  return I18N[lang].categories[cat] ?? cat;
};
const tReason = (reason) => {
  if (!reason) return "";
  if (reason === "Transaction aligns with merit principles") return t("reasonApproved");
  if (reason.startsWith("SILA_PROTOCOL: NON_MERIT")) return t("reasonBlocked");
  return reason;
};
const tBadge = (status) => {
  if (status === "approved") return t("badgeApproved");
  if (status === "blocked")  return t("badgeBlocked");
  if (status === "error")    return t("badgeError");
  return status;
};

const fmtTHB = (n) => "฿" + Number(n).toLocaleString(lang === "th" ? "th-TH" : "en-US");
const fmtTime = (iso) => {
  try { return new Date(iso).toLocaleTimeString(lang === "th" ? "th-TH" : "en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }); }
  catch { return iso; }
};

function applyI18n() {
  document.documentElement.lang = lang;
  document.title = "Sila Protocol — " + t("title");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const html = el.getAttribute("data-i18n-html");
    const v = t(key);
    if (html) el.innerHTML = v;
    else el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });

  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-lang") === lang);
  });

  renderPresets();
  renderCounters(true);
  refreshHistory();
  refreshHealth();
}

function setLang(next) {
  if (next !== "en" && next !== "th") return;
  lang = next;
  localStorage.setItem("sila.lang", lang);
  applyI18n();
}

/* --- Presets ------------------------------------------------------- */

function renderPresetsInto(rootId, list) {
  const root = document.getElementById(rootId);
  if (!root) return;
  root.innerHTML = "";
  list.forEach((p) => {
    const b = document.createElement("button");
    b.className = "preset expect-" + p.expect;
    const labelText = I18N[lang].presets[p.key];
    const expectsText = p.expect === "approved" ? t("expectsApproved") : t("expectsBlocked");
    b.innerHTML = `<span class="label"></span><span class="sub"></span>`;
    b.querySelector(".label").textContent = labelText;
    b.querySelector(".sub").textContent = `MCC ${p.mcc} · ${fmtTHB(p.amount)} · ${expectsText}`;
    b.onclick = () => {
      b.classList.remove("flash-good","flash-bad");
      void b.offsetWidth;
      b.classList.add(p.expect === "approved" ? "flash-good" : "flash-bad");
      sendTransaction({ ...p, label: labelText });
    };
    root.appendChild(b);
  });
}
function renderPresets() {
  renderPresetsInto("presetsGood", PRESETS_GOOD);
  renderPresetsInto("presetsBad",  PRESETS_BAD);
}

/* --- Transaction flow --------------------------------------------- */

async function sendTransaction({ label, mcc, amount }) {
  const last = document.getElementById("lastReceipt");
  last.className = "receipt pending";
  last.innerHTML = `<div class="receipt-icon">↻</div><div class="receipt-body"></div>`;
  last.querySelector(".receipt-body").textContent = t("sending");
  document.getElementById("lastQr").innerHTML = "";

  try {
    const r = await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, mcc, amount }),
    });
    const data = await r.json();
    showReceipt(data);
    refreshHistory();
    refreshHealth();
  } catch (e) {
    last.className = "receipt error";
    last.innerHTML = `<div class="receipt-icon">!</div><div class="receipt-body"></div>`;
    last.querySelector(".receipt-body").textContent = t("networkError") + (e?.message ?? e);
  }
}

function showReceipt(data) {
  const last = document.getElementById("lastReceipt");
  const status = (data.status || "error").toLowerCase();
  last.className = "receipt " + status;
  const icon = status === "approved" ? "✓" : status === "blocked" ? "✕" : "!";

  const lines = [
    `${t("receiptStatus")}:    ${tBadge(status).toUpperCase()}`,
    `${t("receiptLabel")}:     ${data.label}`,
    `${t("receiptMcc")}:       ${data.mcc}${data.category ? "  (" + tCategory(data.category) + ")" : ""}`,
    `${t("receiptAmount")}:    ${fmtTHB(data.amount)}`,
    data.reason ? `${t("receiptReason")}:    ${tReason(data.reason)}` : null,
    data.tx_hash ? `${t("receiptTxHash")}:   ${data.tx_hash}` : null,
    data.block != null ? `${t("receiptBlock")}:     ${data.block}` : null,
  ].filter(Boolean);

  last.innerHTML = `<div class="receipt-icon"></div><div class="receipt-body"></div>`;
  last.querySelector(".receipt-icon").textContent = icon;
  last.querySelector(".receipt-body").textContent = lines.join("\n");

  const qrBox = document.getElementById("lastQr");
  qrBox.innerHTML = data.qr ? `<img alt="PromptPay QR" src="${data.qr}" />` : "";
}

/* --- History ------------------------------------------------------- */

async function refreshHistory() {
  try {
    const r = await fetch("/api/history");
    const data = await r.json();
    const tbody = document.getElementById("historyBody");
    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="muted">${escapeHtml(t("historyEmpty"))}</td></tr>`;
      lastHistoryKey = "";
      return;
    }

    const newKey = data.map(e => e.timestamp).join("|");
    const isNewer = newKey !== lastHistoryKey;
    const newestStamp = data[0]?.timestamp;
    const prevNewest = lastHistoryKey.split("|")[0] || "";

    tbody.innerHTML = data.map((e) => {
      const detail = e.tx_hash
        ? `<span class="detail">${e.tx_hash.slice(0,18)}…  block ${e.block ?? "?"}</span>`
        : `<span class="detail">${escapeHtml(tReason(e.reason))}</span>`;
      const isFresh = isNewer && e.timestamp === newestStamp && e.timestamp !== prevNewest;
      return `<tr${isFresh ? ' class="fade-in"' : ''}>
        <td class="mono">${fmtTime(e.timestamp)}</td>
        <td>${escapeHtml(e.label)}</td>
        <td class="mono">${e.mcc}</td>
        <td>${escapeHtml(tCategory(e.category))}</td>
        <td class="mono">${fmtTHB(e.amount)}</td>
        <td><span class="badge ${e.status}">${escapeHtml(tBadge(e.status))}</span></td>
        <td>${detail}</td>
      </tr>`;
    }).join("");

    lastHistoryKey = newKey;

    // also update local counters from history (fast feedback even before /health refresh)
    let a = 0, b = 0;
    data.forEach(e => { if (e.status === "approved") a++; else if (e.status === "blocked") b++; });
    approvedCount = Math.max(approvedCount, a);
    blockedCount  = Math.max(blockedCount,  b);
    renderCounters(false);
  } catch {
    // engine not yet up — keep last render
  }
}

/* --- Counters (animated) ------------------------------------------ */

function renderCounters(snap) {
  animateNum("approvedNum", approvedDisplayed, approvedCount, snap);
  animateNum("blockedNum",  blockedDisplayed,  blockedCount,  snap);
  approvedDisplayed = approvedCount;
  blockedDisplayed  = blockedCount;
}

function animateNum(id, from, to, snap) {
  const el = document.getElementById(id);
  if (!el) return;
  if (snap || from === to) { el.textContent = String(to); return; }
  const start = performance.now();
  const dur = 600;
  function step(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    const v = Math.round(from + (to - from) * eased);
    el.textContent = String(v);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* --- Health -------------------------------------------------------- */

async function refreshHealth() {
  const el = document.getElementById("engineStatus");
  const pill = document.getElementById("enginePill");
  const addrEl = document.getElementById("contractAddr");
  if (!el) return;
  try {
    const r = await fetch("/api/health");
    const j = await r.json();
    if (j.ok && j.engine?.contract) {
      el.textContent = t("statusOnline");
      pill?.classList.remove("offline");
      if (addrEl) addrEl.textContent = j.engine.contract;
      // counters from on-chain (authoritative; client-side is just for instant feedback)
      if (typeof j.engine.approved_count === "number") approvedCount = j.engine.approved_count;
      if (typeof j.engine.blocked_count  === "number") blockedCount  = j.engine.blocked_count;
      // note: contract reverts roll back state, so blocked_count stays 0 on-chain by design.
      // We still show client-side blockedCount which is more useful for the demo.
      renderCounters(false);
    } else {
      el.textContent = t("statusOnlineNoContract");
      pill?.classList.remove("offline");
    }
  } catch {
    el.textContent = t("statusOffline");
    pill?.classList.add("offline");
  }
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/* --- Wire up ------------------------------------------------------- */

document.querySelectorAll(".lang-btn").forEach((b) => {
  b.addEventListener("click", () => setLang(b.getAttribute("data-lang")));
});

document.getElementById("customSend").onclick = () => {
  const label = document.getElementById("customLabel").value.trim() || "Custom";
  const mcc = parseInt(document.getElementById("customMcc").value, 10);
  const amount = parseFloat(document.getElementById("customAmount").value);
  if (!Number.isFinite(mcc) || !Number.isFinite(amount) || amount <= 0) {
    alert(t("customAlert"));
    return;
  }
  sendTransaction({ label, mcc, amount });
};

applyI18n();
setInterval(refreshHistory, 2000);
setInterval(refreshHealth, 5000);
