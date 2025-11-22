import { NextResponse } from "next/server";
import { Resend } from "resend";

// Inicializa o cliente do Resend com a chave de API do servidor
const resend = new Resend(process.env.RESEND_API_KEY);

// Pega o e-mail de destino das variáveis de ambiente
const recipientEmail = process.env.CONTACT_EMAIL_RECIPIENT as string;

if (!recipientEmail) {
  console.error(
    "ERRO CRÍTICO: CONTACT_EMAIL_RECIPIENT não está definido no .env.local"
  );
}

export async function POST(request: Request) {
  try {
    // 1. Lê os dados do corpo da requisição
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 2. Validação básica no servidor
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Campos obrigatórios (Nome, E-mail, Mensagem) estão faltando." },
        { status: 400 }
      );
    }

    // 3. Envia o e-mail via Resend
    const data = await resend.emails.send({
      // --- ATUALIZAÇÃO AQUI: Usando seu domínio verificado ---
      // Como seu domínio está com SPF/DKIM ok, podemos usar um endereço dele.
      // "noreply", "contato" ou "site" são comuns. O nome antes do < é o que aparece pro usuário.
      from: "Formulário Calculo.App <noreply@calculo.app.br>",
      // --------------------------------------------------------

      // Destinatário: Sua conta do Gmail (continua igual)
      to: [recipientEmail],

      // Importante: Permite que você clique em "Responder" no Gmail e vá direto para o usuário que preencheu
      reply_to: email,

      // Assunto do e-mail
      subject: `[Calculo.App] Novo Contato: ${subject || "Sem assunto"}`,

      // Corpo do e-mail em HTML (formatação simples)
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #2563eb;">Nova mensagem do site</h2>
          <p>Você recebeu um novo contato através do formulário.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Assunto:</strong> ${subject || "(Não informado)"}</p>
          <h3>Mensagem:</h3>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 0.9em; color: #666;">
            Para responder, basta clicar em "Responder" no seu cliente de e-mail.
          </p>
        </div>
      `,
    });

    if (data.error) {
      console.error("Erro na API do Resend:", data.error);
      return NextResponse.json(
        { error: "O serviço de e-mail recusou o envio." },
        { status: 500 }
      );
    }

    // 4. Retorna sucesso
    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (error) {
    console.error("Erro inesperado no servidor:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro interno ao processar o envio." },
      { status: 500 }
    );
  }
}