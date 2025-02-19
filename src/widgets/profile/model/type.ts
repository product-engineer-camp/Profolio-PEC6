import { ProfileQuestionAnswer } from "@/src/features/profiles/model/type";

export type ProfileInputType = {
  basicAnswers: ProfileQuestionAnswer;
  aiAnswers: ProfileQuestionAnswer;
  preview: {
    title: string;
    description: string;
    tags: string[];
  };
};
