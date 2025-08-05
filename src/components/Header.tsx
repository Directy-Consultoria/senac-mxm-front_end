import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-header sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Navegação */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <img
                src="/logo-senac.png"
                alt="Logo Senac"
                className="h-10 sm:h-12 w-auto"
              />
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Início
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Cotações
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Licitações
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Fornecedores
              </a>
              <a
                href="/analise"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Análise
              </a>
            </nav>
          </div>

          {/* Busca e Ações */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-background border border-border rounded-lg px-3 py-2 min-w-[300px]">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cotações, editais..."
                className="border-0 bg-transparent focus-visible:ring-0 px-0"
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
