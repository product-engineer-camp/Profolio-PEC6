import { useState } from "react";
import { BasicQAAnswers } from "./type";
import { useBasicQuestions } from "@/src/entities/profiles/model/useBasicQuestions";

type BasicQAState = {
  currentQuestionIndex: number;
  answers: BasicQAAnswers;
};

type BasicQAActions = {
  handleAnswer: (questionId: string, answer: any) => void;
  handleNext: () => void;
  handlePrevious: () => void;
};

export const useBasicQAStep = (
  onComplete: (answers: BasicQAAnswers) => void,
  initialAnswers: BasicQAAnswers = {},
): [BasicQAState, BasicQAActions] => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<BasicQAAnswers>(initialAnswers);

  const { data } = useBasicQuestions();
  const questions = data?.questions || [];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return [
    { currentQuestionIndex, answers },
    { handleAnswer, handleNext, handlePrevious },
  ];
};
