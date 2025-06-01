/**
 * Composant QuizzView
 *
 * Regroupe les différentes questions du quizz, chacune avec sa propre requête GraphQL.
 * Les questions sont affichées une à une via des sous-composants.
 */

"use client";
import OldestAnimalQuestion from "./quizzQuestions/question1";
import MostCommonSpeciesQuestion from "./quizzQuestions/question2";
import MostAnimalsOwnerQuestion from "./quizzQuestions/question3";
import TopCatOwnersQuestion from "./quizzQuestions/question4";
import HeaviestAnimalQuestion from "./quizzQuestions/question5";
import HeaviestGroupQuestion from "./quizzQuestions/question6";

export default function QuizzView() {
  return (
    <div className="w-full lg:w-220 self-center bg-[var(--secondary)] text-[var(--foreground)] p-4 rounded-lg shadow mt-8">
      <h1 className="font-bold text-xl sm:text-2xl text-center mb-8">
        Les questions du recruteur 💀
      </h1>
      <OldestAnimalQuestion />
      <MostCommonSpeciesQuestion />
      <MostAnimalsOwnerQuestion />
      <TopCatOwnersQuestion />
      <HeaviestAnimalQuestion />
      <HeaviestGroupQuestion />
    </div>
  );
}
