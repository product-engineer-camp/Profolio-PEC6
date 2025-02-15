export type BasicQAStepProps = {
  onComplete: (answers: BasicQAAnswers) => void;
  initialAnswers?: BasicQAAnswers;
};

export type BasicQAAnswers = Record<string, any>;

export type BasicQAState = {
  currentQuestionIndex: number;
  answers: BasicQAAnswers;
};

export type BasicQAActions = {
  handleAnswer: (questionId: string, answer: any) => void;
  handleNext: () => void;
  handlePrevious: () => void;
};
