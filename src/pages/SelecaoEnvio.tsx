import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface Cotacao {
  id: string;
  numero: string;
  titulo: string;
  status: "em_andamento" | "aguardando" | "encerrada" | "suspensa";
  modalidade: string;
  unidade: string;
  dataEncerramento: string;
}

interface Fornecedor {
  codigo: string;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
}

const cotacoesMock: Cotacao[] = [
  {
    id: "1",
    numero: "001/2024",
    titulo: "Aquisição de Equipamentos de Informática",
    status: "em_andamento",
    modalidade: "Cotação Eletrônica",
    unidade: "SENAC Vitória",
    dataEncerramento: "25/01/2024",
  },
  {
    id: "2",
    numero: "002/2024",
    titulo: "Serviços de Limpeza e Conservação",
    status: "em_andamento",
    modalidade: "Pregão Eletrônico",
    unidade: "SENAC Vila Velha",
    dataEncerramento: "20/01/2024",
  },
  {
    id: "3",
    numero: "003/2024",
    titulo: "Material de Expediente",
    status: "aguardando",
    modalidade: "Cotação Eletrônica",
    unidade: "SENAC Cachoeiro",
    dataEncerramento: "30/01/2024",
  },
];

const fornecedoresMock: Fornecedor[] = [
  { codigo: "19810364000165", nome: "Marli Oliveira dos Santos Castro", cnpj: "19.810.364/0001-65", telefone: "(27) 8826-8986", email: "liaart55@gmail.com" },
  { codigo: "20832197000132", nome: "Neivaldo Augusto Zovico", cnpj: "20.832.197/0001-32", telefone: "(11) 94537-718", email: "neivaldo.zovico@gmail.com" },
  { codigo: "38267731000170", nome: "3DERAS Manufatura Digital LTDA", cnpj: "38.267.731/0001-70", telefone: "(48) 9162-8511", email: "contato@3deras.com.br" },
  { codigo: "4528748000100", nome: "Deneia Marques Rosa", cnpj: "45.287.480/001-00", telefone: "(27) 3067-0291", email: "edesid@hotmail.com" },
];

