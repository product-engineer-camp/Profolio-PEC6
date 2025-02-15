"use client";
import { Question } from "@/entities/profile/model/question.type";
import { BasicQAStepProps } from "../model/basicQA.types";
import { useBasicQAStep } from "../model/useBasicQAStep";
import { useBasicQuestions } from "../model/useBasicQuestions";
import { Button } from "@/shared/ui/button";
import { TextInput, SelectInput, NumberInput } from "./inputs";
import { ProgressBar } from "@/src/shared/ui/ProgressBar";

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

  const renderInput = (question: Question) => {
    const value = answers[question.id];
    const inputProps = {
      value,
      onChange: handleAnswer,
      question,
    };

    switch (question.type) {
      case "text":
        return <TextInput {...inputProps} />;
      case "select":
        return <SelectInput {...inputProps} />;
      case "number":
        return <NumberInput {...inputProps} />;
      default:
        return null;
    }
  };

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
        <div className="w-full space-y-4">{renderInput(currentQuestion)}</div>
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
