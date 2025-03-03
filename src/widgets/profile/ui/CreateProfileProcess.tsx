"use client";
import { ThemeSelectStep } from "@/features/themes/ui/ThemeSelectStep";
import { ProfilePreviewStep } from "@/features/profiles/ui/ProfilePreviewStep";
import { BasicQAStep } from "@/features/profiles/ui/BasicQAStep";
import { AIQAStep } from "@/features/profiles/ui/AIQAStep";
import { useProfileData } from "../model/useProfileData";
import { ProfileQuestionAnswer } from "@/features/profiles/model/type";
import { StepIndicator } from "@/entities/profiles/ui/StepIndicator";
import { PROFILE_CREATE_STEPS } from "@/src/entities/profiles/constants/profileCreateSteps";
import { useQueryParamState } from "@/src/shared/model/useQueryParamState";
import AsyncBoundary from "@/src/shared/ui/AsyncBoundary";
import { ErrorFallback } from "@/src/shared/ui/ErrorFallback";
import { Spinner } from "@/src/shared/ui/Spinner";

export default function CreateProfileProcess() {
  const { value: currentStep, updateValue: updateStep } = useQueryParamState(
    "step",
    1,
    "/profiles/create",
  );
  const { profileInput, updateBasicAnswers, updateAIAnswers, updateThemeId } =
    useProfileData();

  const handleBasicQAComplete = async (answers: ProfileQuestionAnswer[]) => {
    updateBasicAnswers(answers);
    updateStep(2);
  };

  const handleAIQAComplete = (answers: ProfileQuestionAnswer[]) => {
    updateAIAnswers(answers);
    updateStep(3);
  };

  const handleThemeSelect = (themeId: string) => {
    updateThemeId(themeId);
    updateStep(4);
  };

  return (
    <div className="space-y-8">
      <StepIndicator
        steps={PROFILE_CREATE_STEPS}
        currentStep={Number(currentStep)}
        className="mb-8"
      />
      {
        {
          1: (
            <AsyncBoundary
              pendingFallback={
                <div className="flex min-h-[50dvh] flex-col items-center justify-center gap-2">
                  <Spinner />
                  <h2 className="text-lg font-bold">
                    질문을 불러오는 중입니다...
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    기본 질문의 답변에 따라 개인별 질문의 내용이 달라져요
                  </p>
                </div>
              }
              rejectedFallback={(error) => (
                <ErrorFallback
                  title="질문을 불러오지 못했어요"
                  message="잠시 후 다시 시도해주세요"
                  variant="warning"
                />
              )}
            >
              <BasicQAStep
                basicAnswers={profileInput.basicAnswers}
                onComplete={handleBasicQAComplete}
              />
            </AsyncBoundary>
          ),
          2: (
            <AsyncBoundary
              pendingFallback={
                <div className="flex min-h-[50dvh] flex-col items-center justify-center gap-2">
                  <Spinner />
                  <h2 className="text-lg font-bold">
                    AI가 당신을 위한 질문을 생성하고 있어요...
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    잠시만 기다려주세요. 맞춤형 질문을 생성하고 있습니다.
                  </p>
                </div>
              }
              rejectedFallback={() => (
                <ErrorFallback
                  title="개인별 질문을 생성하지 못했어요"
                  message="잠시 후 다시 시도해주세요"
                  variant="warning"
                />
              )}
            >
              <AIQAStep
                aiAnswers={profileInput.aiAnswers}
                basicAnswers={profileInput.basicAnswers}
                onComplete={handleAIQAComplete}
              />
            </AsyncBoundary>
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
