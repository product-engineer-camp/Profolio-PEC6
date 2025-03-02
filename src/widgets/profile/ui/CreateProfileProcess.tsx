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
            <BasicQAStep
              basicAnswers={profileInput.basicAnswers}
              onComplete={handleBasicQAComplete}
            />
          ),
          2: (
            <AIQAStep
              aiAnswers={profileInput.aiAnswers}
              basicAnswers={profileInput.basicAnswers}
              onComplete={handleAIQAComplete}
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
