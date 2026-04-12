import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Users, Scan, CreditCard, Activity, Search } from 'lucide-react';

export default async function AdminDashboard() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // 1. Controlla chi sta cercando di entrare
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login');
  }

  // 2. Prendi il profilo dell'utente loggato per verificare che sia un Admin
  const { data: myProfile } = await supabase
    .from('profiles')
    .select('ruolo')
    .eq('id', session.user.id)
    .single();

  // Se non sei admin, ti sbatte fuori nella home dei gommisti
  if (myProfile?.ruolo !== 'admin') {
    redirect('/');
  }

  // 3. Se sei Admin, scarica tutti i dati dei clienti
  const { data: clients } = await supabase
    .from('profiles')
    .select('*')
    .order('data_iscrizione', { ascending: false });

  // Calcola due statistiche al volo
  const totalScans = clients?.reduce((acc, curr) => acc + (curr.scansioni_usate || 0), 0) || 0;
  const totalProUsers = clients?.filter(c => c.piano_abbonamento === 'pro').length || 0;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Laterale Nera (Stile Pannello di Controllo Veloce) */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity size={20} />
          </div>
          <h1 className="font-bold text-xl tracking-tight">SaaS Admin</h1>
        </div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-blue-400 font-medium bg-slate-800 p-3 rounded-xl"><Users size={18}/> Officine</a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white transition"><CreditCard size={18}/> Fatturazione</a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white transition"><Scan size={18}/> Log IA</a>
        </nav>
      </aside>

      {/* Contenuto Principale */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Panoramica Piattaforma</h2>
          <p className="text-slate-500">Monitora l'andamento del tuo business</p>
        </header>

        {/* Metriche */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 p-4 rounded-xl text-blue-600"><Users size={28}/></div>
            <div>
              <p className="text-slate-500 text-sm font-semibold uppercase">Officine Totali</p>
              <p className="text-3xl font-black text-slate-800">{clients?.length || 0}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-green-50 p-4 rounded-xl text-green-600"><Scan size={28}/></div>
            <div>
              <p className="text-slate-500 text-sm font-semibold uppercase">Bolle Scansionate</p>
              <p className="text-3xl font-black text-slate-800">{totalScans}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-purple-50 p-4 rounded-xl text-purple-600"><CreditCard size={28}/></div>
            <div>
              <p className="text-slate-500 text-sm font-semibold uppercase">Abbonamenti Pro</p>
              <p className="text-3xl font-black text-slate-800">{totalProUsers}</p>
            </div>
          </div>
        </div>

        {/* Tabella Clienti */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg">Elenco Clienti (Gommisti)</h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input type="text" placeholder="Cerca officina..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-semibold">Officina / Email</th>
                <th className="p-4 font-semibold">Piano</th>
                <th className="p-4 font-semibold">Scansioni Usate</th>
                <th className="p-4 font-semibold">Stato</th>
              </tr>
            </thead>
            <tbody>
              {clients && clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{client.nome_officina || 'Senza Nome'}</div>
                      <div className="text-xs text-slate-500">{client.email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${client.piano_abbonamento === 'pro' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                        {client.piano_abbonamento}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-200 rounded-full h-2 max-w-[100px]">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min((client.scansioni_usate / 100) * 100, 100)}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{client.scansioni_usate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div> Attivo
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Nessun gommista registrato al momento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}