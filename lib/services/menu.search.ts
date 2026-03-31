import { FormattedMenu } from "@/types/menu.types";

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();
}

/*
   Extract keywords from sentence
*/

function extractKeywords(message: string) {
  const stopWords = [
    "i",
    "want",
    "need",
    "please",
    "and",
    "the",
    "a",
    "an",
    "to",
  ];

  return normalize(message)
    .split(" ")
    .filter((word) => word.length > 2 && !stopWords.includes(word));
}

/*
   Fuzzy search items
*/

export function findItems(menu: FormattedMenu, message: string) {
  const keywords = extractKeywords(message);

  if (keywords.length === 0) return [];

  return menu.items.filter((item) => {
    const name = normalize(item.name);

    return keywords.some((word) => name.includes(word));
  });
}
