import { ProfileQuestionAnswer } from "@/src/features/profiles/model/type";

export type ProfileInputType = {
  title: string;
  basicAnswers: ProfileQuestionAnswer;
  aiAnswers: ProfileQuestionAnswer;
  themeId?: string | null;
  imageUrl?: string | null;
};
