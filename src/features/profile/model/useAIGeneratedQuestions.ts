import { useQuery } from "@tanstack/react-query";

export const useAIGeneratedQuestions = (basicAnswers: Record<string, any>) => {
  return useQuery({
    queryKey: ["aiQuestions", basicAnswers],
    queryFn: async () => {
      // TODO: Implement AI generated questions API call
      return { questions: [] };
    },
    enabled: !!basicAnswers && Object.keys(basicAnswers).length > 0,
  });
};
