export interface Question {
  id: string;
  order: number;
  question: string;
  isRequired: boolean;
  type: "text" | "select" | "multiSelect" | "number" | "range";
  options?: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
  maxLength?: number;
}
