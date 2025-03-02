import { QAStep } from "./QAStep";
import { ProfileQuestionAnswer } from "../model/type";
import { useAIGenerateQuestions } from "../model/useAIGenerateQuestions";
import { useAnswers } from "../model/useAnswers";
import { LoadingView } from "@/shared/ui/LoadingView";
import { ErrorView } from "@/shared/ui/ErrorView";
import { Button } from "@/shared/ui/button";

type AIQAStepProps = {
  aiAnswers: ProfileQuestionAnswer[];
  basicAnswers: ProfileQuestionAnswer[];
  onComplete: (answers: ProfileQuestionAnswer[]) => void;
};

export const AIQAStep = ({
  aiAnswers,
  basicAnswers,
  onComplete,
}: AIQAStepProps) => {
  const {
    questions: aiGeneratedQuestions,
    isLoading: isGeneratingQuestions,
    isError,
    retry,
  } = useAIGenerateQuestions(basicAnswers);

  const { answers, handleAnswer: handleAIAnswer } = useAnswers(aiAnswers);

  if (isGeneratingQuestions) {
    return (
      <LoadingView
        message="AI가 당신을 위한 질문을 생성하고 있어요..."
        spinnerSize="lg"
        className="bg-background"
      >
        <p className="mt-2 text-sm text-muted-foreground">
          잠시만 기다려주세요. 맞춤형 질문을 생성하고 있습니다.
        </p>
      </LoadingView>
    );
  }

  if (isError) {
    return (
      <ErrorView
        title="AI 질문 생성 실패"
        message="AI 질문 생성 중 오류가 발생했습니다."
        className="bg-background"
      >
        <p className="mb-4 text-sm text-muted-foreground">
          네트워크 연결을 확인하고 다시 시도해주세요.
        </p>
        <Button onClick={() => retry()} variant="default">
          다시 시도하기
        </Button>
      </ErrorView>
    );
  }

  return (
    <QAStep
      questions={aiGeneratedQuestions}
      answers={answers}
      onAnswer={handleAIAnswer}
      totalSteps={aiGeneratedQuestions.length}
      onComplete={() => onComplete(aiAnswers)}
    />
  );
};
