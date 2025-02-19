import { useState } from "react";
import { ProfileQuestionAnswer } from "./type";
import { Question } from "@/src/entities/profiles/api/type";

type AIQAState = {
  currentQuestionIndex: number;
  answers: ProfileQuestionAnswer;
};

type AIQAActions = {
  handleAnswer: (questionId: string, answer: any) => void;
  handleNext: () => void;
  handlePrevious: () => void;
};

export const useAIQAStep = (
  questions: Question[],
  onComplete: (answers: ProfileQuestionAnswer) => void,
  initialAnswers: ProfileQuestionAnswer = {},
): [AIQAState, AIQAActions] => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ProfileQuestionAnswer>(initialAnswers);

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
