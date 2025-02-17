import { Input } from "./input";
import { Question } from "@/src/entities/profiles/api/type";

type TextInputProps = {
  value: any;
  onChange: (questionId: string, value: any) => void;
  question: Question;
};

export const TextInput = ({ value, onChange, question }: TextInputProps) => (
  <Input
    type="text"
    value={value || ""}
    onChange={(e) => onChange(question.id, e.target.value)}
    placeholder={question.placeholder}
    maxLength={question.maxLength}
    required={question.isRequired}
  />
);
