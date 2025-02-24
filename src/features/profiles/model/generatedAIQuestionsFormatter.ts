import { Question } from "@/src/entities/profiles/api/type";

export const generatedAIQuestionsFormatter = (content: string): Question[] => {
  try {
    const questions = JSON.parse(content.replace(/\\n/g, ""));

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("유효한 질문 데이터가 없습니다.");
    }

    return questions.map((question, index) => ({
      id: crypto.randomUUID(),
      order: index + 1,
      question,
      type: "text",
      isRequired: false,
    }));
  } catch (error) {
    console.error("AI 응답 처리 오류:", error);
    throw new Error("AI 응답을 처리하는 중 오류가 발생했습니다.");
  }
};
