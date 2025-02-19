import { Button } from "@/shared/ui/button";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { QuestionInput } from "./QuestionInput";
import { ProfileQuestionAnswer } from "../model/type";
import { Question } from "@/src/entities/profiles/api/type";

type QAStepProps = {
  questions: Question[];
  currentQuestionIndex: number;
  answers: ProfileQuestionAnswer;
  onAnswer: (questionId: string, answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading?: boolean;
};

export const QAStep = ({
  questions,
  isLoading,
  currentQuestionIndex,
  answers,
  onAnswer,
  onNext,
  onPrevious,
}: QAStepProps) => {
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
            onChange={(value) => onAnswer(currentQuestion.id, value)}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
          className="flex-1 font-bold"
        >
          이전
        </Button>
        <Button onClick={onNext} className="flex-1 font-bold">
          {currentQuestionIndex === questions.length - 1 ? "완료" : "다음"}
        </Button>
      </div>
    </div>
  );
};
