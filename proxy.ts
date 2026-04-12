import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
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

  // 4. Logica di reindirizzamento
  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
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