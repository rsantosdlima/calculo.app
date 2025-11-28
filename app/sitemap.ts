import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.calculo.app.br'; 

  return [
    // --- Institucional ---
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/termos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacidade`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },

    // --- Trabalhista ---
    { url: `${baseUrl}/calculadora-salario-liquido`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/calculadora-rescisao`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/calculadora-ferias`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/calculadora-decimo-terceiro`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/calculadora-horas-extras`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/calculadora-seguro-desemprego`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/calculadora-irrf-2026`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/comparativo-clt-pj`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/conversor-salario`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/tabelas-inss-irpf`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/calculadora-dsr-comissao`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

    // --- Financeiro ---
    { url: `${baseUrl}/calculadora-porcentagem`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/calculadora-juros-simples`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/calculadora-juros-compostos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.9 },
    { url: `${baseUrl}/simulador-financiamento`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.9 },
    { url: `${baseUrl}/calculadora-antecipacao-parcelas`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/conversor-moedas`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },

    // --- Datas ---
    { url: `${baseUrl}/calculadora-dias-uteis`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/calculadora-dias-entre-datas`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/calculadora-idade`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/somar-dias-data`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/calculadora-horas`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
  ];
}