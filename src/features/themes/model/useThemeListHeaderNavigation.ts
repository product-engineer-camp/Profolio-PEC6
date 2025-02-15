import { useRouter } from "next/navigation";

export const useThemeListHeaderNavigation = () => {
  const router = useRouter();

  const navigateToDelete = () => {
    router.push("/themes/delete");
  };

  const navigateToThemeList = () => {
    router.push("/themes");
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
    navigateBack,
    refreshPage,
  };
};
