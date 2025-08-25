import { useState } from "react";
import { Mail, Lock, Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
// Se você já tiver esse helper, use-o. Caso contrário, troque pelo fetch direto.
import { login } from "@/api";

// Página de Login seguindo o mesmo visual do Header (bg-card, border-border, etc.)
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await login(email, password);
      // Se "remember" estiver desmarcado, troque o localStorage por sessionStorage se preferir.
      if (!remember) {
        const token = localStorage.getItem("token");
        if (token) {
          sessionStorage.setItem("token", token);
          localStorage.removeItem("token");
        }
      }
      // Redireciona para a página inicial após login bem-sucedido
      window.location.href = "/";
      return res;
    } catch (err: any) {
      setError(err?.message || "Falha no login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100dvh)] bg-background flex flex-col">
      {/* Header opcional: se já estiver usando o Header global, pode remover esta área */}
      {/* <Header /> */}

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md bg-card border border-border shadow-lg shadow-black/10">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-medium tracking-wide">Acesso Seguro</span>
            </div>
            <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
            <CardDescription>Faça login para acessar cotações, licitações e fornecedores.</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 text-destructive px-3 py-2 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="voce@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-9"
                    required
                    minLength={4}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" checked={remember} onCheckedChange={(v: boolean) => setRemember(!!v)} />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">Lembrar de mim</Label>
                </div>

                <a href="/recuperar-senha" className="text-sm font-medium text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <div className="text-center text-sm text-muted-foreground">
              Não tem uma conta? {" "}
              <a href="/cadastro" className="text-primary hover:underline">Solicitar cadastro</a>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/logo-senac.png"
                alt="Logo Senac"
                className="h-8 w-auto opacity-80"
                loading="lazy"
              />
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SENAC — Sistema de Cotações
      </footer>
    </div>
  );
}
