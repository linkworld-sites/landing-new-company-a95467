import {
  FUNNEL_COMPANY_ID,
  FUNNEL_API,
  FUNNEL_META_PIXEL,
  FUNNEL_LINKEDIN_PIXEL,
} from "@/funnel-config";

/**
 * Funnel tracking — logs the visitor journey to LinkWorld so the company
 * operator can see where visitors drop off and which source converts, and fires
 * the Meta / LinkedIn pixels for retargeting. Fire-and-forget via sendBeacon
 * (text/plain -> no CORS preflight). No-ops when not configured, so the site
 * never breaks. Managed file — do not edit; only call track("intent")/
 * track("convert") from components.
 */
const API = FUNNEL_API || "https://app.linkworld.ai";
const COMPANY_ID = FUNNEL_COMPANY_ID || "";

let pixelsReady = false;

function ensurePixels(): void {
  if (pixelsReady || typeof window === "undefined") return;
  pixelsReady = true;
  const w = window as any;
  if (FUNNEL_META_PIXEL && !w.fbq) {
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script");
    /* eslint-enable */
    w.fbq("init", FUNNEL_META_PIXEL);
    w.fbq("track", "PageView");
  }
  if (FUNNEL_LINKEDIN_PIXEL && !w._linkedin_data_partner_ids) {
    w._linkedin_data_partner_ids = [FUNNEL_LINKEDIN_PIXEL];
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    document.head.appendChild(s);
  }
}

function firePixel(step: string): void {
  const w = window as any;
  if (!w.fbq) return;
  // Standard events for the steps Meta optimizes toward; the rest are custom.
  if (step === "convert") w.fbq("track", "Lead");
  else if (step === "intent") w.fbq("track", "InitiateCheckout");
  else w.fbq("trackCustom", `funnel_${step}`);
}

function sessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let s = sessionStorage.getItem("lw_funnel_session");
    if (!s) {
      s = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem("lw_funnel_session", s);
    }
    return s;
  } catch {
    return "anon";
  }
}

function utm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign"]) {
    const v = q.get(k);
    if (v) out[k] = v;
  }
  return out;
}

export function track(step: string, data: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || !step) return;
  ensurePixels();
  firePixel(step);
  if (!COMPANY_ID) return; // the LinkWorld funnel beacon needs the company id
  const u = utm();
  const body = JSON.stringify({
    step,
    session_id: sessionId(),
    utm_source: u.utm_source,
    event_data: { ...u, ...data, path: window.location.pathname },
  });
  const url = `${API}/api/public/funnel/${COMPANY_ID}/event`;
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: "text/plain" }));
    } else {
      void fetch(url, { method: "POST", body, keepalive: true, mode: "no-cors" });
    }
  } catch {
    /* telemetry must never throw */
  }
}
