import { createClient } from "@/shared/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const profileId = request.url.split("/").pop();

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 },
      );
    }

    // 먼저 현재 share_count 값을 가져옵니다
    const { data: profile } = await supabase
      .from("profile")
      .select("share_count")
      .eq("id", profileId)
      .single();

    // share_count를 증가시킵니다
    const { data, error } = await supabase
      .from("profile")
      .update({
        share_count: (profile?.share_count || 0) + 1,
      })
      .eq("id", profileId)
      .select("share_count")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error updating share count:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
