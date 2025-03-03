import { useState } from "react";

type UseStepNavigationProps = {
  stepCount: number;
  onComplete?: () => void;
};

export const useStepNavigation = ({
  stepCount,
  onComplete,
}: UseStepNavigationProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const isLastStep = currentStepIndex === stepCount - 1;

  const goToNextStep = () => {
    if (isLastStep) onComplete?.();
    else setCurrentStepIndex((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return {
    currentStepIndex,
    goToNextStep,
    goToPreviousStep,
    isLastStep,
  };
};
