'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setLoading(true);
    
    // Qui chiameremo la nostra API futura
    console.log("Scansione in corso del file:", file.name);
    
    // Simuliamo un'attesa di 2 secondi
    setTimeout(() => {
      setLoading(false);
      alert("Simulazione completata! A breve collegheremo l'IA.");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Gommista Smart</h1>
        <p className="text-gray-500 mb-8">Scansiona la bolla per caricare il magazzino</p>

        <label className="block w-full cursor-pointer border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl p-8 transition hover:bg-blue-100">
          <input 
            type="file" 
            accept="image/*;capture=camera" 
            className="hidden" 
            onChange={handleFileChange}
          />
          <span className="text-blue-600 font-semibold text-lg">
            {file ? file.name : "📸 Scatta o carica foto"}
          </span>
        </label>

        <button 
          onClick={handleScan}
          disabled={!file || loading}
          className="mt-6 w-full bg-blue-600 text-white font-bold py-4 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed transition hover:bg-blue-700"
        >
          {loading ? "Analisi in corso..." : "Analizza Bolla"}
        </button>
      </div>
    </main>
  );
}