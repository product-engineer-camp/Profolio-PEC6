export const ProgressBar = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => (
  <div className="mb-4">
    <div className="mb-2 text-sm font-medium">
      {current + 1} / {total}
    </div>
    <div className="flex gap-1">
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className={`h-2 flex-1 rounded-full ${
            index <= current ? "bg-green-400" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  </div>
);
