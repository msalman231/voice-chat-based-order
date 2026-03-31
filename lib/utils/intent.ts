export function detectIntent(message: string) {
  const text = message.toLowerCase();

  if (text.includes("menu") || text.includes("what do you have"))
    return "GET_MENU";

  if (text.includes("want") || text.includes("order") || text.includes("buy"))
    return "ORDER_ITEM";

  if (text.includes("price")) return "GET_PRICE";

  return "CHAT";
}
