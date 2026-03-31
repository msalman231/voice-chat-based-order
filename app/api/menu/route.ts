import { NextResponse } from "next/server";
import { getMenu } from "@/lib/services/menu.service";

export async function GET() {
  try {
    const menu = await getMenu();

    return NextResponse.json({
      success: true,
      menu,
      total_categories: menu.categories.length,
      total_items: menu.items.length,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch menu",
      },
      { status: 500 },
    );
  }
}
