import { useState } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import QuickStats from "@/components/QuickStats";
import FilterSidebar from "@/components/FilterSidebar";
import CotacaoCard from "@/components/CotacaoCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockCotacoes = [
  {
    id: "1",
    titulo: "Aquisição de Equipamentos de Informática",
    numero: "001/2024",
    status: "em_andamento" as const,
    dataAbertura: "15/01/2024",
    dataEncerramento: "25/01/2024",
    valor: "R$ 150.000,00",
    modalidade: "Cotação Eletrônica",
    unidade: "SENAC Vitória",
    objeto: "Aquisição de 50 notebooks, 20 desktops e periféricos para laboratórios de informática"
  },
  {
    id: "2",
    titulo: "Serviços de Limpeza e Conservação",
    numero: "002/2024",
    status: "em_andamento" as const,
    dataAbertura: "10/01/2024",
    dataEncerramento: "20/01/2024",
    valor: "R$ 80.000,00",
    modalidade: "Pregão Eletrônico",
    unidade: "SENAC Vila Velha",
    objeto: "Contratação de empresa especializada em serviços de limpeza e conservação predial"
  },
  {
    id: "3",
    titulo: "Material de Expediente",
    numero: "003/2024",
    status: "aguardando" as const,
    dataAbertura: "20/01/2024",
    dataEncerramento: "30/01/2024",
    valor: "R$ 25.000,00",
    modalidade: "Cotação Eletrônica",
    unidade: "SENAC Cachoeiro",
    objeto: "Aquisição de material de expediente e suprimentos para escritório"
  },
  {
    id: "4",
    titulo: "Reforma de Salas de Aula",
    numero: "004/2024",
    status: "em_andamento" as const,
    dataAbertura: "05/01/2024",
    dataEncerramento: "18/01/2024",
    valor: "R$ 320.000,00",
    modalidade: "Concorrência",
    unidade: "SENAC Linhares",
    objeto: "Reforma e modernização de 8 salas de aula incluindo mobiliário e equipamentos audiovisuais"
  },
  {
    id: "5",
    titulo: "Sistema de Segurança Eletrônica",
    numero: "005/2024",
    status: "suspensa" as const,
    dataAbertura: "12/01/2024",
    dataEncerramento: "22/01/2024",
    valor: "R$ 95.000,00",
    modalidade: "Pregão Eletrônico",
    unidade: "SENAC Colatina",
    objeto: "Implementação de sistema de monitoramento por câmeras e controle de acesso"
  },
  {
    id: "6",
    titulo: "Licenças de Software",
    numero: "006/2024",
    status: "encerrada" as const,
    dataAbertura: "01/01/2024",
    dataEncerramento: "10/01/2024",
    valor: "R$ 45.000,00",
    modalidade: "Cotação Eletrônica",
    unidade: "SENAC Vitória",
    objeto: "Aquisição de licenças de software educacional e produtividade para laboratórios"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCotacoes = mockCotacoes.filter(cotacao =>
    cotacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cotacao.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cotacao.objeto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Estatísticas Rápidas */}
        <QuickStats />
        
        {/* Título e Busca */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Cotações em Andamento
            </h1>
            <p className="text-muted-foreground">
              Acompanhe todas as cotações e processos licitatórios do SENAC
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cotações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 min-w-[300px]"
              />
            </div>
            <Button variant="primaryHoverAccent">
              Nova Cotação
            </Button>
          </div>
        </div>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar de Filtros */}
          <div className="lg:col-span-1">
            <FilterSidebar />
          </div>
          
          {/* Lista de Cotações */}
          <div className="lg:col-span-3">
            <div className="grid gap-4">
              {filteredCotacoes.map((cotacao) => (
                <CotacaoCard key={cotacao.id} {...cotacao} />
              ))}
            </div>
            
            {filteredCotacoes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhuma cotação encontrada com os filtros aplicados.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
