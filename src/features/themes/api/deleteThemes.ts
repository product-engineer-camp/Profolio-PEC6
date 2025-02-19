/**
 * 테마 삭제 api
 */

export const deleteThemes = async (themeIds: number[]) => {
  const response = await fetch(`/api/themes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ themeIds }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete themes");
  }

  return response.json();
};
