import { createContext, useContext, ReactNode, useState } from 'react';

type SelectionType = 'delete' | 'select';

interface ThemeCard {
  id: string;
  // 기타 테마 카드 관련 속성들...
}

interface SelectThemeCardContextType {
  // 상태
  selectedIds: Set<string>;
  selectionType: SelectionType | null;
  
  // 선택 관련 메서드
  toggleSelection: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  isSelected: (id: string) => boolean;
  
  // 선택 모드 관련 메서드
  startSelectionMode: (type: SelectionType) => void;
  cancelSelectionMode: () => void;
  
  // 실행 메서드
  executeSelection: () => void;
}

const SelectThemeCardContext = createContext<SelectThemeCardContextType | undefined>(undefined);

interface SelectThemeCardProviderProps {
  children: ReactNode;
  themeCards: ThemeCard[];
  onDelete?: (ids: string[]) => void;
  onSelect?: (ids: string[]) => void;
}

export function SelectThemeCardProvider({
  children,
  themeCards,
  onDelete,
  onSelect,
}: SelectThemeCardProviderProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectionType, setSelectionType] = useState<SelectionType | null>(null);

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

  const selectAll = () => {
    const allIds = themeCards.map(card => card.id);
    setSelectedIds(new Set(allIds));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  const isSelected = (id: string) => selectedIds.has(id);

  const startSelectionMode = (type: SelectionType) => {
    setSelectionType(type);
    deselectAll();
  };

  const cancelSelectionMode = () => {
    setSelectionType(null);
    deselectAll();
  };

  const executeSelection = () => {
    const selectedIdsArray = Array.from(selectedIds);
    
    if (selectionType === 'delete' && onDelete) {
      onDelete(selectedIdsArray);
    } else if (selectionType === 'select' && onSelect) {
      onSelect(selectedIdsArray);
    }
    
    cancelSelectionMode();
  };

  const value = {
    selectedIds,
    selectionType,
    toggleSelection,
    selectAll,
    deselectAll,
    isSelected,
    startSelectionMode,
    cancelSelectionMode,
    executeSelection,
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
