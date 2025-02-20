import { useState } from "react";

type UseQAFlowProps = {
  totalSteps: number;
  onComplete?: () => void;
  initialQAIndex?: number;
};

export const useQAFlow = ({
  totalSteps,
  onComplete,
  initialQAIndex = 0,
}: UseQAFlowProps) => {
  const [currentQAIndex, setCurrentQAIndex] = useState(initialQAIndex);

  const isLastQA = currentQAIndex === totalSteps - 1;

  const handleNext = () => {
    if (isLastQA) onComplete?.();
    else setCurrentQAIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQAIndex > 0) {
      setCurrentQAIndex((prev) => prev - 1);
    }
  };

  return {
    currentQAIndex,
    handleNext,
    handlePrevious,
    isLastQA,
  };
};
