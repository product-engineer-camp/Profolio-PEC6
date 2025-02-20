import { DefaultThemeListActionDropdown } from "./DefaultThemeListActionDropdown";

export const DefaultThemeListActionHeader = () => {
  return (
    <header className="flex w-full items-center justify-between border-b p-4">
      <h1 className="text-xl font-bold text-black">테마</h1>
      <DefaultThemeListActionDropdown />
    </header>
  );
};
