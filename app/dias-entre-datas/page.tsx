"use client";
import { useState } from "react";

export default function DiasEntreDatas() {
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [dias, setDias] = useState<number | null>(null);

  function handleCalcular() {
    if (!dataInicial || !dataFinal) return;
    const inicio = new Date(dataInicial);
    const fim = new Date(dataFinal);
    if (fim < inicio) return;
    const diff = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
    setDias(diff);
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-4">Dias entre Datas</h1>
      <div className="mb-4">
        <label className="block mb-2">Data Inicial</label>
        <input
          type="date"
          className="border rounded px-3 py-2 w-full"
          value={dataInicial}
          onChange={e => {
            setDataInicial(e.target.value);
            if (dataFinal && e.target.value > dataFinal) setDataFinal("");
            setDias(null);
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Data Final</label>
        <input
          type="date"
          className="border rounded px-3 py-2 w-full"
          value={dataFinal}
          min={dataInicial || undefined}
          onChange={e => {
            setDataFinal(e.target.value);
            setDias(null);
          }}
        />
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleCalcular}
        disabled={!dataInicial || !dataFinal}
      >
        Calcular
      </button>
      {dias !== null && (
        <div className="mt-6 text-lg font-semibold">
          Quantidade de dias: {dias}
        </div>
      )}
    </div>
  );
}
