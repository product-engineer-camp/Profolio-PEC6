import { useState, useCallback } from "react";

type SelectionMode = "single" | "multiple";

type UseCheckedListProps = {
  mode?: SelectionMode;
  initialChecked?: number[];
};

export const useCheckedList = ({
  mode = "multiple",
  initialChecked = [],
}: UseCheckedListProps) => {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(
    new Set(initialChecked),
  );

  const toggleSelection = useCallback(
    (id: number) => {
      setCheckedIds((prevIds) => {
        if (mode === "single") {
          if (prevIds.has(id)) {
            return new Set();
          }

          return new Set([id]);
        }

        const newSet = new Set(prevIds);

        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }

        return newSet;
      });
    },
    [mode],
  );

  const clearChecked = useCallback(() => {
    setCheckedIds(new Set());
  }, []);

  return {
    checkedIds: Array.from(checkedIds).map(String),
    toggleSelection,
    clearChecked,
    hasCheckedItems: checkedIds.size > 0,
  };
};
