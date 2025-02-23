import { cn } from "@/shared/lib/utils";

type StepIndicatorProps = {
  steps: string[];
  currentStep: number;
  className?: string;
};

export const StepIndicator = ({
  steps,
  currentStep,
  className,
}: StepIndicatorProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full">
        <div className="grid w-full grid-cols-4">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isCompleted = currentStep > stepNumber;

            return (
              <div key={step} className="flex justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background text-sm font-semibold transition-colors duration-300",
                      (isActive || isCompleted) &&
                        "border-primary bg-primary text-primary-foreground",
                      !isActive &&
                        !isCompleted &&
                        "border-muted-foreground/30 text-muted-foreground",
                    )}
                  >
                    {stepNumber}
                  </div>
                  <div className="flex flex-col items-center gap-0.5 pb-2">
                    <span
                      className={cn(
                        "whitespace-nowrap text-sm font-medium",
                        (isActive || isCompleted) && "text-foreground",
                        !isActive && !isCompleted && "text-muted-foreground",
                      )}
                    >
                      {step}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute h-[4px] w-full bg-muted-foreground/30">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${(currentStep / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
