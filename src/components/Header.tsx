// Header.tsx
import { Search, Bell, Menu, LogOut, User as UserIcon, Settings, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet";
import { useMemo } from "react";

function getInitials(name?: string) {
  if (!name) return "US";
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]?.toUpperCase()).join("");
}

const NAV = [
  { label: "Início", href: "/" },
  { label: "Cotações", href: "#" },
  { label: "Licitações", href: "#" },
  { label: "Fornecedores", href: "#" },
  { label: "Análise", href: "/analise" },
  { label: "Mapa de Cotação", href: "/selecao" },
  { label: "Emitir Planilha", href: "/emitirPlanilhaCotacao" },
];

const Header = () => {
  const { user, signOut } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    signOut();
    nav("/login", { replace: true });
  }

  const initials = useMemo(
    () => getInitials((user as any)?.name || (user as any)?.nome),
    [user]
  );

  return (
    <header className="bg-card border-b border-border shadow-header sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Nav desktop */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <img src="/logo-senac.png" alt="Logo Senac" className="h-10 sm:h-12 w-auto" />
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Busca + ações */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2 min-w-[280px]">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar cotações, editais..." className="border-0 bg-transparent focus-visible:ring-0 px-0" />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
            </Button>

            {/* Perfil (Dropdown desktop) */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:flex items-center gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={(user as any)?.avatarUrl || ""} alt={(user as any)?.name || (user as any)?.nome || "Usuário"} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block max-w-[160px] truncate text-sm text-foreground/90">
                      {(user as any)?.name || (user as any)?.nome || "Usuário"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end">
                  <DropdownMenuLabel className="flex flex-col">
                    <span className="font-semibold truncate">
                      {(user as any)?.name || (user as any)?.nome || "Usuário"}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {(user as any)?.email || "email@exemplo.com"}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <a href="/perfil" className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" /> Meu perfil
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/assinaturas" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" /> Assinaturas
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/configuracoes" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" /> Configurações
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Menu Mobile (Sheet) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={(user as any)?.avatarUrl || ""} alt={(user as any)?.name || (user as any)?.nome || "Usuário"} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-semibold leading-tight truncate">
                        {(user as any)?.name || (user as any)?.nome || "Usuário"}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {(user as any)?.email || "email@exemplo.com"}
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 grid gap-2">
                  {NAV.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        location.pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-4 grid gap-2">
                  <a href="/perfil" className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2">
                    <UserIcon className="h-4 w-4" /> Meu perfil
                  </a>
                  <a href="/assinaturas" className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2">
                    <CreditCard className="h-4 w-4" /> Assinaturas
                  </a>
                  <a href="/configuracoes" className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Configurações
                  </a>
                  {user && (
                    <Button
                      variant="destructive"
                      className="justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
