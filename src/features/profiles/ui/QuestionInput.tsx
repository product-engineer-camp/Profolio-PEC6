import { Question } from "@/src/entities/profiles/api/type";
import { TextInput } from "@/src/shared/ui/TextInput";
import { SelectInput } from "@/src/shared/ui/SelectInput";
import { NumberInput } from "@/src/shared/ui/NumberInput";

type QuestionInputProps = {
  value: any;
  onChange: (questionId: string, value: any) => void;
  question: Question;
};

export const QuestionInput = (props: QuestionInputProps) => {
  switch (props.question.type) {
    case "text":
      return <TextInput {...props} />;
    case "select":
      return <SelectInput {...props} />;
    case "number":
      return <NumberInput {...props} />;
    default:
      return null;
  }
};
