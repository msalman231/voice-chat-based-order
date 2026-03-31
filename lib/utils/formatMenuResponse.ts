import { MenuItem } from "@/types/menu.types";

export function formatItems(items: MenuItem[]) {
  if (!items.length) return "Sorry, that item is not available.";

  return items
    .slice(0, 5)
    .map((item, index) => {
      const variations = item.variations
        ?.map((v) => `${v.name} ₹${v.price}`)
        .join(", ");

      return `
${index + 1}. ${item.name}

Category: ${item.category_name}

Price: ₹${item.price}

Variants:
${variations || "Standard"}
`;
    })
    .join("\n");
}
