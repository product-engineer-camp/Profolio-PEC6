import { NextResponse } from "next/server";
import type { ThemeKeywordsResponse } from "@/entities/themes/api/types";

// 실제 프로덕션에서는 DB에서 가져와야 할 데이터입니다
const MOCK_KEYWORDS: ThemeKeywordsResponse = {
  keywords: [
    { id: 1, name: "모던한", category: "mood" },
    { id: 2, name: "밝은", category: "mood" },
    { id: 3, name: "차분한", category: "mood" },
    { id: 4, name: "세련된", category: "mood" },
    { id: 5, name: "귀여운", category: "mood" },
    { id: 6, name: "단색", category: "pattern" },
    { id: 7, name: "그라데이션", category: "pattern" },
    { id: 8, name: "도트", category: "pattern" },
    { id: 9, name: "스트라이프", category: "pattern" },
    { id: 10, name: "웨이브", category: "pattern" },
  ],
};

export async function GET() {
  try {
    // 실제 구현에서는 여기서 DB 조회 로직이 들어갑니다
    const response: ThemeKeywordsResponse = MOCK_KEYWORDS;

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch keywords", code: "KEYWORDS_FETCH_ERROR" },
      { status: 500 },
    );
  }
}
