import { createClient } from "@/shared/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import type { SortOption } from "@/features/profiles/model/type";
import { formatSnakeToCamel } from "@/shared/utils/formatters";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  try {
    const { data: profiles, error } = await supabase
      .from("profile")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch profiles" },
        { status: 500 },
      );
    }

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
