/**
 * Composant QuizzView
 * Utilise GraphQL pour récupérer les données côté client.
 */

"use client";
import OldestAnimalQuestion from "./quizzQuestions/question1";
import MostCommonSpecies from "./quizzQuestions/question2";

type Animal = {
  id: number;
  name: string;
  dateOfBirth: string;
  species: string;
};

export default function QuizzView() {
  return (
    <div className="w-full lg:w-220 self-center bg-[var(--secondary)] text-[var(--foreground)] p-4 rounded-lg shadow">
      <h1 className="font-bold text-xl sm:text-2xl text-center mb-8">
        Les questions du recruteur 💀
      </h1>
      <OldestAnimalQuestion />
      <MostCommonSpecies />
      <div className="mb-2">
        <p className="font-semibold">
          Qui possède <b>le plus d'animaux</b>?
        </p>
        <p className="py-2">C'est Loune, avec 5 animaux</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">
          Quel possède <b>le plus de chats</b>?
        </p>
        <p className="py-2">C'est Benoit, avec 3 chats</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">
          Qui possède <b>l'animal le plus lourd</b>? Comment s'appelle cet
          animal et quel est son poids?
        </p>
        <p className="py-2">
          C'est Marc qui possède l'animal le plus lourd : Riri, 200 kg
        </p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">
          Qui possède <b>le groupe d'animaux le plus lourd</b>? Quel est le
          poids total de ce groupe d'animaux?
        </p>
        <p className="py-2">
          C'est Teo qui possède le groupe d'animaux le plus lourd : ses
          bestioles réunies pèses 643kg.
        </p>
      </div>
    </div>
  );
}
