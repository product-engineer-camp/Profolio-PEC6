import { useMutation } from "@tanstack/react-query";
import { ProfileQuestionAnswer } from "./type";
import { generateAIQuestions } from "../api/generateAIQuestions";
import { Question } from "@/src/entities/profiles/api/type";

type UseAIGenerateQuestionsReturn = {
  questions: Question[];
  isLoading: boolean;
  error: Error | null;
  generate: (answers: ProfileQuestionAnswer) => Promise<void>;
};

export const useAIGenerateQuestions = (): UseAIGenerateQuestionsReturn => {
  const mutation = useMutation({
    mutationFn: async (answers: ProfileQuestionAnswer) => {
      const { questions } = await generateAIQuestions(answers);
      return questions;
    },
    onError: (error) => {
      if (!(error instanceof Error)) {
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
      throw error;
    },
  });

  return {
    questions: mutation.data ?? [],
    isLoading: mutation.isPending,
    error: mutation.error,
    generate: async (answers) => {
      await mutation.mutateAsync(answers);
    },
  };
};
