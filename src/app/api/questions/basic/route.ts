import { createClient } from "@/shared/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("basic_questions")
      .select(
        `
        id,
        order,
        question,
        isRequired:is_required,
        type,
        options,
        placeholder,
        maxLength:max_length
      `,
      )
      .order("order", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: `Failed to fetch basic questions: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ questions: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
