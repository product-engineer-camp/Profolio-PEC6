import { BasicQAAnswers } from "@/src/features/profiles/model/type";

export type ProfileInputType = {
  basicAnswers: BasicQAAnswers;
  aiAnswers: BasicQAAnswers;
  preview: {
    title: string;
    description: string;
    tags: string[];
  };
};
