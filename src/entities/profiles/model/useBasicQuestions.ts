import { useQuery } from "@tanstack/react-query";
import { getBasicQuestions } from "@/src/entities/profiles/api/getBasicQuestions";

export const useBasicQuestions = () => {
  return useQuery({
    queryKey: ["basicQuestions"],
    queryFn: getBasicQuestions,
  });
};
