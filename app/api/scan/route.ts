import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Inizializza il client OpenAI usando la chiave nel file .env.local
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('document') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nessun file caricato' }, { status: 400 });
    }

    // 1. Trasformiamo l'immagine in Base64 per inviarla a OpenAI
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    const mimeType = file.type; // es. image/jpeg o image/png

    // 2. Chiamata a OpenAI (GPT-4o-mini)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" }, // Obblighiamo l'IA a rispondere in JSON
      messages: [
        {
          role: "system",
          content: `Sei l'assistente tecnico di un software per gommisti. Il tuo compito è leggere le bolle di consegna (DDT) degli pneumatici. 
          Estrai i dati in formato JSON seguendo esattamente questa struttura per ogni riga di pneumatici trovata:
          {
            "pneumatici": [
              {
                "brand": "es. Michelin",
                "misura": "es. 205/55 R16",
                "indici": "es. 91V",
                "quantita": numero intero,
                "prezzo_unitario": numero decimale o null se assente
              }
            ]
          }
          Ignora i dati fiscali o gli indirizzi. Concentrati solo sulle gomme.`
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`
              }
            }
          ]
        }
      ]
    });

    // 3. Estraiamo la risposta JSON e la rimandiamo al frontend
    const aiContent = response.choices[0].message.content;
    const jsonResult = JSON.parse(aiContent || '{}');

    return NextResponse.json({ success: true, data: jsonResult });

  } catch (error) {
    console.error("Errore API OpenAI:", error);
    return NextResponse.json({ error: 'Errore durante l\'analisi dell\'immagine' }, { status: 500 });
  }
}