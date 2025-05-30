"use client";
import Image from "next/image";

type OneCardProps = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
};

export default function OneSmallCard({
  id,
  firstName,
  lastName,
  avatar,
}: OneCardProps) {
  return (
    <div
      key={id}
      className="flex flex-col lg:flex-row items-center gap-2 bg-[var(--secondary)] text-[var(--foreground)] p-4 rounded-lg shadow hover:shadow-lg transition"
    >
      <Image
        src={avatar}
        alt={`${firstName} ${lastName}`}
        width={100}
        height={100}
        className="rounded-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
      />
      <div className="w-full lg:w-28 xl:w-36">
        <h3 className=" truncate font-semibold text-center text-[15px] sm:text-lg">
          {firstName} {lastName}
        </h3>
      </div>
    </div>
  );
}
