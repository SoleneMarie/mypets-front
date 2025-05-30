import PersonsView from "./PersonsView";
import AnimalsView from "./AnimalsView";

type HomeContentProps = {
  selectedView: "persons" | "animals" | "quizz";
};
export default function HomeContent({ selectedView }: HomeContentProps) {
  if (selectedView === "persons") {
    return <PersonsView />;
  }

  if (selectedView === "animals") {
    return <AnimalsView />;
  }

  if (selectedView === "quizz") {
    return <div>À venir : quizz interactif 🎲</div>;
  }

  return null;
}
