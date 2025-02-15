import { cn } from "@/shared/ui/lib/utils";
import { QuestionInputProps } from "../types";

export const SelectInput = ({
  value,
  onChange,
  question,
}: QuestionInputProps) => {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(question.id, e.target.value)}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      )}
      required={question.isRequired}
    >
      <option value="">선택해주세요</option>
      {question.options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
