import { Question } from "@/src/entities/profiles/api/type";
import { QUESTION_AGE_INPUT_VALIDATION } from "@/src/features/profiles/constants/questionInput";
import { Input } from "@/src/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui/select";
import { useCallback } from "react";
import { QuestionValue } from "../model/type";

type QuestionInputProps = {
  value: QuestionValue;
  onChange: (questionId: string, value: QuestionValue) => void;
  question: Question;
  error?: string;
};

export const QuestionInput = ({
  value,
  onChange,
  question,
  error,
}: QuestionInputProps) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue =
        question.type === "number"
          ? e.target.value
            ? parseInt(e.target.value, 10)
            : ""
          : e.target.value;

      if (question.type === "number") {
        const numValue = Number(newValue);
        if (
          !isNaN(numValue) &&
          numValue >= QUESTION_AGE_INPUT_VALIDATION.MIN &&
          numValue <= QUESTION_AGE_INPUT_VALIDATION.MAX
        ) {
          onChange(question.id, numValue);
        }
      } else {
        onChange(question.id, newValue);
      }
    },
    [question, onChange],
  );

  const handleSelectChange = useCallback(
    (selectedValue: string) => {
      onChange(question.id, selectedValue);
    },
    [question.id, onChange],
  );

  if (question.type === "select") {
    return (
      <Select value={String(value) || ""} onValueChange={handleSelectChange}>
        <SelectTrigger className={error ? "border-red-500" : ""}>
          <SelectValue placeholder="선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          {question.options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input
      type={question.type}
      value={value || ""}
      onChange={handleInputChange}
      placeholder={question.placeholder}
      maxLength={question.type === "text" ? question.maxLength : undefined}
      min={
        question.type === "number"
          ? QUESTION_AGE_INPUT_VALIDATION.MIN
          : undefined
      }
      max={
        question.type === "number"
          ? QUESTION_AGE_INPUT_VALIDATION.MAX
          : undefined
      }
      required={question.isRequired}
      className={error ? "border-red-500" : ""}
      aria-invalid={!!error}
      aria-errormessage={error}
    />
  );
};
