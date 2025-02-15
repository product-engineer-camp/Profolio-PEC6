import { NextRequest, NextResponse } from "next/server";
import type {
  ThemeListResponse,
  ThemeDetailResponse,
} from "@/entities/themes/api/types";
import type {
  PostThemeRequest,
  PostThemeResponse,
} from "@/features/themes/api/types";

// 임시 데모 데이터
export const DEMO_THEMES: ThemeDetailResponse[] = [
  {
    id: 1,
    colors: ["#FFB5B5", "#FFE2E2", "#F6F6F6", "#B5DEFF"], // 파스텔 핑크, 라이트 핑크, 화이트, 파스텔 블루
    pattern: "solid",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    colors: ["#E8D5C4", "#FFF1DC", "#EEDCDC", "#E7C6FF"], // 파스텔 베이지, 크림, 라이트 핑크, 라벤더
    pattern: "square",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    colors: ["#C7DCA7", "#FFDEFA", "#FFF89C", "#FFC4C4"], // 파스텔 그린, 라이트 핑크, 파스텔 옐로우, 파스텔 코랄
    pattern: "dots",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    colors: ["#B4E4FF", "#95BDFF", "#DFFFD8", "#F7C8E0"], // 스카이 블루, 파스텔 블루, 민트, 라이트 핑크
    pattern: "stripes",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    colors: ["#B9F3FC", "#AEE2FF", "#93C6E7", "#FEDEFF"], // 라이트 시안, 파스텔 블루, 파스텔 네이비, 라이트 퍼플
    pattern: "waves",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    colors: ["#E3F2C1", "#C9DBB2", "#AAC8A7", "#E3CAA5"], // 라이트 그린, 세이지, 파스텔 그린, 파스텔 브라운
    pattern: "zigzag",
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    colors: ["#FFC7C7", "#FFE2E2", "#F6E6E4", "#D4F0F0"], // 코랄, 라이트 핑크, 베이지, 민트
    pattern: "dots",
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    colors: ["#FFD1D1", "#FF9EAA", "#F6E7D8", "#F7F5EB"], // 라이트 핑크, 핑크, 크림, 아이보리
    pattern: "stripes",
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    colors: ["#E1FFB1", "#C7F2A4", "#B6E388", "#FCF9BE"], // 라임, 라이트 그린, 그린, 라이트 옐로우
    pattern: "waves",
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    colors: ["#B1D7B4", "#7FB77E", "#F7E1AE", "#FFC090"], // 세이지, 그린, 크림, 피치
    pattern: "zigzag",
    createdAt: new Date().toISOString(),
  },
  {
    id: 11,
    colors: ["#CDF0EA", "#F9F9F9", "#F6C6EA", "#FAF4B7"], // 민트, 화이트, 라이트 핑크, 라이트 옐로우
    pattern: "square",
    createdAt: new Date().toISOString(),
  },
  {
    id: 12,
    colors: ["#FFF8E3", "#F1F7B5", "#A8D1D1", "#9EA1D4"], // 크림, 라이트 옐로우, 라이트 블루, 라벤더
    pattern: "solid",
    createdAt: new Date().toISOString(),
  },
  {
    id: 13,
    colors: ["#FFB3B3", "#FFDBA4", "#FFE9AE", "#C1EFFF"], // 라이트 코랄, 피치, 라이트 옐로우, 스카이 블루
    pattern: "dots",
    createdAt: new Date().toISOString(),
  },
  {
    id: 14,
    colors: ["#EEE3CB", "#D7C0AE", "#B7C4CF", "#EEE3CB"], // 베이지, 라이트 브라운, 그레이 블루, 베이지
    pattern: "waves",
    createdAt: new Date().toISOString(),
  },
  {
    id: 15,
    colors: ["#C4DFDF", "#D2E9E9", "#E3F4F4", "#F8F6F4"], // 더스티 블루, 라이트 블루, 페일 블루, 화이트
    pattern: "stripes",
    createdAt: new Date().toISOString(),
  },
  {
    id: 16,
    colors: ["#D4E2D4", "#FFCACC", "#DBC4F0", "#FFAACF"], // 세이지, 라이트 핑크, 라벤더, 핑크
    pattern: "zigzag",
    createdAt: new Date().toISOString(),
  },
  {
    id: 17,
    colors: ["#ECF2FF", "#E3DFFD", "#E5D1FA", "#FFF4D2"], // 페일 블루, 라벤더, 라이트 퍼플, 라이트 옐로우
    pattern: "square",
    createdAt: new Date().toISOString(),
  },
  {
    id: 18,
    colors: ["#CEEDC7", "#86C8BC", "#FFF6BD", "#FFD4B2"], // 라이트 그린, 민트, 라이트 옐로우, 피치
    pattern: "dots",
    createdAt: new Date().toISOString(),
  },
  {
    id: 19,
    colors: ["#FFF8EA", "#9E7676", "#815B5B", "#594545"], // 크림, 모브, 브라운, 다크 브라운
    pattern: "waves",
    createdAt: new Date().toISOString(),
  },
  {
    id: 20,
    colors: ["#FFE5F1", "#FFF4D2", "#E9FFC2", "#D5FFFF"], // 라이트 핑크, 라이트 옐로우, 라이트 그린, 라이트 블루
    pattern: "stripes",
    createdAt: new Date().toISOString(),
  },
  {
    id: 21,
    colors: ["#FFB5B5", "#FFC8C8", "#FFE2E2", "#F6F6F6"], // 첫 번째 테마의 변형
    pattern: "solid",
    createdAt: new Date().toISOString(),
  },
  {
    id: 22,
    colors: ["#E8D5C4", "#F3E0D2", "#FFF1DC", "#E7C6FF"], // 두 번째 테마의 변형
    pattern: "square",
    createdAt: new Date().toISOString(),
  },
  {
    id: 23,
    colors: ["#C7DCA7", "#D4E7B5", "#E1F2C2", "#FFC4C4"], // 세 번째 테마의 변형
    pattern: "dots",
    createdAt: new Date().toISOString(),
  },
  {
    id: 24,
    colors: ["#B4E4FF", "#C1E8FF", "#DFFFD8", "#F7C8E0"], // 네 번째 테마의 변형
    pattern: "stripes",
    createdAt: new Date().toISOString(),
  },
  {
    id: 25,
    colors: ["#B9F3FC", "#C6F5FC", "#93C6E7", "#FEDEFF"], // 다섯 번째 테마의 변형
    pattern: "waves",
    createdAt: new Date().toISOString(),
  },
  {
    id: 26,
    colors: ["#E3F2C1", "#EAF5CF", "#AAC8A7", "#E3CAA5"], // 여섯 번째 테마의 변형
    pattern: "zigzag",
    createdAt: new Date().toISOString(),
  },
  {
    id: 27,
    colors: ["#FFC7C7", "#FFD4D4", "#F6E6E4", "#D4F0F0"], // 일곱 번째 테마의 변형
    pattern: "dots",
    createdAt: new Date().toISOString(),
  },
  {
    id: 28,
    colors: ["#FFD1D1", "#FFDEDE", "#F6E7D8", "#F7F5EB"], // 여덟 번째 테마의 변형
    pattern: "stripes",
    createdAt: new Date().toISOString(),
  },
  {
    id: 29,
    colors: ["#E1FFB1", "#E8FFBE", "#B6E388", "#FCF9BE"], // 아홉 번째 테마의 변형
    pattern: "waves",
    createdAt: new Date().toISOString(),
  },
  {
    id: 30,
    colors: ["#B1D7B4", "#BEE0C1", "#F7E1AE", "#FFC090"], // 열 번째 테마의 변형
    pattern: "zigzag",
    createdAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;

  // 페이지네이션 계산
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedThemes = DEMO_THEMES.slice(startIndex, endIndex);

  const response: ThemeListResponse = {
    themes: paginatedThemes,
    totalCount: DEMO_THEMES.length,
    currentPage: page,
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body: PostThemeRequest = await request.json();

    // TODO: 실제 구현에서는 DB에 저장하는 로직이 들어갑니다
    const mockResponse: PostThemeResponse = {
      id: 3, // 임시 ID 생성
      message: "테마가 성공적으로 생성되었습니다",
    };

    return NextResponse.json(mockResponse, { status: 201 });
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

    // DEMO_THEMES에서 해당 ID들의 테마 찾기
    const themeIndexes = themeIds
      .map((id: number) => DEMO_THEMES.findIndex((theme) => theme.id === id))
      .filter((index: number) => index !== -1);

    if (themeIndexes.length === 0) {
      return NextResponse.json({ error: "Themes not found" }, { status: 404 });
    }

    // 테마들 삭제 (높은 인덱스부터 삭제해야 인덱스가 밀리지 않음)
    themeIndexes
      .sort((a: number, b: number) => b - a)
      .forEach((index: number) => {
        DEMO_THEMES.splice(index, 1);
      });

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
