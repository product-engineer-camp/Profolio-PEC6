import { DefaultThemeListActionDropdown } from "@/features/themes/ui/DefaultThemeListActionDropdown";
import { DeleteThemeListActionHeader } from "@/features/themes/ui/DeleteThemeListActionHeader";

type ThemeListHeaderProps = {
  variant: "default" | "delete";
};

export const ThemeListHeader = ({ variant }: ThemeListHeaderProps) => {
  return (
    <header className="flex w-full items-center justify-between border-b p-4">
      {variant === "default" && (
        <>
          <h1 className="text-xl font-bold text-black">테마</h1>
          <DefaultThemeListActionDropdown />
        </>
      )}
      {variant === "delete" && <DeleteThemeListActionHeader />}
    </header>
  );
};
