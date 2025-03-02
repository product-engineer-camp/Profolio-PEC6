import { QAStep } from "./QAStep";
import { ProfileQuestionAnswer } from "../model/type";
import { useBasicQuestions } from "@/entities/profiles/model/useBasicQuestions";
import { useAnswers } from "../model/useAnswers";

type BasicQAStepProps = {
  basicAnswers: ProfileQuestionAnswer[];
  onComplete: (answers: ProfileQuestionAnswer[]) => void;
};

export const BasicQAStep = ({ basicAnswers, onComplete }: BasicQAStepProps) => {
  const { data: basicQuestionsData, isLoading: isLoadingBasicQuestions } =
    useBasicQuestions();

  const { answers, handleAnswer: handleBasicAnswer } = useAnswers(basicAnswers);

  return (
    <QAStep
      questions={basicQuestionsData?.questions || []}
      isLoading={isLoadingBasicQuestions}
      answers={answers}
      onAnswer={handleBasicAnswer}
      totalSteps={basicQuestionsData?.questions.length || 0}
      onComplete={() => onComplete(basicAnswers)}
    />
  );
};
