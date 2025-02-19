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
import { filterKeywordsByCategory } from "@/entities/themes/model/transformKeywords";
import {
  KEYWORD_CATEGORY,
  KEYWORD_CATEGORY_LABEL,
} from "@/entities/themes/constants/keyword";

export const CreateThemeForm = () => {
  const { data, isLoading } = useThemeKeywords();
  const [selectedKeywords, setSelectedKeywords] = useState<ThemeKeyword[]>([]);

  const moodKeywords = useMemo(
    () => filterKeywordsByCategory(data?.keywords, KEYWORD_CATEGORY.MOOD),
    [data?.keywords],
  );

  const patternKeywords = useMemo(
    () => filterKeywordsByCategory(data?.keywords, KEYWORD_CATEGORY.PATTERN),
    [data?.keywords],
  );

  const selectedMoodKeywords = useMemo(
    () => filterKeywordsByCategory(selectedKeywords, KEYWORD_CATEGORY.MOOD),
    [selectedKeywords],
  );

  const selectedPatternKeywords = useMemo(
    () => filterKeywordsByCategory(selectedKeywords, KEYWORD_CATEGORY.PATTERN),
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
      <KeywordTagSection
        title={KEYWORD_CATEGORY_LABEL[KEYWORD_CATEGORY.MOOD]}
        keywords={moodKeywords}
        selectedKeywords={selectedMoodKeywords}
        onKeywordClick={handleKeywordClick}
        selectedClassName="bg-pink-200 text-pink-800"
      />
      <KeywordTagSection
        title={KEYWORD_CATEGORY_LABEL[KEYWORD_CATEGORY.PATTERN]}
        keywords={patternKeywords}
        selectedKeywords={selectedPatternKeywords}
        onKeywordClick={handleKeywordClick}
        selectedClassName="bg-purple-200 text-purple-800"
      />
      <div className="flex justify-center">
        <CreateThemeButton
          selectedMoodKeywords={selectedMoodKeywords}
          selectedPatternKeywords={selectedPatternKeywords}
          className="mt-4"
        />
      </div>
    </form>
  );
};
