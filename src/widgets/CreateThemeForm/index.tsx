/**
 * KeywordTagSection 2개
 * CreateThemeButton 1개
 */
"use client";
import { useState, useCallback, useMemo } from "react";
import { useThemeKeywords } from "@/entities/themes/model/useThemeKeywords";
import { transformKeywords } from "@/entities/themes/model/transformKeywords";
import { KeywordTagSection } from "@/entities/themes/ui/KeywordTagSection";
import { CreateThemeButton } from "@/features/themes/ui/CreateThemeButton";
import type { ThemeKeyword } from "@/entities/themes/api/types";

export const CreateThemeForm = () => {
  const { data, isLoading } = useThemeKeywords();
  const [selectedKeywords, setSelectedKeywords] = useState<ThemeKeyword[]>([]);

  const { moodKeywords, patternKeywords } = useMemo(() => {
    if (!data) return { moodKeywords: [], patternKeywords: [] };
    return transformKeywords(data);
  }, [data]);

  const selectedMoodKeywords = useMemo(
    () => selectedKeywords.filter((k) => k.category === "mood"),
    [selectedKeywords],
  );

  const selectedPatternKeywords = useMemo(
    () => selectedKeywords.filter((k) => k.category === "pattern"),
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
        title="분위기"
        keywords={moodKeywords}
        selectedKeywords={selectedMoodKeywords}
        onKeywordClick={handleKeywordClick}
        selectedClassName="bg-pink-200 text-pink-800"
      />
      <KeywordTagSection
        title="패턴"
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
