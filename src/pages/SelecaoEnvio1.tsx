
"use client";

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

import { cotacoesMock, fornecedoresMock } from "@/mocks/dadosCotacoes";

const SelecaoEnvio = () => {
  useEffect(() => {
    document.title = "Selecionar cotação e fornecedores | Portal de Compras";
  }, []);

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

  const [cotacoesFiltradas, setCotacoesFiltradas] = useState(cotacoesMock);
  const [cotacaoSelecionada, setCotacaoSelecionada] = useState<string | null>(null);
  const [buscaFornecedor, setBuscaFornecedor] = useState("");
  const fornecedoresFiltrados = useMemo(() => {
    return fornecedoresMock.filter((f) =>
      [f.nome, f.cnpj, f.email, f.codigo].join(" ").toLowerCase().includes(buscaFornecedor.toLowerCase())
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

  const aplicarFiltros = () => {
    const resultado = cotacoesMock.filter((c) => {
      const matchEmpresa = filtros.empresa ? c.empresa.toLowerCase().includes(filtros.empresa.toLowerCase()) : true;
      const matchGrupo = filtros.grupoCotacao ? c.grupoCotacao.toLowerCase().includes(filtros.grupoCotacao.toLowerCase()) : true;
      const matchUnidade = filtros.filial ? c.unidade.toLowerCase().includes(filtros.filial.toLowerCase()) : true;
      const matchStatus = filtros.status ? c.status === filtros.status : true;
      const matchData = filtros.data ? c.dataEncerramento === filtros.data : true;
      return matchEmpresa && matchGrupo && matchUnidade && matchStatus && matchData;
    });
    setCotacoesFiltradas(resultado);
  };

  const enviarConvites = () => {
    const idsSelecionados = Object.keys(selecionados).filter((k) => selecionados[k]);
    if (!cotacaoSelecionada) return toast.error("Selecione uma cotação");
    if (idsSelecionados.length === 0) return toast.error("Selecione ao menos um fornecedor");
    const cot = cotacoesMock.find((c) => c.id === cotacaoSelecionada);
    toast.success(`Convites enviados para ${idsSelecionados.length} fornecedor(es) — Cotação ${cot?.numero}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-10">
        <Card>
          <CardHeader><CardTitle>Relação de item com fornecedor</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requisição</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Grupo de cotação</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Nome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>573536</TableCell>
                  <TableCell>MP0108 - CAIXA EM MDF</TableCell>
                  <TableCell>004 - BRINDES - CJ/CS</TableCell>
                  <TableCell>71366609000127</TableCell>
                  <TableCell>COLETA DE PREÇOS</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Descrição do Objeto</CardTitle></CardHeader>
          <CardContent>
            <textarea
              className="w-full border rounded px-3 py-2 text-sm"
              rows={4}
              placeholder="Descrição do objeto"
              value={filtros.descricaoObjeto}
              onChange={(e) => setFiltros({ ...filtros, descricaoObjeto: e.target.value })}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Auditoria</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div><strong>Cadastrado por:</strong> -</div>
            <div><strong>Data do cadastro:</strong> -</div>
            <div><strong>Alterado por:</strong> -</div>
            <div><strong>Data de alteração:</strong> -</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Classificação</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={filtros.categoriaCompras} onChange={(e) => setFiltros({ ...filtros, categoriaCompras: e.target.value })} className="border rounded px-3 py-2 text-sm bg-background">
              <option value="">Categoria de compras</option>
              <option value="Compras e serviços">Compras e serviços</option>
              <option value="Obras">Obras</option>
            </select>
            <select value={filtros.modalidade} onChange={(e) => setFiltros({ ...filtros, modalidade: e.target.value })} className="border rounded px-3 py-2 text-sm bg-background">
              <option value="">Modalidade</option>
              <option value="Dispensa">Dispensa</option>
              <option value="Inexigibilidade">Inexigibilidade</option>
              <option value="Concorrência">Concorrência</option>
            </select>
            <Input placeholder="Artigo (ex: 023 - Art. 120...)" value={filtros.artigo} onChange={(e) => setFiltros({ ...filtros, artigo: e.target.value })} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Dados adicionais</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <select value={filtros.compraCompartilhada} onChange={(e) => setFiltros({ ...filtros, compraCompartilhada: e.target.value })} className="border rounded px-3 py-2 text-sm bg-background">
              <option value="">Compra compartilhada?</option>
              <option value="1">1 - Não</option>
              <option value="2">2 - Sim, por percentual</option>
              <option value="3">3 - Sim, por valor</option>
              <option value="4">4 - Sim, outros motivos</option>
            </select>
            <Input placeholder="Informações da contratação/compra compartilhada" value={filtros.infoCompartilhada} onChange={(e) => setFiltros({ ...filtros, infoCompartilhada: e.target.value })} />
            <Input placeholder="Natureza do objeto" value={filtros.naturezaObjeto} onChange={(e) => setFiltros({ ...filtros, naturezaObjeto: e.target.value })} />
            <Input placeholder="Categoria da descrição do objeto" value={filtros.categoriaDescricao} onChange={(e) => setFiltros({ ...filtros, categoriaDescricao: e.target.value })} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SelecaoEnvio;
