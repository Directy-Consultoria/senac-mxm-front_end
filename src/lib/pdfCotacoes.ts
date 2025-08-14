// lib/pdfCotacoes.ts
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DadosCotacao } from "@/types/cotacao"; // ajuste para seu path correto, se necessário

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function gerarPDFCotacoes(resultados: DadosCotacao[]) {
  const content: any[] = [];

  resultados.forEach((item, index) => {
    content.push(
      {
        text: `📌 Mapa: ${item.numeroMapa} | Nosso número: ${item.nossoNumero}`,
        style: "header",
        margin: [0, index === 0 ? 0 : 10, 0, 5],
      },
      {
        text: `📅 Geração: ${new Date(item.dataGeracao).toLocaleString()}`,
        style: "subheader",
      },
      {
        text: "📦 Itens Cotados",
        style: "sectionHeader",
        margin: [0, 10, 0, 4],
      },
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto", "*", "auto"],
          body: [
            ["Item", "Qtd", "Unidade", "Fornecedor", "Código"],
            ...item.cotacoes.flatMap((cotacao) =>
              item.fornecedores.map((fornecedor) => [
                cotacao.nome,
                cotacao.quantidade,
                cotacao.unidade,
                fornecedor.nome,
                fornecedor.codigo,
              ])
            ),
          ],
        },
        layout: "lightHorizontalLines",
      }
    );
  });

  const docDefinition = {
    content,
    styles: {
      header: { fontSize: 14, bold: true },
      subheader: { fontSize: 10, italics: true },
      sectionHeader: { fontSize: 12, bold: true },
    },
    defaultStyle: { fontSize: 9 },
    pageMargins: [40, 60, 40, 60],
  };

  pdfMake.createPdf(docDefinition).download("planilha-cotacoes.pdf");
}
