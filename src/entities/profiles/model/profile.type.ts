import type { Theme } from "./@x/theme.type";

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
  deleted_at?: string;
  theme_id: number;
  theme: Theme;
  personalized_questions: Array<{
    id: string;
    profile_id: number;
    question: string;
    answer: string;
    created_at: string;
    updated_at: string;
  }>;
};
