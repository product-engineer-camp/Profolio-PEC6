import { Label } from "@/shared/ui/label";
import { ProfileQuestionAnswer } from "@/src/features/profiles/model/type";

type QuestionListProps = {
  questions: ProfileQuestionAnswer[];
  title: string;
};

export const QuestionList = ({ questions, title }: QuestionListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {questions.map((qa) => (
        <div key={qa.order}>
          <Label>{qa.question}</Label>
          <p className="mt-1 text-muted-foreground">{qa.answer}</p>
        </div>
      ))}
    </div>
  );
};
