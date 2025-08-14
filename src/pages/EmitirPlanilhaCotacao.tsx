// pages/EmitirPlanilhaCotacao.tsx
"use client";

import React, { useEffect, useState } from "react";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CustomSelect } from "@/components/ui/custom-select";
import { format } from "date-fns";
// Se já tiver a função de PDF, descomente a linha abaixo:
// import { gerarPDFCotacoes } from "@/lib/pdfCotacoes";

interface Fornecedor {
  codigo: string;
  nome: string;
}
interface Cotacao {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
}
interface DetalhesCotacao {
  empresa: string;
  categoriaCompras: string;
  modalidade: string;
  artigo: string;
  compraCompartilhada: string;
  infoCompartilhada: string;
  naturezaObjeto: string;
  categoriaDescricao: string;
  descricaoObjeto: string;
}
interface DadosCotacao {
  numeroMapa: string;
  nossoNumero: string;
  detalhes: DetalhesCotacao;
  cotacoes: Cotacao[];
  fornecedores: Fornecedor[];
  dataGeracao: string;
}
interface Filtros {
  mapaInicio: string;
  mapaFim: string;
  fornecedor: string;
  dataInicio: string;
  dataFim: string;
  empresa: string;
  modelo: string;
  validadeProposta: string;
  mostrarContabilizacao: boolean;
  agruparLocalEntrega: boolean;
  habilitarOutrosEnderecos: boolean;
  indicarCondicaoPagamento: boolean;
  condicaoPagamento: string;
  indicarPrazoEntrega: boolean;
  prazoEntrega: string;
  classificarMapa: boolean;
}

