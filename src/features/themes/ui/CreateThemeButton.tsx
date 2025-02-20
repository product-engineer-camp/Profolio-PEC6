/**
 * 테마생성하기 버튼
 */
import type { ThemeKeyword } from "@/entities/themes/api/types";
import { usePostTheme } from "../model/usePostTheme";
import { transformToPostThemeRequest } from "../model/transformToPostThemeRequest";

type CreateThemeButtonProps = {
  selectedMoodKeywords: ThemeKeyword[];
  selectedPatternKeywords: ThemeKeyword[];
  className?: string;
};

export const CreateThemeButton = ({
  selectedMoodKeywords,
  selectedPatternKeywords,
  className = "",
}: CreateThemeButtonProps) => {
  const { mutate, isPending } = usePostTheme();

  const isDisabled =
    selectedMoodKeywords.length === 0 || selectedPatternKeywords.length === 0;

  const handleClick = () => {
    const requestData = transformToPostThemeRequest(
      selectedMoodKeywords,
      selectedPatternKeywords,
    );
    mutate(requestData);
  };

  return (
    <button
      type="button"
      disabled={isDisabled || isPending}
      onClick={handleClick}
      className={`rounded-lg bg-pink-500 px-6 py-3 text-white transition-colors ${
        isDisabled
          ? "cursor-not-allowed opacity-50"
          : "hover:bg-pink-600 active:bg-pink-700"
      } ${isPending ? "cursor-wait" : ""} ${className}`}
    >
      {isPending ? "생성 중..." : "테마 생성하기"}
    </button>
  );
};
