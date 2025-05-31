/**
 * Route API POST /api/translate
 * Sert à traduire un texte de l'anglais vers le français en utilisant l'API publique MyMemory.
 *
 * Entrée attendue : { text: string } dans le body JSON
 * Sortie : { translated: string } ou { error: string }
 */

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Texte invalide" }, { status: 400 });
    }

    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=en|fr`
    );

    const data = await res.json();
    if (!data?.responseData?.translatedText) {
      return NextResponse.json(
        { error: "Traduction non trouvée" },
        { status: 502 }
      );
    }
    const translated = data.responseData.translatedText;

    return NextResponse.json({ translated });
  } catch (error) {
    console.error("Erreur de traduction :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la traduction" },
      { status: 500 }
    );
  }
}
