import { useState } from "react";
import { ProfileQuestionAnswer, QuestionValue } from "./type";
import { Question } from "@/src/entities/profiles/api/type";

export const useAnswers = (initialAnswers: ProfileQuestionAnswer = []) => {
  const [answers, setAnswers] = useState<ProfileQuestionAnswer>(initialAnswers);

  const handleAnswer = (
    questionId: string,
    answer: QuestionValue,
    questions: Question[],
  ) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex(
        (a) => a.question === question.question,
      );
      if (existingAnswerIndex > -1) {
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = {
          question: question.question,
          answer,
        };
        return newAnswers;
      }
      return [...prev, { question: question.question, answer }];
    });
  };

  return {
    answers,
    handleAnswer,
  };
};
