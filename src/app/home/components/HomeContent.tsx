"use client";
import { useState, useEffect } from "react";
import Loader from "../../../../components/ui/loader";

type HomeContentProps = {
  selectedView: "persons" | "animals" | "quizz";
};

export default function HomeContent(selectedView: HomeContentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (isLoading) {
    return <Loader />;
  }

  return <div className="flex-1"></div>;
}
