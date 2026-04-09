'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [risultatoDati, setRisultatoDati] = useState<any>(null); // Nuovo stato per i risultati

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setRisultatoDati(null); // Resetta i vecchi risultati se carichi una nuova foto
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setLoading(true);
    setRisultatoDati(null);
    
    try {
      // Prepariamo il file da inviare
      const formData = new FormData();
      formData.append('document', file);

      // Chiamiamo la nostra API
      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setRisultatoDati(data.data.pneumatici);
      } else {
        alert("Errore: " + data.error);
      }
    } catch (error) {
      alert("Errore di connessione al server.");
    } finally {
      setLoading(false);
    }
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
          {loading ? "Analisi in corso con IA..." : "Analizza Bolla"}
        </button>

        {/* Mostriamo i risultati estratti */}
        {risultatoDati && (
          <div className="mt-8 text-left bg-gray-100 p-4 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-3">Gomme Rilevate:</h3>
            {risultatoDati.map((gomma: any, index: number) => (
              <div key={index} className="bg-white p-3 rounded shadow-sm mb-2 border-l-4 border-blue-500">
                <p className="font-bold text-gray-900">{gomma.brand} {gomma.misura}</p>
                <p className="text-sm text-gray-600">Indici: {gomma.indici} | Quantità: {gomma.quantita}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}