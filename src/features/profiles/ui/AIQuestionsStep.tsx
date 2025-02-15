"use client";

import { useAIGeneratedQuestions } from "../model/useAIGeneratedQuestions";

interface AIQuestionsStepProps {
  basicAnswers: Record<string, any>;
  onComplete: (answers: Record<string, any>) => void;
}

export const AIQuestionsStep = ({
  basicAnswers,
  onComplete,
}: AIQuestionsStepProps) => {
  const { data, isLoading, error } = useAIGeneratedQuestions(basicAnswers);

  if (isLoading) {
    return <div className="text-center">AI가 질문을 생성하는 중...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        질문을 생성하는데 실패했습니다.
      </div>
    );
  }

  // TODO: Implement AI questions UI similar to BasicQAStep
  return <div>{/* AI 질문 UI 구현 */}</div>;
};
