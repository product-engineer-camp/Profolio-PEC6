import { Profile } from "@/entities/profiles/model/type";

export function generateMockProfiles(
  page: number,
  count: number = 10,
): Profile[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${page}-${index}`,
    title: `프로필 ${page}-${index}`,
    content: `안녕하세요! 저는 ${page}-${index}번째 사용자입니다.`,
    theme: "default",
    profileUrl: `https://picsum.photos/seed/${page}-${index}/200/200`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

// 실제 API 호출을 시뮬레이션하는 지연 함수
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
