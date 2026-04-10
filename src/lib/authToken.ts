const STORAGE_KEY = "excon_access_token";

let accessToken: string | null = null;

// Initialize from storage once (browser only)
try {
  const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
  accessToken = stored || null;
} catch {
  accessToken = null;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
  try {
    if (typeof window === "undefined") return;
    if (!token) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // ignore storage errors (private mode / disabled storage)
  }
}

export function getAccessToken() {
  return accessToken;
}