export default function EmitirPlanilhaCotacao() {
  const [dados, setDados] = useState<DadosCotacao[]>([]);
  const [resultado, setResultado] = useState<DadosCotacao[]>([]);
  const [filtros, setFiltros] = useState<Filtros>({
    mapaInicio: "",
    mapaFim: "",
    fornecedor: "",
    dataInicio: "",
    dataFim: "",
    empresa: "",
    modelo: "Modelo 1",
    validadeProposta: "",
    mostrarContabilizacao: false,
    agruparLocalEntrega: false,
    habilitarOutrosEnderecos: false,
    indicarCondicaoPagamento: false,
    condicaoPagamento: "",
    indicarPrazoEntrega: false,
    prazoEntrega: "",
    classificarMapa: false,
  });

  useEffect(() => {
    document.title = "Emitir Planilha de Cotação";
    const raw = localStorage.getItem("geracoesPDFCotacoes") || "[]";
    setDados(JSON.parse(raw));
  }, []);

  const filtrar = () => {
    let filtrados = dados;

    if (filtros.mapaInicio || filtros.mapaFim) {
      filtrados = filtrados.filter((d) => {
        const mapa = parseInt(d.numeroMapa);
        const ini = parseInt(filtros.mapaInicio || "0");
        const fim = parseInt(filtros.mapaFim || "9999999");
        return mapa >= ini && mapa <= fim;
      });
    }

    if (filtros.fornecedor) {
      filtrados = filtrados.filter((d) =>
        d.fornecedores.some((f) => f.codigo.includes(filtros.fornecedor))
      );
    }

    if (filtros.dataInicio || filtros.dataFim) {
      filtrados = filtrados.filter((d) => {
        const data = new Date(d.dataGeracao);
        const ini = filtros.dataInicio ? new Date(filtros.dataInicio) : new Date("2000-01-01");
        const fim = filtros.dataFim ? new Date(filtros.dataFim) : new Date("2100-01-01");
        return data >= ini && data <= fim;
      });
    }

    if (filtros.empresa) {
      filtrados = filtrados.filter((d) =>
        (d.detalhes?.empresa ?? "").toLowerCase().includes(filtros.empresa.toLowerCase())
      );
    }

    setResultado(filtrados);
  };

  const resetar = () => {
    setResultado([]);
    setFiltros({
      mapaInicio: "",
      mapaFim: "",
      fornecedor: "",
      dataInicio: "",
      dataFim: "",
      empresa: "",
      modelo: "Modelo 1",
      validadeProposta: "",
      mostrarContabilizacao: false,
      agruparLocalEntrega: false,
      habilitarOutrosEnderecos: false,
      indicarCondicaoPagamento: false,
      condicaoPagamento: "",
      indicarPrazoEntrega: false,
      prazoEntrega: "",
      classificarMapa: false,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Título da página */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">
            Emitir Planilha de Cotação
          </h1>
          <p className="text-muted-foreground">
            Busque os mapas gerados e emita a planilha em PDF.
          </p>
        </header>

        {/* Card de Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Mapa (de)"
                value={filtros.mapaInicio}
                onChange={(e) => setFiltros({ ...filtros, mapaInicio: e.target.value })}
              />
              <Input
                placeholder="Mapa (até)"
                value={filtros.mapaFim}
                onChange={(e) => setFiltros({ ...filtros, mapaFim: e.target.value })}
              />
              <Input
                placeholder="Fornecedor (código)"
                value={filtros.fornecedor}
                onChange={(e) => setFiltros({ ...filtros, fornecedor: e.target.value })}
              />

              <Input
                placeholder="Data início"
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
              />
              <Input
                placeholder="Data fim"
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
              />
              <Input
                placeholder="Empresa"
                value={filtros.empresa}
                onChange={(e) => setFiltros({ ...filtros, empresa: e.target.value })}
              />

              <CustomSelect
                label="Modelo"
                placeholder="Selecione o modelo"
                value={filtros.modelo}
                onChange={(value) => setFiltros({ ...filtros, modelo: value })}
                options={[
                  { label: "Modelo 1", value: "Modelo 1" },
                  { label: "Modelo 2", value: "Modelo 2" },
                ]}
              />

              <Input
                placeholder="Validade da proposta"
                value={filtros.validadeProposta}
                onChange={(e) => setFiltros({ ...filtros, validadeProposta: e.target.value })}
              />
            </div>

            {/* checkboxes agrupados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={filtros.mostrarContabilizacao}
                  onCheckedChange={(v) => setFiltros({ ...filtros, mostrarContabilizacao: !!v })}
                />
                <span className="text-sm">Mostrar contabilização</span>
              </label>

              <label className="flex items-center gap-2">
                <Checkbox
                  checked={filtros.agruparLocalEntrega}
                  onCheckedChange={(v) => setFiltros({ ...filtros, agruparLocalEntrega: !!v })}
                />
                <span className="text-sm">Agrupar local de entrega</span>
              </label>

              <label className="flex items-center gap-2">
                <Checkbox
                  checked={filtros.habilitarOutrosEnderecos}
                  onCheckedChange={(v) => setFiltros({ ...filtros, habilitarOutrosEnderecos: !!v })}
                />
                <span className="text-sm">Habilitar outros endereços</span>
              </label>

              <label className="flex items-center gap-2">
                <Checkbox
                  checked={filtros.indicarCondicaoPagamento}
                  onCheckedChange={(v) => setFiltros({ ...filtros, indicarCondicaoPagamento: !!v })}
                />
                <span className="text-sm">Indicar condição de pagamento</span>
              </label>

              {filtros.indicarCondicaoPagamento && (
                <Input
                  placeholder="Condição de pagamento"
                  value={filtros.condicaoPagamento}
                  onChange={(e) => setFiltros({ ...filtros, condicaoPagamento: e.target.value })}
                />
              )}

              <label className="flex items-center gap-2">
                <Checkbox
                  checked={filtros.indicarPrazoEntrega}
                  onCheckedChange={(v) => setFiltros({ ...filtros, indicarPrazoEntrega: !!v })}
                />
                <span className="text-sm">Indicar prazo de entrega</span>
              </label>

              {filtros.indicarPrazoEntrega && (
                <Input
                  placeholder="Prazo"
                  value={filtros.prazoEntrega}
                  onChange={(e) => setFiltros({ ...filtros, prazoEntrega: e.target.value })}
                />
              )}

              <label className="flex items-center gap-2">
                <Checkbox
                  checked={filtros.classificarMapa}
                  onCheckedChange={(v) => setFiltros({ ...filtros, classificarMapa: !!v })}
                />
                <span className="text-sm">Classificar mapa</span>
              </label>
            </div>

            {/* Barra de ações */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" onClick={resetar}>Resetar</Button>
              <Button onClick={filtrar}>Filtrar</Button>
              <Button
                variant="secondary"
                disabled={resultado.length === 0}
                // onClick={() => gerarPDFCotacoes(resultado)}
                title={resultado.length === 0 ? "Nenhum resultado para emitir" : "Emitir PDF"}
              >
                📄 Emitir PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card de Resultados */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            {resultado.length === 0 ? (
              <div className="text-sm text-muted-foreground py-8 text-center">
                Nenhum resultado. Ajuste os filtros e clique em <span className="font-medium">Filtrar</span>.
              </div>
            ) : (
              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mapa Nº</TableHead>
                      <TableHead>Nosso Nº</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Fornecedores</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultado.map((item) => (
                      <TableRow key={item.numeroMapa}>
                        <TableCell className="font-medium">{item.numeroMapa}</TableCell>
                        <TableCell>{item.nossoNumero}</TableCell>
                        <TableCell>{format(new Date(item.dataGeracao), "dd/MM/yyyy HH:mm")}</TableCell>
                        <TableCell className="text-right">{item.fornecedores?.length ?? 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
