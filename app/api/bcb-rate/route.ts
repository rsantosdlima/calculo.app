import { NextRequest, NextResponse } from "next/server";

// Endpoint OData do Banco Central para Moedas
const BCB_API_URL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const currency = searchParams.get("currency") || "USD"; // Padrão Dólar se não vier nada

  try {
    let attempts = 0;
    let date = new Date();
    let rateData = null;

    // Tenta buscar voltando até 7 dias (para pular finais de semana/feriados)
    while (attempts < 7 && !rateData) {
      // Formata MM-DD-YYYY
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `'${month}-${day}-${year}'`;

      // Monta a URL com a moeda dinâmica
      const url = `${BCB_API_URL}?@moeda='${currency}'&@dataCotacao=${formattedDate}&$top=1&$format=json`;

      try {
        const response = await fetch(url, { next: { revalidate: 3600 } });
        const data = await response.json();

        if (data.value && data.value.length > 0) {
          rateData = data.value[0];
        } else {
          date.setDate(date.getDate() - 1); // Volta 1 dia
        }
      } catch (err) {
        console.error(`Erro ao conectar com BCB (${currency}):`, err);
      }
      attempts++;
    }

    if (!rateData) {
      return NextResponse.json({ error: "Cotação não encontrada." }, { status: 503 });
    }

    return NextResponse.json({
      symbol: currency,
      cotacaoCompra: rateData.cotacaoCompra,
      cotacaoVenda: rateData.cotacaoVenda,
      dataHoraCotacao: rateData.dataHoraCotacao,
      fonte: "Banco Central do Brasil (PTAX)"
    });

  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}