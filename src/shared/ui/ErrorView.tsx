import { Button } from "@/shared/ui/button";
import { ReactNode } from "react";

type ErrorViewProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  children?: ReactNode;
  className?: string;
  action?: ReactNode;
};

export const ErrorView = ({
  title = "오류가 발생했습니다",
  message,
  onRetry,
  children,
  className = "",
  action,
}: ErrorViewProps) => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center p-4 ${className}`}
    >
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">{title}</h1>
        {message && <p className="text-gray-600">{message}</p>}
        {children}
        {action ||
          (onRetry && (
            <Button onClick={onRetry} variant="default">
              다시 시도하기
            </Button>
          ))}
      </div>
    </div>
  );
};
