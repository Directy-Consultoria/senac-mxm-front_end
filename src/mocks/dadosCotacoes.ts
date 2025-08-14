
export interface Cotacao {
  id: string;
  numero: string;
  titulo: string;
  status: "em_andamento" | "aguardando" | "encerrada" | "suspensa";
  modalidade: string;
  unidade: string;
  dataEncerramento: string;
  grupoCotacao: string;
  empresa: string;
}

export interface Fornecedor {
  codigo: string;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
}

export const cotacoesMock: Cotacao[] = [
  {
    id: "1",
    numero: "573689",
    titulo: "PORTA DE ALUMÍNIO",
    status: "em_andamento",
    modalidade: "Cotação Eletrônica",
    unidade: "HOTEL ILHA DO BOI",
    dataEncerramento: "12/07/2025",
    grupoCotacao: "002 - ALUMÍNIO - C10S",
    empresa: "14 - SERVIÇO NAC.DE APRENDIZAGEM COMERCIAL-ES",
  },
  {
    id: "2",
    numero: "573686",
    titulo: "CAIXA EM MDF",
    status: "em_andamento",
    modalidade: "Cotação Eletrônica",
    unidade: "HOTEL ILHA DO BOI",
    dataEncerramento: "10/07/2025",
    grupoCotacao: "004 - BRINDES - C10S",
    empresa: "14 - SERVIÇO NAC.DE APRENDIZAGEM COMERCIAL-ES",
  },
  {
    id: "3",
    numero: "573689",
    titulo: "Produtos de Higiene e Limpeza",
    status: "aguardando",
    modalidade: "Cotação Eletrônica",
    unidade: "NÚCLEO EDUC. PROFISSIONAL SERRA",
    dataEncerramento: "17/07/2025",
    grupoCotacao: "006 - HIGIENE/LIMPEZA/PRODUTO - C10SC",
    empresa: "14 - SERVIÇO NAC.DE APRENDIZAGEM COMERCIAL-ES",
  },
  {
    id: "4",
    numero: "573690",
    titulo: "VASOURA DE PELO SINTÉTICO (ÁREA INTERNA)",
    status: "em_andamento",
    modalidade: "Cotação Eletrônica",
    unidade: "HOTEL ILHA DO BOI",
    dataEncerramento: "16/07/2025",
    grupoCotacao: "006 - HIGIENE/LIMPEZA/PRODUTO - C10SC",
    empresa: "14 - SERVIÇO NAC.DE APRENDIZAGEM COMERCIAL-ES",
  },
  {
    id: "5",
    numero: "573691",
    titulo: "RODO EM ALUMÍNIO COM LÂMINA DE BORRACHA (40CM)",
    status: "aguardando",
    modalidade: "Pregão Eletrônico",
    unidade: "HOTEL ILHA DO BOI",
    dataEncerramento: "21/07/2025",
    grupoCotacao: "006 - HIGIENE/LIMPEZA/PRODUTO - C10SC",
    empresa: "14 - SERVIÇO NAC.DE APRENDIZAGEM COMERCIAL-ES",
  },
  {
    id: "6",
    numero: "573692",
    titulo: "DETERGENTE LÍQUIDO NEUTRO",
    status: "encerrada",
    modalidade: "Cotação Eletrônica",
    unidade: "CENTRO DE FORMAÇÃO PROFISSIONAL VITÓRIA",
    dataEncerramento: "17/07/2025",
    grupoCotacao: "006 - HIGIENE/LIMPEZA/PRODUTO - C10SC",
    empresa: "14 - SERVIÇO NAC.DE APRENDIZAGEM COMERCIAL-ES",
  },
  {
    id: "7",
    numero: "573693",
    titulo: "ÁLCOOL 70% EM GEL",
    status: "suspensa",
    modalidade: "Pregão Eletrônico",
    unidade: "NÚCLEO EDUC. PROFISSIONAL SERRA",
    dataEncerramento: "18/07/2025",
    grupoCotacao: "006 - HIGIENE/LIMPEZA/PRODUTO - C10SC",
    empresa: "14 - SERVIÇO NAC.DE APRENDIZAGEM COMERCIAL-ES",
  },
];

export const fornecedoresMock: Fornecedor[] = [
  {
    codigo: "27839127000190",
    nome: "Alpha Soluções Comerciais LTDA",
    cnpj: "27.839.127/0001-90",
    telefone: "(27) 99842-3781",
    email: "comercial@alphasolucoes.com.br",
  },
  {
    codigo: "19283746000122",
    nome: "MDF Industrial do Brasil",
    cnpj: "19.283.746/0001-22",
    telefone: "(11) 93456-7890",
    email: "vendas@mdfindustrial.com",
  },
  {
    codigo: "38475692000100",
    nome: "Limpe Bem Distribuidora",
    cnpj: "38.475.692/0001-00",
    telefone: "(27) 3232-4455",
    email: "atendimento@limpebem.com.br",
  },
  {
    codigo: "12345678000100",
    nome: "Portas e Janelas Vitória",
    cnpj: "12.345.678/0001-00",
    telefone: "(27) 3344-1122",
    email: "contato@pjvitoria.com.br",
  },
  {
    codigo: "90817264000155",
    nome: "Brindes Criativos LTDA",
    cnpj: "90.817.264/0001-55",
    telefone: "(11) 97634-2281",
    email: "brindes@criativos.com",
  },
  {
    codigo: "27489632000177",
    nome: "Hotel Supply Solutions",
    cnpj: "27.489.632/0001-77",
    telefone: "(27) 99988-0000",
    email: "suporte@hotelsupply.com.br",
  },
  {
    codigo: "35987236000111",
    nome: "Distribuidora Limpeza Total",
    cnpj: "35.987.236/0001-11",
    telefone: "(21) 3123-4567",
    email: "contato@limpezatotal.com",
  },
  {
    codigo: "47892563000166",
    nome: "Alumínio Forte Indústria",
    cnpj: "47.892.563/0001-66",
    telefone: "(11) 4002-8922",
    email: "vendas@aluminioforte.com",
  },
  {
    codigo: "67283991000133",
    nome: "Mega Brindes Express",
    cnpj: "67.283.991/0001-33",
    telefone: "(27) 3456-7890",
    email: "comercial@megabrindes.com.br",
  },
];
