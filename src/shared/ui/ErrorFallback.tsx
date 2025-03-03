import { ReactNode } from "react";
import { cn } from "./lib/utils";
import { AlertTriangle, AlertCircle, Info } from "lucide-react"; // lucide 아이콘 import

type ErrorFallbackProps = {
  title?: string;
  message?: string;
  className?: string;
  variant?: "critical" | "warning" | "info";
  icon?: ReactNode;
};

export const ErrorFallback = ({
  title = "오류가 발생했습니다",
  message,
  className,
  variant = "critical",
  icon,
}: ErrorFallbackProps) => {
  const displayIcon = icon || defaultIcon[variant];

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border p-6",
        variantStyles[variant],
        className,
      )}
    >
      <div className="mb-4">{displayIcon}</div>

      <div className="space-y-1 text-center">
        <h1 className="text-lg font-semibold">{title}</h1>

        {message && <p className="text-sm opacity-90">{message}</p>}
      </div>
    </div>
  );
};

const defaultIcon = {
  critical: <AlertCircle size={40} className="text-red-500" />,
  warning: <AlertTriangle size={40} className="text-amber-500" />,
  info: <Info size={40} className="text-blue-500" />,
};

const variantStyles = {
  critical: "border-red-200 bg-red-50 text-red-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
};
