import { AIGeneratedQAStep } from "@/src/features/profile/ui/AIGeneratedQAStep";
import { BasicQAStep } from "@/src/features/profile/ui/BasicQAStep";
import { ThemeSelectStep } from "@/src/features/theme/ui/ThemeSelectStep";
import { useState } from "react";

export const ProfileCreateProcess = () => {
  const [step, setStep] = useState<"BasicQA" | "AIQA" | "Theme">("BasicQA");
  const [profile, setProfile] = useState<Profile | null>(null);

  const basicQuestions = [
    {
      id: 1,
      question: "What is your name?",
      answer: "John Doe",
    },
  ];

  const aiQuestions = [
    {
      id: 1,
      question: "What is your name?",
      answer: "John Doe",
    },
  ];

  const themes = [
    {
      id: 1,
      name: "Light",
      description: "A light theme",
    },
  ];

  const handleCreateProfile = (profile: Profile) => {
    // TODO: Create profile API call
  };

  const handleBasicQAComplete = (answers: Record<string, string>) => {
    setStep("AIQA");
    setProfile((prev) => ({ ...prev, ...answers }));
  };

  const handleAIQAComplete = (answers: Record<string, string>) => {
    setStep("Theme");
    setProfile((prev) => ({ ...prev, ...answers }));
  };

  const handleThemeComplete = (themeId: number) => {
    setProfile((prev) => ({ ...prev, themeId }));
  };

  return (
    <div>
      {step === "BasicQA" && (
        <BasicQAStep
          questions={basicQuestions}
          onNext
          onComplete={handleBasicQAComplete}
        />
      )}
      {step === "AIQA" && (
        <AIGeneratedQAStep
          questions={aiQuestions}
          onComplete={handleAIQAComplete}
        />
      )}
      {step === "ThemeSelect" && (
        <ThemeSelectStep themes={themes} onComplete={handleThemeComplete} />
      )}
      {step === "Preview" && (
        <CreateProfileStep profile={profile} onComplete={handleCreateProfile} />
      )}
    </div>
  );
};
