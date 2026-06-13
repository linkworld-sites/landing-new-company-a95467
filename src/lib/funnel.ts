import { FUNNEL_COMPANY_ID, FUNNEL_API } from "@/funnel-config";

/**
 * Funnel tracking — logs the visitor journey to LinkWorld so the company
 * operator can see where visitors drop off and which source converts.
 * Fire-and-forget via sendBeacon (text/plain -> no CORS preflight). No-ops when
 * the company id is not configured, so the site never breaks. Managed file —
 * do not edit; only call track("intent")/track("convert") from components.
 */
const API = FUNNEL_API || "https://app.linkworld.ai";
const COMPANY_ID = FUNNEL_COMPANY_ID || "";

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
  if (typeof window === "undefined" || !COMPANY_ID || !step) return;
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
