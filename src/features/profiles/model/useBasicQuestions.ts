import { useQuery } from "@tanstack/react-query";
import { getBasicQuestions } from "@/entities/profile/api/getBasicQuestions";

export const useBasicQuestions = () => {
  return useQuery({
    queryKey: ["basicQuestions"],
    queryFn: getBasicQuestions,
  });
};
