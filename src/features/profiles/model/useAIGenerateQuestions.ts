import { useSuspenseQuery } from "@tanstack/react-query";
import { ProfileQuestionAnswer } from "./type";
import { generateAIQuestions } from "../api/generateAIQuestions";

// 고민되는점: 동일한 input에 대해 동일한 값이 나오면 useQuery를 사용해도 된다.
// 하지만 여기서는 LLM이 매번 새로 생성해주기 때문에 동일한 값을 주지 않음. GET요청이 아니므로.
// 그래서 useMutation을 사용해서 새로 생성해주는 방식으로 구현 하는 것을 고려하다보면 또 문제가 있는데
// useMutation은 내부적으로 데이터 로딩을 바로 처리하지 않고 외부에 mutate 함수를 넘겨서 외부에서 처리해야하는 문제가 있음.
// 어차피 AIQAStep 컴포넌트가 렌더링 되자마자 props로 받은 basicAnswers를 통해 생성 요청을 무조건 해야하는데,
// 그러면 useMutation 사용시 useEffect로 처리해야하는 불필요한 복잡성이 올라가는 문제가 있어서 일단 useQuery를 사용해서 구현.
export const useAIGenerateQuestions = (
  basicAnswers: ProfileQuestionAnswer[],
) => {
  const { data: questions = [], refetch } = useSuspenseQuery({
    queryKey: ["aiQuestions", basicAnswers],
    queryFn: async () => {
      const result = await generateAIQuestions(basicAnswers);
      return result.questions;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    questions,
    retry: refetch,
  };
};
