"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission since we don't have a backend
    console.log("Form Submitted:", formData);
    setStatus("success");

    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 5000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Entre em Contato</h1>

      <p className="text-gray-600 mb-8">
        Tem alguma dúvida, sugestão ou encontrou algum erro? Preencha o formulário abaixo e entraremos em contato o mais breve possível.
      </p>

      {status === "success" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 animate-fade-in">
          Mensagem enviada com sucesso! Obrigado pelo contato.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            type="text"
            id="name"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input
            type="email"
            id="email"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
          <textarea
            id="message"
            required
            rows={5}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition-colors"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
}
