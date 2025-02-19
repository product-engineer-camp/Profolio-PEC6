import { useState } from "react";
import { ProfileQuestionAnswer } from "./type";

export const useAnswers = (initialAnswers: ProfileQuestionAnswer = {}) => {
  const [answers, setAnswers] = useState<ProfileQuestionAnswer>(initialAnswers);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  return {
    answers,
    handleAnswer,
  };
};
