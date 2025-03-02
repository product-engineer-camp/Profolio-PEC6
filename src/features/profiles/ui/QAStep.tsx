import { Button } from "@/shared/ui/button";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { QuestionInput } from "./QuestionInput";
import { ProfileQuestionAnswer, QuestionAnswerType } from "../model/type";
import { Question } from "@/src/entities/profiles/api/type";
import { useStepNavigation } from "@/src/shared/model/useStepNavigation";

type QAStepProps = {
  questions: Question[];
  answers: ProfileQuestionAnswer[];
  onAnswer: (
    questionId: string,
    answer: QuestionAnswerType,
    questions: Question[],
  ) => void;
  totalSteps: number;
  onComplete?: () => void;
  isLoading?: boolean;
};

export const QAStep = ({
  questions,
  isLoading,
  answers,
  onAnswer,
  totalSteps,
  onComplete,
}: QAStepProps) => {
  const { currentStepIndex, goToNextStep, goToPreviousStep } =
    useStepNavigation({
      stepCount: totalSteps,
      onComplete,
    });

  const currentQuestion = questions[currentStepIndex];

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
      <ProgressBar current={currentStepIndex} total={questions.length} />

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
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
            className="flex-1 font-bold"
          >
            이전
          </Button>
          <Button onClick={goToNextStep} className="flex-1 font-bold">
            {currentStepIndex === questions.length - 1 ? "완료" : "다음"}
          </Button>
        </div>
      </div>
    </div>
  );
};
