import { Button } from "@/shared/ui/button";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { QuestionInput } from "./QuestionInput";
import { ProfileQuestionAnswer, QuestionAnswerType } from "../model/type";
import { Question } from "@/src/entities/profiles/api/type";

type QAStepProps = {
  questions: Question[];
  currentQuestionIndex: number;
  answers: ProfileQuestionAnswer[];
  onAnswer: (
    questionId: string,
    answer: QuestionAnswerType,
    questions: Question[],
  ) => void;
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
    return (
      <div className="flex h-[400px] w-full items-center justify-center bg-background">
        질문을 불러오는 중...
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center bg-background">
        질문이 없습니다.
      </div>
    );
  }

  const currentAnswer =
    answers.find((a) => a.question === currentQuestion.question)?.answer || "";

  return (
    <div className="flex flex-col">
      <ProgressBar current={currentQuestionIndex} total={questions.length} />

      <div className="mt-6 flex flex-1 flex-col gap-4">
        <h2 className="break-words text-xl font-semibold">
          {currentQuestion.question}
        </h2>
        <QuestionInput
          question={currentQuestion}
          value={currentAnswer}
          onChange={(questionId, value) =>
            onAnswer(questionId, value, questions)
          }
        />

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
    </div>
  );
};
