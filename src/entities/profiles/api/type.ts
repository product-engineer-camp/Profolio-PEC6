import type { ApiResponse } from "@/src/shared/api/type";
import type { Profile } from "../model/profile.type";

export type GetProfileResponse = ApiResponse<Profile>;

export interface Question {
  id: string;
  order: number;
  question: string;
  isRequired: boolean;
  type: "text" | "select" | "number";
  options?: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
  maxLength?: number;
}
