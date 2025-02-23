export type ProfileQuestionAnswer = Record<string, QuestionValue>;
export type QuestionValue = string | number;
import type { Profile } from "@/entities/profiles/model/type";

export type ProfileList = {
  items: Profile[];
  total: number;
  page: number;
  first: boolean;
  last: boolean;
};

export type SortOption = "shares" | "updated" | "latest";

export type SortOptionDisplay = {
  value: SortOption;
  label: string;
};