const SelecaoEnvio = () => {
  // SEO minimal implementation
  useEffect(() => {
    document.title = "Selecionar cotação e fornecedores | Portal de Compras";
    const link: HTMLLinkElement = document.querySelector('link[rel="canonical"]') || document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", window.location.href);
    if (!link.parentNode) document.head.appendChild(link);
  }, []);

  // Filtros de cotação
  const [buscaCotacao, setBuscaCotacao] = useState("");
  const [status, setStatus] = useState("");
  const [unidade, setUnidade] = useState("");

  const cotacoesFiltradas = useMemo(() => {
    return cotacoesMock.filter((c) => {
      const matchBusca = [c.numero, c.titulo, c.modalidade, c.unidade]
        .join(" ")
        .toLowerCase()
        .includes(buscaCotacao.toLowerCase());
      const matchStatus = status ? c.status === status : true;
      const matchUnidade = unidade ? c.unidade === unidade : true;
      return matchBusca && matchStatus && matchUnidade;
    });
  }, [buscaCotacao, status, unidade]);

  const [cotacaoSelecionada, setCotacaoSelecionada] = useState<string | null>(null);

  // Filtros de fornecedores
  const [buscaFornecedor, setBuscaFornecedor] = useState("");
  const fornecedoresFiltrados = useMemo(() => {
    return fornecedoresMock.filter((f) =>
      [f.nome, f.cnpj, f.email, f.codigo]
        .join(" ")
        .toLowerCase()
        .includes(buscaFornecedor.toLowerCase())
    );
  }, [buscaFornecedor]);

  const [selecionados, setSelecionados] = useState<Record<string, boolean>>({});
  const todosSelecionados = fornecedoresFiltrados.length > 0 && fornecedoresFiltrados.every((f) => selecionados[f.codigo]);

  const toggleTodos = (checked: boolean) => {
    const novo: Record<string, boolean> = {};
    fornecedoresFiltrados.forEach((f) => (novo[f.codigo] = checked));
    setSelecionados((prev) => ({ ...prev, ...novo }));
  };

  const enviarConvites = () => {
    const idsSelecionados = Object.keys(selecionados).filter((k) => selecionados[k]);
    if (!cotacaoSelecionada) {
      toast.error("Selecione uma cotação");
      return;
    }
    if (idsSelecionados.length === 0) {
      toast.error("Selecione ao menos um fornecedor");
      return;
    }
    const cot = cotacoesMock.find((c) => c.id === cotacaoSelecionada);
    toast.success(`Convites enviados para ${idsSelecionados.length} fornecedor(es) — Cotação ${cot?.numero}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Selecionar cotação e fornecedores</h1>
          <p className="text-muted-foreground mt-1">Filtre e escolha a cotação e os fornecedores que receberão o convite.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Seção: Cotações */}
          <Card>
            <CardHeader>
              <CardTitle>Cotações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Input
                    placeholder="Buscar por número, título, modalidade..."
                    value={buscaCotacao}
                    onChange={(e) => setBuscaCotacao(e.target.value)}
                  />
                </div>
                <Input
                  placeholder="Filtrar por status (em_andamento, aguardando...)"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <Input
                  placeholder="Filtrar por unidade"
                  value={unidade}
                  onChange={(e) => setUnidade(e.target.value)}
                />
              </div>

              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Número</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Modalidade</TableHead>
                      <TableHead>Unidade</TableHead>
                      <TableHead>Encerramento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cotacoesFiltradas.map((c) => (
                      <TableRow key={c.id} className={cotacaoSelecionada === c.id ? "bg-muted/40" : undefined}>
                        <TableCell>
                          <input
                            type="radio"
                            name="cotacao"
                            aria-label={`Selecionar cotação ${c.numero}`}
                            checked={cotacaoSelecionada === c.id}
                            onChange={() => setCotacaoSelecionada(c.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{c.numero}</TableCell>
                        <TableCell className="max-w-[260px] truncate" title={c.titulo}>{c.titulo}</TableCell>
                        <TableCell><StatusBadge status={c.status} /></TableCell>
                        <TableCell>{c.modalidade}</TableCell>
                        <TableCell>{c.unidade}</TableCell>
                        <TableCell>{c.dataEncerramento}</TableCell>
                      </TableRow>
                    ))}
                    {cotacoesFiltradas.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                          Nenhuma cotação encontrada com os filtros informados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Seção: Fornecedores */}
          <Card>
            <CardHeader>
              <CardTitle>Fornecedores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Input
                  placeholder="Buscar por nome, CNPJ, e-mail..."
                  value={buscaFornecedor}
                  onChange={(e) => setBuscaFornecedor(e.target.value)}
                  className="flex-1"
                />
                <div className="flex items-center gap-2">
                  <Checkbox id="todos" checked={todosSelecionados} onCheckedChange={(v) => toggleTodos(Boolean(v))} />
                  <Label htmlFor="todos">Selecionar todos</Label>
                </div>
              </div>

              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>CNPJ</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>E-mail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fornecedoresFiltrados.map((f) => (
                      <TableRow key={f.codigo}>
                        <TableCell>
                          <Checkbox
                            checked={Boolean(selecionados[f.codigo])}
                            onCheckedChange={(v) =>
                              setSelecionados((prev) => ({ ...prev, [f.codigo]: Boolean(v) }))
                            }
                            aria-label={`Selecionar fornecedor ${f.nome}`}
                          />
                        </TableCell>
                        <TableCell className="font-mono text-sm">{f.codigo}</TableCell>
                        <TableCell className="max-w-[260px] truncate" title={f.nome}>{f.nome}</TableCell>
                        <TableCell>{f.cnpj}</TableCell>
                        <TableCell>{f.telefone}</TableCell>
                        <TableCell className="text-primary underline underline-offset-2">{f.email}</TableCell>
                      </TableRow>
                    ))}
                    {fornecedoresFiltrados.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          Nenhum fornecedor encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Selecionados: {Object.values(selecionados).filter(Boolean).length}
                </p>
                <Button
                  variant="primaryHoverAccent"
                  onClick={enviarConvites}
                  disabled={!cotacaoSelecionada || Object.values(selecionados).every((v) => !v)}
                >
                  Enviar convites
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SelecaoEnvio;
