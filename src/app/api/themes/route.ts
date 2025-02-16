import { NextRequest, NextResponse } from "next/server";
import type {
  ThemeListResponse,
  ThemeDetailResponse,
} from "@/entities/themes/api/types";
import type {
  PostThemeRequest,
  PostThemeResponse,
} from "@/features/themes/api/types";
import { createClient } from "@/src/shared/utils/supabase/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const supabase = await createClient();

  // 전체 개수 조회
  const { count } = await supabase
    .from("theme")
    .select("*", { count: "exact", head: true });

  // 페이지네이션 적용하여 데이터 조회
  const { data: themes, error } = await supabase
    .from("theme")
    .select("*")
    .range((page - 1) * limit, page * limit - 1);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const response: ThemeListResponse = {
    themes: themes || [],
    totalCount: count || 0,
    currentPage: page,
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body: PostThemeRequest = await request.json();
    const supabase = await createClient();
    const { data: lastTheme, error: fetchError } = await supabase
      .from("theme")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .single();

    const nextId = (lastTheme?.id || 0) + 1;
    const { data, error } = await supabase
      .from("theme")
      .insert({
        id: nextId,
        colors: ["#FFC7C7", "#FFD4D4", "#F6E6E4", "#D4F0F0"],
        pattern: "dots",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    const response: PostThemeResponse = {
      id: data.id,
      message: "테마가 성공적으로 생성되었습니다",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Failed to create theme:", error);
    return NextResponse.json(
      { message: "Failed to create theme", code: "THEME_CREATE_ERROR" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { themeIds } = await request.json();
    const supabase = await createClient();

    const { error } = await supabase.from("theme").delete().in("id", themeIds);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Themes deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete themes:", error);
    return NextResponse.json(
      { error: "Failed to delete themes" },
      { status: 500 },
    );
  }
}
