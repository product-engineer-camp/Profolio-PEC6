import type { ThemeKeyword } from "../api/types";

type KeywordClickTagProps = {
  keyword: ThemeKeyword;
  isSelected: boolean;
  onClick: (keyword: ThemeKeyword) => void;
  selectedClassName?: string;
};

export const KeywordClickTag = ({
  keyword,
  isSelected,
  onClick,
  selectedClassName = "bg-pink-200 text-pink-800",
}: KeywordClickTagProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(keyword)}
      className={`rounded-full px-4 py-2 text-sm transition-colors ${
        isSelected
          ? selectedClassName
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {keyword.name}
    </button>
  );
};
