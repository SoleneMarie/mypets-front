// app/home/page.tsx
"use client";
import { useState } from "react";
import Header from "../../../components/ui/header";
import HomeContent from "./components/HomeContent";
import Footer from "../../../components/ui/footer";

export default function Home() {
  const [selectedView, setSelectedView] = useState<
    "persons" | "animals" | "quizz"
  >("persons");

  return (
    <main
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
      className="px-4 max-w-[1100px] w-full flex flex-col justify-between mx-auto bg-[var(--background)] text-[var(--foreground)]"
    >
      <Header selectedView={selectedView} setSelectedView={setSelectedView} />
      <HomeContent selectedView={selectedView} />
      <Footer />
    </main>
  );
}
