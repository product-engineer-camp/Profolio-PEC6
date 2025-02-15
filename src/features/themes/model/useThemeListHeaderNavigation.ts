import { useRouter } from "next/navigation";

export const useThemeListHeaderNavigation = () => {
  const router = useRouter();

  const navigateToDelete = () => {
    router.push("/themes/delete");
  };

  const navigateToThemeList = () => {
    router.push("/themes");
  };

  const navigateToThemeCreate = () => {
    router.push("/themes/create");
  };
  const navigateBack = () => {
    router.back();
  };

  const refreshPage = () => {
    router.refresh();
  };

  return {
    navigateToDelete,
    navigateToThemeList,
    navigateToThemeCreate,
    navigateBack,
    refreshPage,
  };
};
