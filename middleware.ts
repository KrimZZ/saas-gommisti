import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // 1. Inizializza la risposta e il client Supabase
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 2. Recupera la sessione attiva. 
  // Questo passaggio è fondamentale anche per "rinfrescare" i token di sicurezza in background
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = new URL(req.url);
  const isLoginPage = url.pathname.startsWith('/login');
  
  // Opzionale: Permettiamo l'accesso a eventuali landing page pubbliche in futuro
  // const isPublicPage = url.pathname === '/chi-siamo' || url.pathname === '/prezzi';

  // 3. Logica di reindirizzamento:
  // Se NON è loggato e cerca di entrare nella dashboard -> rimandalo al /login
  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Se è GIÀ loggato e cerca di andare sulla pagina /login -> riportalo in dashboard
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

// 4. Configurazione dei percorsi (Matcher)
export const config = {
  matcher: [
    /*
     * Applica il middleware a TUTTE le pagine tranne:
     * - api/scan (le tue API interne, che magari proteggerai a parte)
     * - _next/static (i file CSS/JS di sistema)
     * - _next/image (le immagini ottimizzate)
     * - favicon.ico (l'icona del sito)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};