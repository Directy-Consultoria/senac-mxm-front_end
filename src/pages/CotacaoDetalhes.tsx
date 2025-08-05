import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, FileText, User, Building, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "@/components/StatusBadge";
import Header from "@/components/Header";

// Mock data - idealmente viria de uma API
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
    objeto: "Aquisição de 50 notebooks, 20 desktops e periféricos para laboratórios de informática",
    descricaoDetalhada: "Processo licitatório para aquisição de equipamentos de informática destinados aos laboratórios do SENAC Vitória. O certame visa a compra de 50 notebooks com especificações mínimas para uso educacional, 20 desktops para laboratórios avançados e periféricos diversos incluindo monitores, teclados, mouses e webcams.",
    responsavel: "João Silva",
    email: "joao.silva@senac.org.br",
    telefone: "(27) 3334-5555",
    setor: "Compras e Licitações",
    observacoes: "Entrega deve ser feita em até 30 dias após assinatura do contrato. Equipamentos devem ter garantia mínima de 2 anos.",
    documentos: [
      "Edital Completo.pdf",
      "Especificações Técnicas.pdf",
      "Modelo de Proposta.pdf",
      "Termo de Referência.pdf"
    ]
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
    objeto: "Contratação de empresa especializada em serviços de limpeza e conservação predial",
    descricaoDetalhada: "Contratação de empresa especializada em serviços de limpeza e conservação predial para as instalações do SENAC Vila Velha, incluindo limpeza diária, semanal e mensal de todas as dependências.",
    responsavel: "Maria Santos",
    email: "maria.santos@senac.org.br",
    telefone: "(27) 3335-6666",
    setor: "Administração Predial",
    observacoes: "Serviços devem ser prestados de segunda a sábado, incluindo feriados quando houver atividades.",
    documentos: [
      "Edital de Pregão.pdf",
      "Planilha de Serviços.pdf",
      "Cronograma de Atividades.pdf"
    ]
  }
];

const CotacaoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const cotacao = mockCotacoes.find(c => c.id === id);

  if (!cotacao) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Cotação não encontrada
            </h1>
            <Button onClick={() => navigate("/")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para lista
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Cabeçalho com navegação */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">
              {cotacao.titulo}
            </h1>
            <p className="text-muted-foreground font-mono">
              Nº {cotacao.numero}
            </p>
          </div>
          <StatusBadge status={cotacao.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Principais */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resumo */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Cotação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Objeto:</h4>
                  <p className="text-muted-foreground">{cotacao.objeto}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Descrição Detalhada:</h4>
                  <p className="text-muted-foreground">{cotacao.descricaoDetalhada}</p>
                </div>

                {cotacao.observacoes && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Observações:</h4>
                    <p className="text-muted-foreground">{cotacao.observacoes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Documentos */}
            <Card>
              <CardHeader>
                <CardTitle>Documentos Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cotacao.documentos.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">{doc}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com detalhes */}
          <div className="space-y-6">
            {/* Informações Gerais */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Data de Abertura</p>
                    <p className="text-sm text-muted-foreground">{cotacao.dataAbertura}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Data de Encerramento</p>
                    <p className="text-sm text-muted-foreground">{cotacao.dataEncerramento}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Modalidade</p>
                    <p className="text-sm text-muted-foreground">{cotacao.modalidade}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Unidade</p>
                    <p className="text-sm text-muted-foreground">{cotacao.unidade}</p>
                  </div>
                </div>

                <Separator />

                {cotacao.valor && (
                  <div className="bg-accent/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-foreground">
                      Valor Estimado
                    </p>
                    <p className="text-lg font-bold text-primary">{cotacao.valor}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Responsável */}
            <Card>
              <CardHeader>
                <CardTitle>Responsável</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{cotacao.responsavel}</p>
                    <p className="text-xs text-muted-foreground">{cotacao.setor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${cotacao.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {cotacao.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{cotacao.telefone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Ações */}
            {cotacao.status === "em_andamento" && (
              <Card>
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="primaryHoverAccent" className="w-full">
                    Participar da Cotação
                  </Button>
                  <Button variant="outline" className="w-full">
                    Baixar Todos os Documentos
                  </Button>
                  <Button variant="outline" className="w-full">
                    Salvar nos Favoritos
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CotacaoDetalhes;