import Link from 'next/link';
import { Camera, Zap, Smartphone, CheckCircle, ArrowRight, Package } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 text-slate-900">
      {/* Navbar Pubblica */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-blue-600 font-black text-2xl tracking-tighter">
          <Package size={28} />
          GommistaSmart
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2.5 text-slate-600 font-semibold hover:text-blue-600 transition">
            Accedi
          </Link>
          <Link href="/login" className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
            Prova Gratis
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 bg-blue-100 text-blue-700 font-bold rounded-full text-sm border border-blue-200">
          🚀 Il primo SaaS AI per Gommisti in Italia
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          Carica il magazzino in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">3 secondi</span>.
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          Smetti di digitare DOT e misure a mano. Scatta una foto alla bolla cartacea: la nostra IA legge i dati e aggiorna il tuo gestionale all'istante.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/login" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all text-lg flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 hover:-translate-y-1">
            Inizia la prova gratuita <ArrowRight size={20} />
          </Link>
          <a href="#pricing" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 text-lg flex items-center justify-center">
            Vedi i prezzi
          </a>
        </div>
      </header>

      {/* Features (Benefici) */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Progettato per chi ha le mani sporche</h2>
            <p className="text-slate-500">Nessun computer necessario. Fai tutto dallo smartphone mentre scarichi il furgone.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Camera size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Scansione AI Infallibile</h3>
              <p className="text-slate-600 leading-relaxed">
                Legge fatture, DDT e bolle storte o sgualcite. Riconosce in automatico marca, misura (es. 205/55 R16), indici di carico e quantità.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Risparmio di Tempo</h3>
              <p className="text-slate-600 leading-relaxed">
                Recupera fino a 45 minuti al giorno. La merce è disponibile per la vendita nello stesso istante in cui il corriere chiude il portellone.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <Smartphone size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Mobile First</h3>
              <p className="text-slate-600 leading-relaxed">
                Nessuna installazione. Si usa come un'app sul telefono. Perfetto per te e per i tuoi dipendenti direttamente in officina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Piani semplici, senza sorprese</h2>
          <p className="text-slate-500">Scegli il piano adatto al volume della tua officina.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic</h3>
            <p className="text-slate-500 mb-6">Per piccole officine che vogliono testare l'IA.</p>
            <div className="mb-8">
              <span className="text-5xl font-black">€0</span>
              <span className="text-slate-500 font-medium">/mese</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-green-500" size={20}/> 10 Scansioni AI al mese</li>
              <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-green-500" size={20}/> Magazzino virtuale base</li>
              <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-green-500" size={20}/> 1 Utente (Admin)</li>
            </ul>
            <Link href="/login" className="w-full block text-center py-4 rounded-xl font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition">
              Inizia Gratis
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-xs font-black px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              Più Scelto
            </div>
            <h3 className="text-2xl font-bold mb-2">Officina Pro</h3>
            <p className="text-slate-400 mb-6">Tutta la potenza per gestire carichi continui.</p>
            <div className="mb-8">
              <span className="text-5xl font-black">€29</span>
              <span className="text-slate-400 font-medium">/mese</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-blue-400" size={20}/> Scansioni AI <span className="font-bold text-white">Illimitate</span></li>
              <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-blue-400" size={20}/> Gestione deposito stagionale</li>
              <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-blue-400" size={20}/> Utenti illimitati per i dipendenti</li>
              <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-blue-400" size={20}/> Esportazione per il commercialista</li>
            </ul>
            <Link href="/login" className="w-full block text-center py-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 transition shadow-lg shadow-blue-600/30">
              Attiva Abbonamento Pro
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-slate-500 text-sm">
        <p>© 2026 GommistaSmart SaaS. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}