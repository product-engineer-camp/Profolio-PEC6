import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/ui/lib/utils";
import { Question } from "@/src/entities/profiles/api/type";
type QuestionInputProps = {
  value: any;
  onChange: (questionId: string, value: any) => void;
  question: Question;
};

export const QuestionInput = ({
  value,
  onChange,
  question,
}: QuestionInputProps) => {
  switch (question.type) {
    case "text":
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

    case "select":
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

    case "number":
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

    default:
      return null;
  }
};
