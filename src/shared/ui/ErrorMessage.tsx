import { CenterContent } from "./CenterContent";

type ErrorMessageProps = {
  message: string;
  className?: string;
};

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  return (
    <CenterContent className={className}>
      <p className="text-lg text-red-500">Error: {message}</p>
    </CenterContent>
  );
};
