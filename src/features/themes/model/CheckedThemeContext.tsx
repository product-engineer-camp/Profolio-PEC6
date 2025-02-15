import { createContext, useContext, useState, ReactNode } from "react";

type CheckedThemesContextType = {
  checkedThemeIds: string[];
  toggleThemeSelection: (themeId: number) => void;
  clearCheckedThemes: () => void;
  hasCheckedThemes: boolean;
};

const CheckedThemesContext = createContext<
  CheckedThemesContextType | undefined
>(undefined);

export const CheckedThemesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [checkedThemeIds, setCheckedThemeIds] = useState<string[]>([]);

  const toggleThemeSelection = (themeId: number) => {
    setCheckedThemeIds((prev) => {
      const id = String(themeId);
      if (prev.includes(id)) {
        return prev.filter((checkedId) => checkedId !== id);
      }
      return [...prev, id];
    });
  };

  const clearCheckedThemes = () => {
    setCheckedThemeIds([]);
  };

  return (
    <CheckedThemesContext.Provider
      value={{
        checkedThemeIds,
        toggleThemeSelection,
        clearCheckedThemes,
        hasCheckedThemes: checkedThemeIds.length > 0,
      }}
    >
      {children}
    </CheckedThemesContext.Provider>
  );
};

export const useCheckedThemes = () => {
  const context = useContext(CheckedThemesContext);
  if (context === undefined) {
    throw new Error(
      "useCheckedThemes must be used within a CheckedThemesProvider",
    );
  }
  return context;
};
