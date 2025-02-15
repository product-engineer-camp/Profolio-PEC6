import { NextRequest, NextResponse } from "next/server";
import { DEMO_THEMES } from "../route";
import type { ThemeDetailResponse } from "@/entities/themes/api/types";

type Props = {
  params: { id: string };
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const themeId = Number(params.id);

    // DEMO_THEMES에서 해당 ID의 테마 찾기
    const theme = DEMO_THEMES.find((theme) => theme.id === themeId);

    if (!theme) {
      return NextResponse.json(
        { message: "Theme not found", code: "THEME_NOT_FOUND" },
        { status: 404 },
      );
    }

    const response: ThemeDetailResponse = {
      ...theme,
      createdAt: new Date().toISOString(), // 데모 데이터이므로 현재 시간 사용
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const themeId = Number(params.id);

    // DEMO_THEMES에서 해당 ID의 테마 찾기
    const themeIndex = DEMO_THEMES.findIndex((theme) => theme.id === themeId);

    if (themeIndex === -1) {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    }

    // 테마 삭제 (실제로는 DEMO_THEMES가 상수이므로 삭제되지 않습니다)
    DEMO_THEMES.splice(themeIndex, 1);

    return NextResponse.json(
      { message: "Theme deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete theme:", error);
    return NextResponse.json(
      { error: "Failed to delete theme" },
      { status: 500 },
    );
  }
}
