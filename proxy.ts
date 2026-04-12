import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  // 1. Crea una risposta base che potremo modificare
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 2. Inizializza il nuovo client Supabase SSR
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Aggiorna i cookie della richiesta
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          // Applica i cookie aggiornati alla risposta
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. Recupera la sessione utente
  const {
    data: { session },
  } = await supabase.auth.getSession();

const url = new URL(request.url);
  const isLoginPage = url.pathname.startsWith('/login');
  const isPublicPage = url.pathname === '/'; // La nostra nuova landing page

  // Se NON è loggato e cerca di entrare in pagine private -> rimandalo al login
  if (!session && !isLoginPage && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se è GIÀ loggato e va sul login o sulla landing -> portalo dritto in dashboard
  if (session && (isLoginPage || isPublicPage)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Applica il controllo a TUTTE le pagine tranne:
     * - api/scan (le API interne)
     * - _next/static (i file di sistema)
     * - _next/image (le immagini)
     * - favicon.ico (l'icona)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};