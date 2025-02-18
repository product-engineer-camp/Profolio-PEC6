import { BasicQAAnswers } from "./type";
import {
  BASIC_QUESTIONS,
  QUESTION_GENERATION_GUIDE,
  EXAMPLE_QUESTIONS,
  CAUTIONS,
} from "../constants/aiQuestionsPrompt";

export const generateAIQuestionsPrompt = (
  basicAnswers: BasicQAAnswers,
): string => {
  return `다음 10개의 기본 질문에 대한 답변을 바탕으로, 더 깊이 있는 후속 질문들을 생성해주세요:

  ${BASIC_QUESTIONS.map((q, i) => `${i + 1}. "${q}"`).join("\n")}
  
  기본 답변:
  ${Object.entries(basicAnswers)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n")}
  
  질문 생성 가이드:
  ${QUESTION_GENERATION_GUIDE.map((guide) => guide).join("\n")}
  
  예시 질문:
  ${EXAMPLE_QUESTIONS.map((q) => `- ${q}`).join("\n")}
    
  주의사항:
  ${CAUTIONS.map((caution) => `- ${caution}`).join("\n")}
  
  다른 설명 없이 JSON 배열만 응답해주세요.`;
};
