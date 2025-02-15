import { Question } from "@/entities/profile/model/question.type";

export type QuestionInputProps = {
  value: any;
  onChange: (questionId: string, value: any) => void;
  question: Question;
};

export type QuestionOption = {
  value: string;
  label: string;
};
