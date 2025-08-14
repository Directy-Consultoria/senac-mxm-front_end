// src/types/cotacao.ts

export interface Cotacao {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
}

export interface Fornecedor {
  codigo: string;
  nome: string;
  email: string;
  cnpj: string;
}

export interface DetalhesCotacao {
  categoriaCompras: string;
  modalidade: string;
  artigo: string;
  compraCompartilhada: string;
  infoCompartilhada: string;
  naturezaObjeto: string;
  categoriaDescricao: string;
  descricaoObjeto: string;
  mapa: string;
  data: string;
  prazoResposta: string;
  comprador: string;
  empresa: string;
  filial: string;
  grupoCotacao: string;
  moeda: string;
  condicaoPagamento: string;
  tipoItem: string;
  enviarEmail: boolean;
}

export interface DadosCotacao {
  numeroMapa: string;
  nossoNumero: string;
  detalhes: DetalhesCotacao;
  cotacoes: Cotacao[];
  fornecedores: Fornecedor[];
  dataGeracao: string;
}
