import { Question } from "./type";

export async function getBasicQuestions(): Promise<{ questions: Question[] }> {
  // 환경 변수를 통해 기본 URL 설정
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/questions/basic`);

  // 나머지 코드는 동일
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch basic questions");
  }
  const data = await response.json();

  return {
    questions: data.questions,
  };
}
