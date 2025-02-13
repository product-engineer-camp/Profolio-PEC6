import { CenterContent } from "./CenterContent";

type LoadingSpinnerProps = {
  className?: string;
};

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <CenterContent className={className}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </CenterContent>
  );
};
