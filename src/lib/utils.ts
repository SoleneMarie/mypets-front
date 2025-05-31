/**
 * Combine plusieurs classes conditionnelles en une seule chaîne.
 * Utilisé pour appliquer dynamiquement des classes Tailwind.
 *
 * @param classes - Tableau de strings
 * @returns Chaîne de classes filtrées
 */
export const cn = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Retourne un avatar aléatoire depuis les fichiers par défaut.
 *
 * @returns Le chemin d'un avatar
 */
const avatarPaths = Array.from(
  { length: 16 },
  (_, i) => `/images/default-profiles/av${i + 1}.jpg`
);
export const getRandomAvatar = (): string => {
  const randomIndex = Math.floor(Math.random() * avatarPaths.length);
  return avatarPaths[randomIndex];
};

/**
 * Assigne des avatars aléatoires à un certain nombre de personnes.
 * Évite que deux avatars consécutifs soient identiques.
 *
 * @param personCount - Nombre de personnes
 * @returns Tableau de chemins d'avatars
 */
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

/**
 * Calcule les pages à afficher dans une pagination.
 * Affiche toujours la première et la dernière page, et les pages proches de la page actuelle.
 * Ajoute des points de suspension ("...") si nécessaire.
 *
 * @param current - Page actuelle
 * @param totalPages - Nombre total de pages
 * @returns Tableau de numéros de page et de chaînes "..."
 */

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

  //ASPECT DE LA PAGINATION
  //1      ← toujours visible
  // ...    ← si l'écart > 1
  // 4 5 6  ← pages proches de la page actuelle (centré autour de 5 ici)
  // ...    ← si écart avec la fin
  // 10     ← toujours visible
  return range;
};

/**
 * Retourne l'image correspondant à une espèce.
 *
 * @param specie - Nom de l'espèce (insensible à la casse)
 * @returns Chemin de l'image correspondante ou image par défaut
 */
export const getSpeciePhoto = (specie: string) => {
  const species = ["cat", "dog", "bird", "rabbit", "hamster", "turtle"];
  const formatted = specie.toLowerCase();
  if (species.includes(formatted)) {
    return `/images/animals/${formatted}.png`;
  } else {
    return "/images/animals/bug.png";
  }
};

/**
 * Formate un poids en grammes vers une chaîne en kg et g.
 *
 * @param grams - Poids en grammes (nombre ou chaîne de caractères)
 * @returns Chaîne formatée comme "X, Ykg"
 */
export const formatWeight = (grams: number) => {
  const g = typeof grams === "string" ? parseInt(grams, 10) : grams;
  const kg = Math.floor(g / 1000);
  const remainingGrams = g % 1000;
  return `${kg}, ${remainingGrams}kg`;
};

/**
 * Calcule l'âge à partir de la date de naissance.
 *
 * @param dateOfBirth - Date de naissance au format ISO
 * @returns Chaîne formatée comme "2 ans", "5 mois", "1 an et 3 mois", etc.
 */
export const calculateAge = (dateOfBirth: string) => {
  const birthDate = new Date(dateOfBirth);
  const now = new Date();
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }
  if (years === 0) return `${months} mois`;
  if (months === 0) return `${years} an${years > 1 ? "s" : ""}`;
  return `${years} an${years > 1 ? "s" : ""} et ${months} mois`;
};
