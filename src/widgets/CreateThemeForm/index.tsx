/**
 * KeywordTagSection 2개
 * CreateThemeButton 1개
 */
"use client";
import { useState, useCallback, useMemo } from "react";
import { useThemeKeywords } from "@/entities/themes/model/useThemeKeywords";
import { KeywordTagSection } from "@/entities/themes/ui/KeywordTagSection";
import { CreateThemeButton } from "@/features/themes/ui/CreateThemeButton";
import type { ThemeKeyword } from "@/entities/themes/api/types";
import {
  getKeywordsByCategory,
  getSelectedKeywordsByCategory,
} from "@/entities/themes/lib/keywordByCategory";
import { KEYWORD_CATEGORIES } from "@/entities/themes/constants/keyword";
export const CreateThemeForm = () => {
  const { data, isLoading } = useThemeKeywords();
  const [selectedKeywords, setSelectedKeywords] = useState<ThemeKeyword[]>([]);

  const keywordsByCategory = useMemo(
    () => getKeywordsByCategory(data?.keywords),
    [data?.keywords],
  );

  const selectedKeywordsByCategory = useMemo(
    () => getSelectedKeywordsByCategory(selectedKeywords),
    [selectedKeywords],
  );

  const handleKeywordClick = useCallback((keyword: ThemeKeyword) => {
    setSelectedKeywords((prev) =>
      prev.some((k) => k.id === keyword.id)
        ? prev.filter((k) => k.id !== keyword.id)
        : [...prev, keyword],
    );
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <form className="space-y-8">
      {KEYWORD_CATEGORIES.map(({ category, title, selectedClassName }) => (
        <KeywordTagSection
          key={category}
          title={title}
          keywords={keywordsByCategory[category]}
          selectedKeywords={selectedKeywordsByCategory[category]}
          onKeywordClick={handleKeywordClick}
          selectedClassName={selectedClassName}
        />
      ))}
      <div className="flex justify-center">
        <CreateThemeButton
          selectedMoodKeywords={selectedKeywordsByCategory.mood}
          selectedPatternKeywords={selectedKeywordsByCategory.pattern}
          className="mt-4"
        />
      </div>
    </form>
  );
};
