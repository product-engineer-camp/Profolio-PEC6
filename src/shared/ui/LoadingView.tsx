import { ReactNode } from "react";

type LoadingViewProps = {
  message?: string;
  children?: ReactNode;
  className?: string;
  spinnerSize?: "sm" | "md" | "lg";
  spinnerClassName?: string;
  messageClassName?: string;
  spinner?: ReactNode;
};

const spinnerSizes = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export const LoadingView = ({
  message = "로딩 중...",
  children,
  className = "",
  spinnerSize = "md",
  spinnerClassName = "",
  messageClassName = "",
  spinner,
}: LoadingViewProps) => {
  return (
    <div
      className={`flex min-h-[80vh] flex-col items-center justify-center space-y-4 ${className}`}
    >
      {spinner || (
        <div
          className={`animate-spin rounded-full border-4 border-primary border-t-transparent ${
            spinnerSizes[spinnerSize]
          } ${spinnerClassName}`}
        />
      )}
      {message && (
        <p
          className={`text-lg font-medium text-muted-foreground ${messageClassName}`}
        >
          {message}
        </p>
      )}
      {children}
    </div>
  );
};
