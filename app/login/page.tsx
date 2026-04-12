'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
    const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Credenziali non valide. Riprova.");
      setLoading(false);
    } else {
      router.push('/'); // Torna alla dashboard dopo il login
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-blue-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Bentornato</h1>
          <p className="text-slate-500">Accedi al tuo magazzino virtuale</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">Email Officina</label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="email" 
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="esempio@officina.it"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="password" 
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Entra in Officina"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Non hai ancora una licenza? <span className="text-blue-600 font-bold cursor-pointer">Contattaci</span>
        </p>
      </div>
    </div>
  );
}