import { useState } from "react";
import { BasicQAStep } from "../features/profile/ui/BasicQAStep";
import { AIGeneratedQAStep } from "../features/profile/ui/AIGeneratedQAStep";
import { ThemeSelectStep } from "../features/theme/ui/ThemeSelectStep";

export const ProfileCreateProcess = () => {
  const [step, setStep] = useState<"BasicQA" | "AIQA" | "Theme">("BasicQA");
  return (
    <div>
      {step === "BasicQA" && <BasicQAStep />}
      {step === "AIQA" && <AIGeneratedQAStep />}
      {step === "Theme" && <ThemeSelectStep />}
    </div>
  );
};
