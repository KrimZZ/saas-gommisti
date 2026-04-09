import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('document') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nessun file caricato' }, { status: 400 });
    }

    // Qui in futuro:
    // 1. Invieremo l'immagine a OpenAI (GPT-4o)
    // 2. Riceveremo il JSON con le misure delle gomme
    
    return NextResponse.json({ 
      success: true, 
      message: "API pronta a ricevere l'IA!" 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}