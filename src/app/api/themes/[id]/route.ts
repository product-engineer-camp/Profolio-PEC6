import { NextRequest, NextResponse } from "next/server";
import type { ThemeDetailResponse } from "@/entities/themes/api/types";
import { createClient } from "@/src/shared/utils/supabase/server";

type Props = {
  params: { id: string };
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await Promise.resolve(params);
    const themeId = Number(id);

    if (isNaN(themeId)) {
      return NextResponse.json(
        { message: "Invalid theme ID", code: "INVALID_THEME_ID" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { data: theme, error } = await supabase
      .from("theme")
      .select("*")
      .eq("id", themeId)
      .single();

    if (error) {
      return NextResponse.json(
        { message: "Theme not found", code: "THEME_NOT_FOUND" },
        { status: 404 },
      );
    }

    const response: ThemeDetailResponse = {
      ...theme,
      createdAt: theme.created_at,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch theme:", error);
    return NextResponse.json(
      { message: "Failed to fetch theme", code: "THEME_FETCH_ERROR" },
      { status: 500 },
    );
  }
}
