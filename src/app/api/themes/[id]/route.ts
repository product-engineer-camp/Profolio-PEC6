import { NextRequest, NextResponse } from "next/server";
import { DEMO_THEMES } from "../route";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const themeId = Number(params.id);
  const theme = DEMO_THEMES.find((theme) => theme.id === themeId);

  if (!theme) {
    return NextResponse.json({ error: "Theme not found" }, { status: 404 });
  }

  return NextResponse.json(theme);
}
