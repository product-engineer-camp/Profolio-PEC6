import type { ApiResponse, BaseType } from "@/src/shared/api/type";
import { ThemeDetailResponse } from "../../themes/api/types";

export type GetProfileResponse = ApiResponse<Profile>;

export type Profile = BaseType & {
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
  shareCount: number;
  theme: ThemeDetailResponse;
  personalizedQuestions: PersonalizedQuestion[];
};

export type QAType = {
  question: string;
  answer: string;
};

export type PersonalizedQuestion = BaseType & QAType;

export type Question = {
  order: number;
  question: string;
  isRequired: boolean;
  category?: string;
  type: "text" | "select" | "number";
  options?: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
  maxLength?: number;
};
