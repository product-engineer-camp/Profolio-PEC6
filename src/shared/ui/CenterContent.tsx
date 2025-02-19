import type { ReactNode } from "react";

type CenterContentProps = {
  children: ReactNode;
  className?: string;
};

export const CenterContent = ({
  children,
  className = "h-[50vh]",
}: CenterContentProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
};
