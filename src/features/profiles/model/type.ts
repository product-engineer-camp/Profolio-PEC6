export type QuestionValue = string | number;

export type ProfileQuestionAnswer = {
  question: string;
  answer: QuestionValue;
  category?: string;
  order: number;
};

export type ProfileInputType = {
  title: string;
  basicAnswers: ProfileQuestionAnswer[];
  aiAnswers: ProfileQuestionAnswer[];
  themeId?: string | null;
  imageUrl?: string | null;
};
