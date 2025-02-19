import { NextResponse } from "next/server";
import { createClient } from "@/src/shared/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: keywordCategories, error } = await supabase
      .from("keyword_category")
      .select("*");

    return NextResponse.json({ keywords: keywordCategories });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch keywords", code: "KEYWORDS_FETCH_ERROR" },
      { status: 500 },
    );
  }
}
