import { ProfileQuestionAnswer } from "./type";
import {
  QUESTION_GENERATION_GUIDE,
  EXAMPLE_QUESTIONS,
  CAUTIONS,
} from "../constants/aiQuestionsPrompt";

export const generateAIQuestionsPrompt = (
  basicAnswers: ProfileQuestionAnswer[],
): string => {
  return `다음 질문과 그에 대한 답변을 바탕으로 개인을 더 잘 드러낼 수 있는 맞춤 질문을 생성해주세요:

  기본 답변:
  ${basicAnswers.map(({ question, answer }) => `"${question}": ${answer}`).join("\n")}
  
  질문 생성 가이드:
  ${QUESTION_GENERATION_GUIDE.map((guide) => guide).join("\n")}
  
  예시 질문:
  ${EXAMPLE_QUESTIONS.map((q) => `- ${q}`).join("\n")}
    
  주의사항:
  ${CAUTIONS.map((caution) => `- ${caution}`).join("\n")}
  
  다른 설명 없이 JSON 배열만 응답해주세요.`;
};
