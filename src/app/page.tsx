"use client";

import { useRouter } from "next/navigation";
import FetchButton from "../../components/ui/fetchButton";
import Footer from "../../components/ui/footer";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1 items-center justify-center">
        <h1 className="logo text-7xl sm:text-8xl text-[var(--danger)] mb-8">
          My Pets
        </h1>
        <FetchButton onClick={() => router.push("/home")} />
      </main>
      <Footer />
    </div>
  );
}
