import { PawPrint } from "lucide-react";

export default function FetchButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer relative hover:scale-105 transition-transform duration-200"
    >
      <PawPrint
        className="w-50 h-50 text-[var(--foreground)] -rotate-45"
        strokeWidth={1}
      />

      <span className="logo absolute text-[27px] text-[var(--foreground)] bottom-11 left-15">
        Fetch!
      </span>
    </button>
  );
}
