import { ProfileQuestionAnswer } from "./type";

export const transformBasicAnswersToPayload = (
  basicAnswers: ProfileQuestionAnswer[],
) => {
  const answerMap = basicAnswers.reduce(
    (acc, { question, answer, category }) => {
      if (category) {
        acc[category] = String(answer);
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return {
    display_name: answerMap.displayName?.trim() || "",
    age: Number(answerMap.age) || 0,
    occupation: answerMap.occupation?.trim() || "",
    hobby: answerMap.hobby?.trim() || "",
    interest: answerMap.interest?.trim() || "",
    core_value: answerMap.coreValue?.trim() || "",
    strength: answerMap.strength?.trim() || "",
    role_model: answerMap.roleModel?.trim() || "",
    personality: answerMap.personality?.trim() || "",
    relationship_status: answerMap.relationshipStatus?.trim() || "",
  };
};

export const transformAIAnswersToQuestions = (
  aiAnswers: ProfileQuestionAnswer[],
) => {
  return aiAnswers.map(({ question, answer }) => ({
    question: question.trim(),
    answer: String(answer).trim(),
  }));
};
