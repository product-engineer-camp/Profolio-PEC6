import { DefaultThemeListActionDropdown } from "@/features/themes/ui/DefaultThemeListActionDropdown";
import { DeleteThemeListActionHeader } from "@/features/themes/ui/DeleteThemeListActionHeader";
import { match } from "ts-pattern";

type ThemeListHeaderProps = {
  variant: "default" | "delete";
};

export const ThemeListHeader = ({ variant }: ThemeListHeaderProps) => {
  return (
    <header className="flex w-full items-center justify-between border-b p-4">
      {match(variant)
        .with("default", () => (
          <>
            <h1 className="text-xl font-bold text-black">테마</h1>
            <DefaultThemeListActionDropdown />
          </>
        ))
        .with("delete", () => <DeleteThemeListActionHeader />)
        .exhaustive()}
    </header>
  );
};
