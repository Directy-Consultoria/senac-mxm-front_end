"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

import { cotacoesMock, fornecedoresMock } from "@/mocks/dadosCotacoes";
import { AlertDialog, AlertDialogContent } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const SelecaoEnvio = () => {
  useEffect(() => {
    document.title = "Selecionar cotação e fornecedores | Portal de Compras";
  }, []);

  // Formulário de Filtros (baseado na imagem)
  const [filtros, setFiltros] = useState({
    mapa: "",
    data: "",
    prazoResposta: "",
    comprador: "",
    empresa: "",
    filial: "",
    grupoCotacao: "",
    moeda: "",
    condicaoPagamento: "",
    tipoItem: "Todos",
    enviarEmail: false,
    status: "", // Adiciona a propriedade 'status'
    categoriaCompras: "",
    modalidade: "",
    artigo: "",
    compraCompartilhada: "",
    infoCompartilhada: "",
    naturezaObjeto: "",
    categoriaDescricao: "",
    descricaoObjeto: "",
  });

  const [cotacoesFiltradas, setCotacoesFiltradas] = useState(cotacoesMock);
  const [cotacoesSelecionadas, setCotacoesSelecionadas] = useState<string[]>(
    []
  );

  const [buscaFornecedor, setBuscaFornecedor] = useState("");
  const [mapaGerado, setMapaGerado] = useState<{
    numeroMapa: string;
    nossoNumero: string;
  } | null>(null);

  const fornecedoresFiltrados = useMemo(() => {
    return fornecedoresMock.filter((f) =>
      [f.nome, f.cnpj, f.email, f.codigo]
        .join(" ")
        .toLowerCase()
        .includes(buscaFornecedor.toLowerCase())
    );
  }, [buscaFornecedor]);

  const [selecionados, setSelecionados] = useState<Record<string, boolean>>({});
  const todosSelecionados =
    fornecedoresFiltrados.length > 0 &&
    fornecedoresFiltrados.every((f) => selecionados[f.codigo]);

  const toggleTodos = (checked: boolean) => {
    const novo: Record<string, boolean> = {};
    fornecedoresFiltrados.forEach((f) => (novo[f.codigo] = checked));
    setSelecionados((prev) => ({ ...prev, ...novo }));
  };

const gravarParaPDF = () => {
  if (cotacoesSelecionadas.length === 0) {
    return toast.error("Selecione pelo menos uma cotação");
  }

  if (Object.keys(selecionados).filter((id) => selecionados[id]).length === 0) {
    return toast.error("Selecione pelo menos um fornecedor");
  }

  const numeroMapa = Date.now().toString().slice(-7);
  const nossoNumero = `${Math.floor(Math.random() * 100000)
    .toString()
    .padStart(6, "0")}-${Math.floor(Math.random() * 90 + 10)}`;

  const novaEntrada = {
    cotacoes: cotacoesMock.filter((c) => cotacoesSelecionadas.includes(c.id)),
    fornecedores: fornecedoresMock.filter((f) => selecionados[f.codigo]),
    detalhes: filtros,
    numeroMapa,
    nossoNumero,
    dataHora: new Date().toISOString(),
  };

  // Recupera o histórico anterior (ou inicia um array vazio)
  const historicoAnterior = JSON.parse(localStorage.getItem("historicoPDFCotacoes") || "[]");

  // Adiciona a nova entrada ao histórico
  const novoHistorico = [...historicoAnterior, novaEntrada];

  // Salva de volta no localStorage
  localStorage.setItem("historicoPDFCotacoes", JSON.stringify(novoHistorico));

  setMapaGerado({ numeroMapa, nossoNumero });
  toast.success("Informações gravadas com sucesso!");
};



  const aplicarFiltros = () => {
    const resultado = cotacoesMock.filter((c) => {
      const matchEmpresa = filtros.empresa
        ? c.empresa.toLowerCase().includes(filtros.empresa.toLowerCase())
        : true;
      const matchGrupo = filtros.grupoCotacao
        ? c.grupoCotacao
            .toLowerCase()
            .includes(filtros.grupoCotacao.toLowerCase())
        : true;
      const matchUnidade = filtros.filial
        ? c.unidade.toLowerCase().includes(filtros.filial.toLowerCase())
        : true;
      const matchStatus = filtros.status ? c.status === filtros.status : true;
      const matchData = filtros.data
        ? c.dataEncerramento === filtros.data
        : true;

      return (
        matchEmpresa && matchGrupo && matchUnidade && matchStatus && matchData
      );
    });

    setCotacoesFiltradas(resultado);
  };

  const resetarFormulario = () => {
    setCotacoesSelecionadas([]);
    setSelecionados({});
    setFiltros({
      mapa: "",
      data: "",
      prazoResposta: "",
      comprador: "",
      empresa: "",
      filial: "",
      grupoCotacao: "",
      moeda: "",
      condicaoPagamento: "",
      tipoItem: "",
      enviarEmail: false,
      status: "",
      categoriaCompras: "",
      modalidade: "",
      artigo: "",
      compraCompartilhada: "",
      infoCompartilhada: "",
      naturezaObjeto: "",
      categoriaDescricao: "",
      descricaoObjeto: "",
    });
    toast.info("Formulário resetado");
  };

  const enviarConvites = () => {
    const idsSelecionados = Object.keys(selecionados).filter(
      (k) => selecionados[k]
    );
    if (cotacoesSelecionadas.length === 0)
      return toast.error("Selecione ao menos uma cotação");
    if (idsSelecionados.length === 0)
      return toast.error("Selecione ao menos um fornecedor");

    toast.success(
      `Convites enviados para ${idsSelecionados.length} fornecedor(es) — ${cotacoesSelecionadas.length} cotação(ões)`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-10">
        <header>
          <h1 className="text-3xl font-bold text-foreground">
            Mapa de Cotação
          </h1>
          <p className="text-muted-foreground mt-1">
            Preencha os dados abaixo para filtrar as cotações disponíveis.
          </p>
        </header>

        {/* 🧾 Formulário de Filtros (baseado na imagem) */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do cadastro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Mapa"
                value={filtros.mapa}
                onChange={(e) =>
                  setFiltros({ ...filtros, mapa: e.target.value })
                }
              />
              <Input
                type="date"
                value={filtros.data}
                onChange={(e) =>
                  setFiltros({ ...filtros, data: e.target.value })
                }
              />
              <Input
                placeholder="Prazo de resposta"
                value={filtros.prazoResposta}
                onChange={(e) =>
                  setFiltros({ ...filtros, prazoResposta: e.target.value })
                }
              />
              <Input
                placeholder="Comprador"
                value={filtros.comprador}
                onChange={(e) =>
                  setFiltros({ ...filtros, comprador: e.target.value })
                }
              />
              <Input
                placeholder="Empresa"
                value={filtros.empresa}
                onChange={(e) =>
                  setFiltros({ ...filtros, empresa: e.target.value })
                }
              />
              <Input
                placeholder="Filial"
                value={filtros.filial}
                onChange={(e) =>
                  setFiltros({ ...filtros, filial: e.target.value })
                }
              />
              <Input
                placeholder="Grupo de cotação"
                value={filtros.grupoCotacao}
                onChange={(e) =>
                  setFiltros({ ...filtros, grupoCotacao: e.target.value })
                }
              />
              <Input
                placeholder="Moeda"
                value={filtros.moeda}
                onChange={(e) =>
                  setFiltros({ ...filtros, moeda: e.target.value })
                }
              />
              <Input
                placeholder="Condição de pagamento"
                value={filtros.condicaoPagamento}
                onChange={(e) =>
                  setFiltros({ ...filtros, condicaoPagamento: e.target.value })
                }
              />

              <select
                value={filtros.status}
                onChange={(e) =>
                  setFiltros({ ...filtros, status: e.target.value })
                }
                className="border rounded px-2 py-2 text-sm bg-background"
              >
                <option value="">Todos os status</option>
                <option value="em_andamento">Em andamento</option>
                <option value="aguardando">Aguardando</option>
                <option value="encerrada">Encerrada</option>
                <option value="suspensa">Suspensa</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Label>Tipo de item:</Label>
              {["Estoque", "Patrimonial", "Serviço / consumo", "Todos"].map(
                (tipo) => (
                  <Label
                    key={tipo}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="tipoItem"
                      value={tipo}
                      checked={filtros.tipoItem === tipo}
                      onChange={() =>
                        setFiltros({ ...filtros, tipoItem: tipo })
                      }
                    />
                    {tipo}
                  </Label>
                )
              )}
              <Label className="flex items-center gap-2 ml-auto">
                <Checkbox
                  checked={filtros.enviarEmail}
                  onCheckedChange={(v) =>
                    setFiltros({ ...filtros, enviarEmail: Boolean(v) })
                  }
                />
                Enviar e-mail para o fornecedor
              </Label>
              <Button variant="primaryHoverAccent" onClick={aplicarFiltros}>
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 📋 Cotações */}
        <Card>
          <CardHeader>
            <CardTitle>Cotações</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
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
                  <TableRow
                    key={c.id}
                    className={
                      cotacoesSelecionadas.includes(c.id)
                        ? "bg-muted/40"
                        : undefined
                    }
                  >
                    <td className="text-center align-middle">
                      <Checkbox
                        checked={cotacoesSelecionadas.includes(c.id)}
                        onCheckedChange={(v) => {
                          setCotacoesSelecionadas((prev) =>
                            v
                              ? [...prev, c.id]
                              : prev.filter((id) => id !== c.id)
                          );
                        }}
                      />
                    </td>

                    <TableCell className="font-medium">{c.numero}</TableCell>
                    <TableCell
                      className="max-w-[260px] truncate"
                      title={c.titulo}
                    >
                      {c.titulo}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={c.status} />
                    </TableCell>
                    <TableCell>{c.modalidade}</TableCell>
                    <TableCell>{c.unidade}</TableCell>
                    <TableCell>{c.dataEncerramento}</TableCell>
                  </TableRow>
                ))}
                {cotacoesFiltradas.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-8"
                    >
                      Nenhuma cotação encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 👤 Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle>Fornecedores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Input
                placeholder="Buscar por nome, CNPJ, e-mail..."
                value={buscaFornecedor}
                onChange={(e) => setBuscaFornecedor(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  id="todos"
                  checked={todosSelecionados}
                  onCheckedChange={(v) => toggleTodos(Boolean(v))}
                />
                <Label htmlFor="todos">Selecionar todos</Label>
              </div>
            </div>

            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
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
                            setSelecionados((prev) => ({
                              ...prev,
                              [f.codigo]: Boolean(v),
                            }))
                          }
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {f.codigo}
                      </TableCell>
                      <TableCell
                        className="max-w-[260px] truncate"
                        title={f.nome}
                      >
                        {f.nome}
                      </TableCell>
                      <TableCell>{f.cnpj}</TableCell>
                      <TableCell>{f.telefone}</TableCell>
                      <TableCell className="text-primary underline">
                        {f.email}
                      </TableCell>
                    </TableRow>
                  ))}
                  {fornecedoresFiltrados.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground py-8"
                      >
                        Nenhum fornecedor encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Selecionados:{" "}
                {Object.values(selecionados).filter(Boolean).length}
              </p>
              <Button
                variant="primaryHoverAccent"
                onClick={enviarConvites}
                disabled={
                  !cotacoesSelecionadas ||
                  Object.values(selecionados).every((v) => !v)
                }
              >
                Enviar por e-mail
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 📝 Detalhes da Cotação */}
        <Card>
          <CardHeader>
            <CardTitle>Informações complementares</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 📑 Classificação */}
            <div>
              <h3 className="text-lg font-semibold mb-2">📑 Classificação</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={filtros.categoriaCompras}
                  onChange={(e) =>
                    setFiltros({ ...filtros, categoriaCompras: e.target.value })
                  }
                  className="border rounded px-3 py-2 text-sm bg-background"
                >
                  <option value="">Categoria de compras</option>
                  <option value="Compras e serviços">Compras e serviços</option>
                  <option value="Obras">Obras</option>
                </select>

                <select
                  value={filtros.modalidade}
                  onChange={(e) =>
                    setFiltros({ ...filtros, modalidade: e.target.value })
                  }
                  className="border rounded px-3 py-2 text-sm bg-background"
                >
                  <option value="">Modalidade</option>
                  <option value="Dispensa">Dispensa</option>
                  <option value="Inexigibilidade">Inexigibilidade</option>
                  <option value="Concorrência">Concorrência</option>
                </select>

                <Input
                  placeholder="Artigo (ex: 023 - Art. 120...)"
                  value={filtros.artigo}
                  onChange={(e) =>
                    setFiltros({ ...filtros, artigo: e.target.value })
                  }
                />
              </div>
            </div>

            {/* 🧾 Dados adicionais */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                🧾 Dados adicionais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={filtros.compraCompartilhada}
                  onChange={(e) =>
                    setFiltros({
                      ...filtros,
                      compraCompartilhada: e.target.value,
                    })
                  }
                  className="border rounded px-3 py-2 text-sm bg-background"
                >
                  <option value="">Compra compartilhada?</option>
                  <option value="1">1 - Não</option>
                  <option value="2">2 - Sim, por percentual</option>
                  <option value="3">3 - Sim, por valor</option>
                  <option value="4">4 - Sim, outros motivos</option>
                </select>

                <Input
                  placeholder="Informações da contratação/compra compartilhada"
                  value={filtros.infoCompartilhada}
                  onChange={(e) =>
                    setFiltros({
                      ...filtros,
                      infoCompartilhada: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  placeholder="Natureza do objeto"
                  value={filtros.naturezaObjeto}
                  onChange={(e) =>
                    setFiltros({ ...filtros, naturezaObjeto: e.target.value })
                  }
                />

                <Input
                  placeholder="Categoria da descrição do objeto"
                  value={filtros.categoriaDescricao}
                  onChange={(e) =>
                    setFiltros({
                      ...filtros,
                      categoriaDescricao: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* 📄 Descrição do Objeto */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                📄 Descrição do objeto
              </h3>
              <textarea
                className="w-full border rounded px-3 py-2 text-sm"
                rows={4}
                placeholder="Descreva o objeto da contratação"
                value={filtros.descricaoObjeto}
                onChange={(e) =>
                  setFiltros({ ...filtros, descricaoObjeto: e.target.value })
                }
              />
            </div>

            {/* 🎯 Botão alinhado à direita */}
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={resetarFormulario}>
                Resetar
              </Button>
              <Button variant="primaryHoverAccent" onClick={gravarParaPDF}>
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      {mapaGerado && (
  <AlertDialog open={!!mapaGerado} onOpenChange={() => setMapaGerado(null)}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>📑 Mapa gerado com sucesso!</AlertDialogTitle>
        <AlertDialogDescription className="space-y-2">
          <p>
            <strong>Número do mapa:</strong> {mapaGerado.numeroMapa}
          </p>
          <p>
            <strong>Nosso número:</strong> {mapaGerado.nossoNumero}
          </p>
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => {
            const texto = `Número do mapa: ${mapaGerado.numeroMapa}\nNosso número: ${mapaGerado.nossoNumero}`;
            navigator.clipboard.writeText(texto);
            toast.success("Copiado para a área de transferência");
          }}
        >
          📋 Copiar
        </Button>

        <Button
          onClick={() => {
            setMapaGerado(null);
            // Redirecione para página do PDF, ex:
            // router.push("/visualizar-pdf")
          }}
        >
          📄 Visualizar PDF
        </Button>
      </div>
    </AlertDialogContent>
  </AlertDialog>
)}

    </div>
  );
};

export default SelecaoEnvio;
