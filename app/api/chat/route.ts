import { NextResponse } from "next/server";

import { getMenu } from "@/lib/services/menu.service";
import { callLLM } from "@/lib/llm/ollama";
import { detectIntent } from "@/lib/utils/intent";
import { findItems } from "@/lib/services/menu.search";
import { formatItems } from "@/lib/utils/formatMenuResponse";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = body.message;

    const menu = await getMenu();

    const intent = detectIntent(message);

    /*
       ORDER ITEM
    */

    if (intent === "ORDER_ITEM") {
      const items = findItems(menu, message);

      if (items.length === 0) {
        return NextResponse.json({
          success: true,
          response: "Sorry, I couldn't find that item. Could you try another?",
        });
      }

      return NextResponse.json({
        success: true,
        response: formatItems(items),
      });
    }

    /*
       GET MENU
    */

    if (intent === "GET_MENU") {
      const categories = menu.categories.map((c) => c.name).join(", ");

      return NextResponse.json({
        success: true,
        response: `We offer: ${categories}`,
      });
    }

    /*
       GENERAL CHAT
    */

    const reply = await callLLM(message);

    return NextResponse.json({
      success: true,
      response: reply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        response: "Something went wrong.",
      },
      { status: 500 },
    );
  }
}
