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
