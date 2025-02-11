import { createContext, useContext, ReactNode, useState } from 'react';


interface ThemeCard {
  id: string;
  // 기타 테마 카드 관련 속성들...
}

interface SelectThemeCardContextType {
  selectedIds: Set<string>;
  toggleSelection: (id: string) => void;
  isSelected: (id: string) => boolean;
}

const SelectThemeCardContext = createContext<SelectThemeCardContextType | undefined>(undefined);

interface SelectThemeCardProviderProps {
  children: ReactNode;
  themeCards: ThemeCard[];
}

export function SelectThemeCardProvider({
  children,
  themeCards,
}: SelectThemeCardProviderProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isSelected = (id: string) => selectedIds.has(id);

  const value = {
    selectedIds,
    toggleSelection,
    isSelected,
  };

  return (
    <SelectThemeCardContext.Provider value={value}>
      {children}
    </SelectThemeCardContext.Provider>
  );
}

// 커스텀 훅
export function useSelectThemeCard() {
  const context = useContext(SelectThemeCardContext);
  if (context === undefined) {
    throw new Error('useSelectThemeCard must be used within a SelectThemeCardProvider');
  }
  return context;
}
