import { useSuspenseQuery } from "@tanstack/react-query";
import { getBasicQuestions } from "@/src/entities/profiles/api/getBasicQuestions";

export const useBasicQuestions = () => {
  return useSuspenseQuery({
    queryKey: ["basicQuestions"],
    queryFn: getBasicQuestions,
  });
};
