type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  );
};
