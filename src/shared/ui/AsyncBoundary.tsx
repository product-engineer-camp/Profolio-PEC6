import React, { ReactNode, Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "./button";

interface AsyncBoundaryProps {
  children: ReactNode;
  pendingFallback?: ReactNode;
  rejectedFallback?: (error: Error) => ReactNode;
}

const DefaultPendingFallback = () => <div>로딩 중입니다.</div>;
const DefaultRejectedFallback = (error: Error) => (
  <div>에러가 발생했습니다. {error.message}</div>
);

const AsyncBoundary = ({
  children,
  pendingFallback = <DefaultPendingFallback />,
  rejectedFallback = DefaultRejectedFallback,
}: AsyncBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }: FallbackProps) => (
            <div className="flex flex-col items-center justify-center gap-4">
              {rejectedFallback(error)}
              <Button onClick={() => resetErrorBoundary()}>다시 시도</Button>
            </div>
          )}
          onReset={reset}
        >
          <Suspense fallback={pendingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default AsyncBoundary;
