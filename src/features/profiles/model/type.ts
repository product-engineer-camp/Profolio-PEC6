import { Profile, QAType } from "@/src/entities/profiles/api/type";
import { ApiResponse } from "@/src/shared/api/type";

export type QuestionValue = string | number;

export type ProfileQuestionAnswer = {
  question: string;
  answer: QuestionValue;
  category?: string;
  order: number;
};

export type ProfileInputType = {
  title: string;
  basicAnswers: ProfileQuestionAnswer[];
  aiAnswers: ProfileQuestionAnswer[];
  themeId?: string | null;
  imageUrl?: string | null;
};

export type CreateProfilePayload = {
  title: string;
  displayName: string;
  age: number;
  occupation: string;
  hobby: string;
  interest: string;
  coreValue: string;
  strength: string;
  roleModel: string;
  personality: string;
  relationshipStatus: string;
  themeId: number;
  avatarUrl: string;
  personalizedQuestions: QAType[];
};

export type CreateProfileResponse = ApiResponse<Profile | null>;
