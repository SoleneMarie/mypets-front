// Permettre l'utilisation de classes Tailwind
export const cn = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

//Assigner des avatars aléatoires au personnes
const avatarPaths = Array.from(
  { length: 16 },
  (_, i) => `/images/default-profiles/av${i + 1}.jpg`
);
export const assignRandomAvatars = (personCount: number): string[] => {
  const assigned: string[] = [];
  let lastAvatar = "";

  for (let i = 0; i < personCount; i++) {
    const available = avatarPaths.filter((path) => path !== lastAvatar);
    const random = available[Math.floor(Math.random() * available.length)];
    assigned.push(random);
    lastAvatar = random;
  }

  return assigned;
};

//ASPECT DE LA PAGINATION
//1      ← toujours visible
// ...    ← si l'écart > 1
// 4 5 6  ← pages proches de la page actuelle (centré autour de 5 ici)
// ...    ← si écart avec la fin
// 10     ← toujours visible
export const getPaginationRange = (
  current: number,
  totalPages: number
): (number | string)[] => {
  const range: (number | string)[] = [];

  if (totalPages <= 1) return [1];

  const firstPage = 1;
  const lastPage = totalPages;

  range.push(firstPage);

  if (totalPages <= 3) {
    for (let i = 2; i < totalPages; i++) {
      range.push(i);
    }
    range.push(lastPage);
    return range;
  }

  // 👉 logique sans "half" : on veut toujours 2 pages au centre
  let left = current;
  let right = current + 1;

  // si on est en début de pagination
  if (current <= 2) {
    left = 2;
    right = 3;
  }

  // si on est en fin de pagination
  if (current >= totalPages - 1) {
    right = totalPages - 1;
    left = right - 1;
  }

  if (left > 2) {
    range.push("...");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) {
    range.push("...");
  }

  range.push(lastPage);

  return range;
};

//Assigner une photo en fonction de l'espèce d'animal
export const getSpeciePhoto = (specie: string) => {
  const species = ["cat", "dog", "bird", "rabbit", "hamster", "turtle"];
  const formatted = specie.toLowerCase();
  if (species.includes(formatted)) {
    return `/images/animals/${formatted}.png`;
  } else {
    return "/images/animals/bug.png";
  }
};
