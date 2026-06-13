const tracked = new Set<string>();

export function track(step: 'landing' | 'engage' | 'intent' | 'convert') {
  if (typeof window === 'undefined') return;
  if (tracked.has(step)) return;
  tracked.add(step);

  try {
    const payload = {
      step,
      path: window.location.pathname,
      ts: Date.now(),
    };
    navigator.sendBeacon('/api/funnel', JSON.stringify(payload));
  } catch {
    // silent — tracking must never break the page
  }
}
