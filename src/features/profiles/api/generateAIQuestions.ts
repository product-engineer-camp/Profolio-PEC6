import { ProfileQuestionAnswer } from "../model/type";
import { generateAIQuestionsPrompt } from "../model/generateAIQuestionsPrompt";
import { generatedAIQuestionsFormatter } from "../model/generatedAIQuestionsFormatter";
import { Question } from "@/src/entities/profiles/api/type";

type GenerateAIQuestionsResponse = {
  questions: Question[];
};

export const generateAIQuestions = async (
  basicAnswers: ProfileQuestionAnswer[],
): Promise<GenerateAIQuestionsResponse> => {
  const message = generateAIQuestionsPrompt(basicAnswers);

  const response = await fetch("/api/questions/personalized", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("AI 질문 생성에 실패했습니다.");
  }

  const data = await response.json();
  const questions = generatedAIQuestionsFormatter(data.content);
  return { questions };
};
