import { useState } from "react";

type UseStepNavigationProps = {
  totalSteps: number;
  onComplete?: () => void;
  initialStep?: number;
};

export const useStepNavigation = ({
  totalSteps,
  onComplete,
  initialStep = 0,
}: UseStepNavigationProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return {
    currentStep,
    handleNext,
    handlePrevious,
  };
};
