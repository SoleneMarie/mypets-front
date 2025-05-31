import PersonsView from "./PersonsView";
import AnimalsView from "./AnimalsView";
import QuizzView from "./QuizzView";

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
    return <QuizzView />;
  }

  return null;
}
