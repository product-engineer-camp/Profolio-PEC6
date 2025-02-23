import { createClient } from "@/shared/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import type { SortOption } from "@/features/profiles/model/type";
import { formatSnakeToCamel } from "@/shared/utils/formatters";

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

    // formatSnakeToCamel을 사용하여 각 프로필 데이터를 카멜케이스로 변환
    const formattedProfiles = profiles?.map((profile) =>
      formatSnakeToCamel(profile),
    );

    return NextResponse.json({ profiles: formattedProfiles });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 },
    );
  }
}
