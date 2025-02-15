import { Input } from "@/shared/ui/input";
import { QuestionInputProps } from "../types";

export const NumberInput = ({
  value,
  onChange,
  question,
}: QuestionInputProps) => {
  return (
    <Input
      type="number"
      value={value || ""}
      onChange={(e) => {
        const val = e.target.value ? parseInt(e.target.value, 10) : "";
        onChange(question.id, val);
      }}
      placeholder={question.placeholder}
      required={question.isRequired}
      min={1}
      max={100}
    />
  );
};
