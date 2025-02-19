import { useState, useCallback, useMemo } from "react";

export const useCheckedList = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleSelection = useCallback((id: number) => {
    const idStr = String(id);
    setCheckedIds((prev) =>
      prev.includes(idStr)
        ? prev.filter((checkedId) => checkedId !== idStr)
        : [...prev, idStr],
    );
  }, []);

  const clearChecked = useCallback(() => {
    setCheckedIds([]);
  }, []);

  return useMemo(
    () => ({
      checkedIds,
      toggleSelection,
      clearChecked,
      hasCheckedItems: checkedIds.length > 0,
      checkedCount: checkedIds.length,
    }),
    [checkedIds, toggleSelection, clearChecked],
  );
};
