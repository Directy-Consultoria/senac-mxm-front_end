import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken } from "@/api";

type User = { id: number; nome: string; role: string };
type AuthCtx = { user: User | null; loading: boolean; signOut: () => void; refreshMe: () => Promise<void> };
const Ctx = createContext<AuthCtx>({ user: null, loading: true, signOut: () => {}, refreshMe: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshMe() {
    try {
      const j = await api.me();
      setUser(j.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const t = sessionStorage.getItem("token") || localStorage.getItem("token");
    setAccessToken(t, !!localStorage.getItem("token"));
    refreshMe();
  }, []);

  function signOut() {
    api.logout();
    setUser(null);
    window.location.href = "/login";
  }

  return <Ctx.Provider value={{ user, loading, signOut, refreshMe }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
