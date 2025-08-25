// src/api.ts
const API_BASE = import.meta.env.VITE_API_BASE;

let accessToken: string | null = sessionStorage.getItem("token") || localStorage.getItem("token");

export function setAccessToken(t: string | null, remember = true) {
  accessToken = t;
  if (!t) { sessionStorage.removeItem("token"); localStorage.removeItem("token"); return; }
  if (remember) localStorage.setItem("token", t);
  else sessionStorage.setItem("token", t);
}

function authHeader() {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

async function request(path: string, init: RequestInit = {}, retry = true) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers || {}), ...authHeader() },
    credentials: "omit",
  });

  // tenta json
  let data: any = null;
  try { data = await res.json(); } catch {}

  if (res.ok) return data;

  // auto refresh se 401 e temos refresh salvo
  if (res.status === 401 && retry) {
    const refresh = sessionStorage.getItem("refresh") || localStorage.getItem("refresh");
    if (refresh) {
      const r = await fetch(`${API_BASE}/auth/refresh`, { method: "POST", headers: { Authorization: `Bearer ${refresh}` } });
      if (r.ok) {
        const j = await r.json();
        setAccessToken(j.token, !!localStorage.getItem("refresh"));
        return request(path, init, false);
      }
    }
  }

  const msg = data?.error || data?.message || `Erro ${res.status}`;
  throw new Error(msg);
}

/* endpoints */
export async function login(email: string, password: string, remember = true) {
  const data = await request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }, false);
  setAccessToken(data.token, remember);
  if (remember) localStorage.setItem("refresh", data.refresh); else sessionStorage.setItem("refresh", data.refresh);
  return data;
}
export const me = () => request("/auth/me");
export function logout() {
  setAccessToken(null);
  sessionStorage.removeItem("refresh"); localStorage.removeItem("refresh");
  // opcional: request("/auth/logout", { method: "POST" }).catch(()=>{});
}
export default { request, login, me, logout };
