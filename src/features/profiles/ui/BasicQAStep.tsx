"use client";
import { BasicQAStepProps } from "../model/basicQA.types";
import { useBasicQAStep } from "../model/useBasicQAStep";
import { useBasicQuestions } from "../model/useBasicQuestions";
import { Button } from "@/shared/ui/button";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { QuestionInput } from "./QuestionInput";

export const BasicQAStep = ({
  onComplete,
  initialAnswers = {},
}: BasicQAStepProps) => {
  const [
    { currentQuestionIndex, answers },
    { handleAnswer, handleNext, handlePrevious },
  ] = useBasicQAStep(onComplete, initialAnswers);

  const { data, isLoading } = useBasicQuestions();
  const questions = data?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  if (isLoading) {
    return <div className="text-center">질문을 불러오는 중...</div>;
  }

  if (!currentQuestion) {
    return <div className="text-center">질문이 없습니다.</div>;
  }

  return (
    <div className="w-full space-y-6">
      <ProgressBar current={currentQuestionIndex} total={questions.length} />

      <div className="w-full space-y-4">
        <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
        <div className="w-full space-y-4">
          <QuestionInput
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={handleAnswer}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex-1 font-bold"
        >
          이전
        </Button>
        <Button onClick={handleNext} className="flex-1 font-bold">
          {currentQuestionIndex === questions.length - 1 ? "완료" : "다음"}
        </Button>
      </div>
    </div>
  );
};
