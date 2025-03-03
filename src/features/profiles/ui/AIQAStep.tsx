import { QAStep } from "./QAStep";
import { ProfileQuestionAnswer } from "../model/type";
import { useAIGenerateQuestions } from "../model/useAIGenerateQuestions";
import { useAnswers } from "../model/useAnswers";

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
  const { questions: aiGeneratedQuestions } =
    useAIGenerateQuestions(basicAnswers);

  const { answers, handleAnswer: handleAIAnswer } = useAnswers(aiAnswers);

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
