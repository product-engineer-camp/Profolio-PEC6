import { createClient } from "@/shared/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ profileId: string }> },
) {
  try {
    const supabase = await createClient();
    const { profileId } = await context.params;

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 },
      );
    }

    const { data: profile, error } = await supabase
      .from("profile")
      .select("id, title, created_at, updated_at, share_count")
      .eq("id", profileId)
      .is("deleted_at", null)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch profile" },
        { status: 500 },
      );
    }

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // 필드명을 카멜케이스로 변환
    const formattedProfile = {
      id: profile.id,
      title: profile.title,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
      shares: profile.share_count,
    };

    return NextResponse.json({ profile: formattedProfile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ profileId: string }> },
) {
  try {
    const supabase = await createClient();
    const { profileId } = await context.params;

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("profile")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", profileId);

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete profile" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
