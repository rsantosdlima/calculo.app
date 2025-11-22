"use client";

import { useState } from "react";
// import type { Metadata } from "next"; // Metadados não funcionam em Client Components

export default function ContactPage() {
  // Estados para os campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Estados para controle da interface
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset de estados antes do envio
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    // Dados a serem enviados
    const formData = { name, email, subject, message };

    try {
      // Chama a nossa rota de API no backend
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Se o backend retornou um erro, lança uma exceção
        throw new Error(result.error || "Erro desconhecido ao enviar.");
      }

      // Sucesso!
      setSubmitStatus("success");
      // Limpa o formulário
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

    } catch (error: any) {
      console.error("Erro no frontend:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error.message ||
          "Não foi possível enviar sua mensagem. Tente novamente mais tarde."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Fale Conosco
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Tem alguma dúvida, sugestão ou encontrou um problema em nossas
          calculadoras? Preencha o formulário abaixo e entraremos em contato o
          mais breve possível.
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Mensagens de Feedback */}
          {submitStatus === "success" && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded animate-in fade-in">
              <div className="flex">
                {/* CORREÇÃO AQUI: flex-shrink-0 -> shrink-0 */}
                <div className="shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Sua mensagem foi enviada com sucesso! Obrigado pelo contato.
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded animate-in fade-in">
              <div className="flex">
                {/* CORREÇÃO AQUI: flex-shrink-0 -> shrink-0 */}
                <div className="shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Erro ao enviar</h3>
                  <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Campos do Formulário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Seu Nome <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                className="block w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                placeholder="João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Seu E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                className="block w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                placeholder="joao@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Assunto
            </label>
            <input
              type="text"
              id="subject"
              className="block w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
              placeholder="Ex: Dúvida sobre cálculo de férias"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Mensagem <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={6}
              required
              className="block w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 resize-y"
              placeholder="Digite sua mensagem aqui..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-auto md:px-8 py-4 rounded-lg font-bold text-white text-lg transition-all transform hover:scale-[1.02] shadow-md flex items-center justify-center ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar Mensagem"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}