import { NextResponse } from "next/server";
import { Resend } from "resend";

// Inicializa o cliente do Resend com a chave de API do servidor
// O Next.js/Firebase vai ler isso do arquivo .env em produção
const resend = new Resend(process.env.RESEND_API_KEY);

// Pega o e-mail de destino das variáveis de ambiente
const recipientEmail = process.env.CONTACT_EMAIL_RECIPIENT as string;

// Verificação de segurança (logs no servidor)
if (!process.env.RESEND_API_KEY) {
  console.error(
    "ERRO CRÍTICO: RESEND_API_KEY não encontrada nas variáveis de ambiente."
  );
}
if (!recipientEmail) {
  console.error(
    "ERRO CRÍTICO: CONTACT_EMAIL_RECIPIENT não encontrada nas variáveis de ambiente."
  );
}

export async function POST(request: Request) {
  try {
    // 1. Lê os dados do corpo da requisição
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 2. Validação básica no servidor
    if (!name || !email || !message) {
      console.warn("Tentativa de envio com dados incompletos:", body);
      return NextResponse.json(
        {
          error: "Campos obrigatórios (Nome, E-mail, Mensagem) estão faltando.",
        },
        { status: 400 }
      );
    }

    // Validação simples de formato de e-mail
    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "E-mail inválido." },
        { status: 400 }
      );
    }

    console.log(
      `Iniciando envio de e-mail de: ${email} para: ${recipientEmail}`
    );

    // Sanitiza o nome para evitar caracteres que quebrem o cabeçalho
    const cleanName = name.replace(/[^a-zA-Z0-9À-ÿ ]/g, "").trim() || "Visitante";

    // 3. Envia o e-mail via Resend
    const data = await resend.emails.send({
      // Remetente FIXO e profissional usando seu domínio verificado
      from: "Formulário Calculo.App <noreply@calculo.app.br>",

      // Destinatário: Sua conta do Gmail
      to: [recipientEmail],

      replyTo: `${cleanName} <${email}>`,
      // --------------------------------

      // Assunto do e-mail
      subject: `[Novo Contato] ${subject || "Sem assunto"}`,

      // Corpo do e-mail em HTML (formatação simples)
      html: `
        <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #2563eb;">Nova mensagem recebida</h2>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; border: 1px solid #bae6fd; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>De:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>E-mail:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Assunto:</strong> ${subject || "(Não informado)"}</p>
          </div>

          <h3>Mensagem:</h3>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap; border: 1px solid #eee;">${message}</div>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 0.9em; color: #666; text-align: center;">
            💡 Para responder a ${name}, basta clicar em <strong>Responder</strong> no seu e-mail.
          </p>
        </div>
      `,
    });

    if (data.error) {
      console.error("Erro retornado pela API do Resend:", data.error);
      // Retorna o erro exato para facilitar o debug (em produção, poderíamos ser mais genéricos)
      return NextResponse.json(
        { error: `Erro no serviço de e-mail: ${data.error.message}` },
        { status: 500 }
      );
    }

    console.log("E-mail enviado com sucesso! ID:", data.data?.id);

    // 4. Retorna sucesso
    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (error: any) {
    // Captura erros de rede, autenticação, etc.
    console.error("Erro inesperado (Catch) no servidor:", error);
    return NextResponse.json(
      { error: `Ocorreu um erro interno: ${error.message || "Desconhecido"}` },
      { status: 500 }
    );
  }
}