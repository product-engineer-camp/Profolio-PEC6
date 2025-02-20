import { createClient } from "@/shared/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import type { SortOption } from "@/features/profiles/model/type";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = new URL(request.url).searchParams;
  const sort = (searchParams.get("sort") as SortOption) || "shares";

  try {
    let query = supabase.from("profile").select("*").is("deleted_at", null);

    // 정렬 조건 적용
    switch (sort) {
      case "shares":
        query = query.order("share_count", { ascending: false });
        break;
      case "updated":
        query = query.order("updated_at", { ascending: false });
        break;
      case "latest":
      default:
        query = query.order("created_at", { ascending: false });
        break;
    }

    const { data: profiles, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch profiles" },
        { status: 500 },
      );
    }

    // 필드명을 카멜케이스로 변환
    const formattedProfiles = profiles?.map((profile) => ({
      ...profile,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
      shares: profile.share_count,
      // 기존 스네이크케이스 필드 제거
      created_at: undefined,
      updated_at: undefined,
      share_count: undefined,
    }));

    return NextResponse.json({ profiles: formattedProfiles });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 },
    );
  }
}
