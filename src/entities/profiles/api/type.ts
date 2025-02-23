import type { ApiResponse } from "@/src/shared/api/type";

export type GetProfileResponse = ApiResponse<Profile>;

export type Profile = {
  id: number;
  display_name: string;
  age: number;
  occupation: string;
  hobby: string;
  current_interest: string;
  core_value: string;
  strength: string;
  role_model: string;
  personality: string;
  relationship_status: string;
  created_at: string;
  updated_at: string;
  share_count: number;
  theme: {
    id: number;
    colors: string;
    pattern: string;
  };
  personalized_questions: PersonalizedQuestion[];
};

export type PersonalizedQuestion = {
  id: string;
  question: string;
  answer: string;
};

export type Question = {
  id: string;
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
