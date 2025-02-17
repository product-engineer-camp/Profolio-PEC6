"use client";
import { BasicQAStep } from "@/features/profiles/ui/BasicQAStep";
import { AIGeneratedQAStep } from "@/features/profiles/ui/AIGeneratedQAStep";
import { ThemeSelectStep } from "@/features/themes/ui/ThemeSelectStep";
import { ProfilePreviewStep } from "@/features/profiles/ui/ProfilePreviewStep";
import { LoadingView } from "@/src/shared/ui/LoadingView";
import { ErrorView } from "@/src/shared/ui/ErrorView";
import { Button } from "@/shared/ui/button";
import { useProfileSteps } from "../model/useProfileSteps";
import { useProfileData } from "../model/useProfileData";
import { BasicQAAnswers } from "@/src/features/profiles/model/type";
import { useAIGenerateQuestions } from "@/src/features/profiles/model/useAIGenerateQuestions";

export default function CreateProfileProcess() {
  const { currentStep, updateStep } = useProfileSteps();
  const { profileInput, updateBasicAnswers, updateAIAnswers } =
    useProfileData();
  const {
    questions: aiGeneratedQuestions,
    isLoading,
    generate,
    error,
  } = useAIGenerateQuestions();

  if (isLoading) {
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

  if (error) {
    return (
      <ErrorView
        title="AI 질문 생성 실패"
        message="AI 질문 생성 중 오류가 발생했습니다."
        className="bg-background"
      >
        <p className="mb-4 text-sm text-muted-foreground">
          네트워크 연결을 확인하고 다시 시도해주세요.
        </p>
        <Button
          onClick={() => {
            if (profileInput.basicAnswers) {
              generate(profileInput.basicAnswers);
            }
          }}
          variant="default"
        >
          다시 시도하기
        </Button>
      </ErrorView>
    );
  }

  const handleBasicQAComplete = async (answers: BasicQAAnswers) => {
    updateBasicAnswers(answers);
    try {
      await generate(answers);
      updateStep(2);
    } catch {
      // error 상태로 처리됨
    }
  };

  const handleAIQAComplete = (answers: BasicQAAnswers) => {
    updateAIAnswers(answers);
    updateStep(3);
  };

  return {
    1: (
      <BasicQAStep
        onComplete={handleBasicQAComplete}
        initialAnswers={profileInput.basicAnswers}
      />
    ),
    2: (
      <AIGeneratedQAStep
        questions={aiGeneratedQuestions}
        onComplete={handleAIQAComplete}
        initialAnswers={profileInput.aiAnswers}
      />
    ),
    3: <ThemeSelectStep />,
    4: <ProfilePreviewStep />,
  }[currentStep];
}
