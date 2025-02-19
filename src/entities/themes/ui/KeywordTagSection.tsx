import type { ThemeKeyword } from "../api/types";
import { KeywordClickTag } from "./KeywordClickTag";

type KeywordTagSectionProps = {
  title: string;
  keywords: ThemeKeyword[];
  selectedKeywords: ThemeKeyword[];
  onKeywordClick: (keyword: ThemeKeyword) => void;
  selectedClassName?: string;
};

export const KeywordTagSection = ({
  title,
  keywords,
  selectedKeywords,
  onKeywordClick,
  selectedClassName,
}: KeywordTagSectionProps) => {
  return (
    <section className="text-left">
      <h3 className="mb-4 text-lg font-semibold text-black">
        {title} 선택하기 🎨
      </h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <KeywordClickTag
            key={keyword.id}
            keyword={keyword}
            isSelected={selectedKeywords.some(
              (selected) => selected.id === keyword.id,
            )}
            onClick={onKeywordClick}
            selectedClassName={selectedClassName}
          />
        ))}
      </div>
    </section>
  );
};
