"use client";
import { QAStep } from "@/features/profiles/ui/QAStep";
import { ThemeSelectStep } from "@/features/themes/ui/ThemeSelectStep";
import { ProfilePreviewStep } from "@/features/profiles/ui/ProfilePreviewStep";
import { LoadingView } from "@/shared/ui/LoadingView";
import { ErrorView } from "@/shared/ui/ErrorView";
import { Button } from "@/shared/ui/button";
import { useProfileCreateStep } from "../model/useProfileCreateStep";
import { useQAFlow } from "@/features/profiles/model/useQAFlow";
import { useProfileData } from "../model/useProfileData";
import { ProfileQuestionAnswer } from "@/features/profiles/model/type";
import { useAIGenerateQuestions } from "@/features/profiles/model/useAIGenerateQuestions";
import { useAnswers } from "@/features/profiles/model/useAnswers";
import { useBasicQuestions } from "@/entities/profiles/model/useBasicQuestions";
import { StepIndicator } from "@/entities/profiles/ui/StepIndicator";
import { PROFILE_CREATE_STEPS } from "@/src/entities/profiles/constants/profileCreateSteps";

export default function CreateProfileProcess() {
  const { currentStep, updateStep } = useProfileCreateStep();
  const { profileInput, updateBasicAnswers, updateAIAnswers, updateThemeId } =
    useProfileData();
  const { data: basicQuestionsData, isLoading: isLoadingBasicQuestions } =
    useBasicQuestions();

  const {
    questions: aiGeneratedQuestions,
    isLoading: isGeneratingQuestions,
    generateAIQuestions,
    error,
  } = useAIGenerateQuestions();

  const { answers: basicAnswers, handleAnswer: handleBasicAnswer } = useAnswers(
    profileInput.basicAnswers,
  );
  const { answers: aiAnswers, handleAnswer: handleAIAnswer } = useAnswers(
    profileInput.aiAnswers,
  );

  const handleBasicQAComplete = async (answers: ProfileQuestionAnswer[]) => {
    updateBasicAnswers(answers);
    try {
      await generateAIQuestions(answers);
      updateStep(2);
    } catch {
      // error 상태로 처리됨
    }
  };
  const handleAIQAComplete = (answers: ProfileQuestionAnswer[]) => {
    updateAIAnswers(answers);
    updateStep(3);
  };

  const basicNavigation = useQAFlow({
    totalSteps: basicQuestionsData?.questions.length || 0,
    onComplete: () => {
      handleBasicQAComplete(basicAnswers);
    },
  });

  const aiNavigation = useQAFlow({
    totalSteps: aiGeneratedQuestions.length,
    onComplete: () => {
      handleAIQAComplete(aiAnswers);
    },
  });

  const handleThemeSelect = (themeId: string) => {
    updateThemeId(themeId);
    updateStep(4);
  };

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
              generateAIQuestions(profileInput.basicAnswers);
            }
          }}
          variant="default"
        >
          다시 시도하기
        </Button>
      </ErrorView>
    );
  }

  return (
    <div className="space-y-8">
      <StepIndicator
        steps={PROFILE_CREATE_STEPS}
        currentStep={currentStep}
        className="mb-8"
      />
      {
        {
          1: (
            <QAStep
              questions={basicQuestionsData?.questions || []}
              isLoading={isLoadingBasicQuestions}
              currentQuestionIndex={basicNavigation.currentQAIndex}
              answers={basicAnswers}
              onAnswer={handleBasicAnswer}
              onNext={basicNavigation.handleNext}
              onPrevious={basicNavigation.handlePrevious}
            />
          ),
          2: (
            <QAStep
              questions={aiGeneratedQuestions}
              currentQuestionIndex={aiNavigation.currentQAIndex}
              answers={aiAnswers}
              onAnswer={handleAIAnswer}
              onNext={aiNavigation.handleNext}
              onPrevious={aiNavigation.handlePrevious}
            />
          ),
          3: (
            <ThemeSelectStep
              onSelect={handleThemeSelect}
              selectedThemeId={profileInput.themeId}
            />
          ),
          4: <ProfilePreviewStep profileInput={profileInput} />,
        }[currentStep]
      }
    </div>
  );
}
