"use client";
import { Button } from "@/shared/ui/button";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { QuestionInput } from "./QuestionInput";
import { useAIQAStep } from "../model/useAIQAStep";
import { BasicQAAnswers } from "../model/type";
import { Question } from "@/src/entities/profiles/api/type";

type AIGeneratedQAStepProps = {
  questions: Question[];
  onComplete: (answers: BasicQAAnswers) => void;
  initialAnswers?: BasicQAAnswers;
};

export const AIGeneratedQAStep = ({
  questions,
  onComplete,
  initialAnswers = {},
}: AIGeneratedQAStepProps) => {
  const [
    { currentQuestionIndex, answers },
    { handleAnswer, handleNext, handlePrevious },
  ] = useAIQAStep(questions, onComplete, initialAnswers);

  const currentQuestion = questions[currentQuestionIndex];

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
