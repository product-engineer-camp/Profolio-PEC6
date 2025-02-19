import { useState, useCallback } from "react";

export const useCheckedList = () => {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

  const toggleSelection = useCallback((id: number) => {
    setCheckedIds((prevIds) => {
      const newSet = new Set(prevIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

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
