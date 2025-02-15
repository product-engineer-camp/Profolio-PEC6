/**
 * 테마 삭제 api
 *
 * NOTE : 테마 여러개 삭제도 필요한가..?
 */

export const deleteTheme = async (themeId: string) => {
  const response = await fetch(`/api/themes/${themeId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete theme");
  }

  return response.json();
};
