/**
 * Hook personnalisé : useTranslation
 * Envoie un texte (en anglais) à une API de traduction et retourne la traduction en français.
 *
 * Utilise la route POST /api/translate (client-side only).
 *
 * @param text - Texte en anglais à traduire
 * @returns { translated, loading, error }
 */

"use client";

import { useEffect, useState } from "react";

type TranslationResult = {
  translated: string;
  loading: boolean;
  error: string | null;
};

export function useTranslation(text: string): TranslationResult {
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!text) return;

    const translate = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        const data = await res.json();

        if (data.translated) {
          setTranslated(data.translated);
        } else {
          throw new Error("Aucune traduction reçue");
        }
      } catch (error: any) {
        setTranslated(text);
        setError(error.message || "Erreur inconnue, texte original utilisé.");
      } finally {
        setLoading(false);
      }
    };

    translate();
  }, [text]);

  return { translated, loading, error };
}
