import { ProfileQuestionAnswer } from "@/src/features/profiles/model/type";

export type ProfileInputType = {
  basicAnswers: ProfileQuestionAnswer;
  aiAnswers: ProfileQuestionAnswer;
  themeId?: string | null;
  preview: {
    title: string;
    description: string;
    tags: string[];
  };
};
