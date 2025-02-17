import { Input } from "./input";
import { Question } from "@/src/entities/profiles/api/type";

type NumberInputProps = {
  value: any;
  onChange: (questionId: string, value: any) => void;
  question: Question;
};

export const NumberInput = ({
  value,
  onChange,
  question,
}: NumberInputProps) => (
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
