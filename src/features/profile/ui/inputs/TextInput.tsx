import { Input } from "@/shared/ui/input";
import { QuestionInputProps } from "../types";

export const TextInput = ({
  value,
  onChange,
  question,
}: QuestionInputProps) => {
  return (
    <Input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(question.id, e.target.value)}
      placeholder={question.placeholder}
      maxLength={question.maxLength}
      required={question.isRequired}
    />
  );
};
