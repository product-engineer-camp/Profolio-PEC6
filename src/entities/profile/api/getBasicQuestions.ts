import { Question } from "../model/question.type";

export async function getBasicQuestions(): Promise<{ questions: Question[] }> {
  const response = await fetch("/api/questions/basic");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch basic questions");
  }
  const data = await response.json();

  return {
    questions: data.questions,
  };
}
