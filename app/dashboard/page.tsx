'use client';

import { useState } from 'react';
import { Camera, Upload, Package, LayoutDashboard, Settings, Loader2, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [risultatoDati, setRisultatoDati] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setRisultatoDati(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setLoading(true);
    setRisultatoDati(null);
    
    try {
      const formData = new FormData();
      formData.append('document', file);

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
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20">
      {/* Header */}
      <header className="bg-blue-700 text-white p-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gommista Smart</h1>
            <p className="text-blue-200 text-sm">Officina Rossi</p>
          </div>
          <div className="bg-blue-600 p-2 rounded-full">
            <Package size={24} />
          </div>
        </div>
        
        {/* Statistiche Rapide */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-800/50 p-4 rounded-2xl backdrop-blur-sm border border-blue-600/30">
            <p className="text-blue-200 text-xs font-semibold uppercase">Gomme in Magazzino</p>
            <p className="text-3xl font-black">452</p>
          </div>
          <div className="bg-blue-800/50 p-4 rounded-2xl backdrop-blur-sm border border-blue-600/30">
            <p className="text-blue-200 text-xs font-semibold uppercase">Bolle Oggi</p>
            <p className="text-3xl font-black">3</p>
          </div>
        </div>
      </header>

      {/* Area Principale - Scansione */}
      <main className="flex-1 p-6 flex flex-col gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Nuovo Carico</h2>
          
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors group">
            <input 
              type="file" 
              accept="image/*;capture=camera" 
              className="hidden" 
              onChange={handleFileChange}
            />
            {file ? (
              <div className="flex flex-col items-center text-blue-600">
                <CheckCircle2 size={32} className="mb-2 text-green-500" />
                <span className="font-medium px-4 text-center truncate w-full">{file.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-500 group-hover:text-blue-500 transition-colors">
                <Camera size={40} className="mb-3 opacity-80" />
                <span className="font-medium text-sm">Tocca per scattare foto bolla</span>
              </div>
            )}
          </label>

          <button 
            onClick={handleScan}
            disabled={!file || loading}
            className="mt-4 w-full bg-blue-600 text-white font-bold py-4 rounded-2xl disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analisi in corso...
              </>
            ) : (
              <>
                <Upload size={20} />
                Estrai Dati
              </>
            )}
          </button>
        </div>

        {/* Risultati dell'IA */}
        {risultatoDati && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-500" />
              Gomme Rilevate
            </h3>
            <div className="space-y-3">
              {risultatoDati.map((gomma: any, index: number) => (
                <div key={index} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{gomma.brand} <span className="text-blue-600">{gomma.misura}</span></p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Indici: {gomma.indici} {gomma.prezzo_unitario ? `• €${gomma.prezzo_unitario}` : ''}</p>
                  </div>
                  <div className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-xl text-lg">
                    x{gomma.quantita}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pulsante di salvataggio futuro */}
            <button className="mt-6 w-full bg-slate-900 text-white font-bold py-4 rounded-2xl active:scale-[0.98] transition-all">
              Conferma e Salva in Magazzino
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-200 px-6 py-4 flex justify-between items-center pb-safe">
        <button className="flex flex-col items-center text-blue-600">
          <Camera size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-bold mt-1">Scan</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-slate-600 transition-colors">
          <Package size={24} />
          <span className="text-[10px] font-bold mt-1">Magazzino</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-slate-600 transition-colors">
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-slate-600 transition-colors">
          <Settings size={24} />
          <span className="text-[10px] font-bold mt-1">Impostazioni</span>
        </button>
      </nav>
    </div>
  );
}