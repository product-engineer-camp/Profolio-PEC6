type DeleteProfileResponse = {
  success: boolean;
  error?: string;
};

export async function deleteProfile(
  profileId: number,
): Promise<DeleteProfileResponse> {
  try {
    const response = await fetch(`/api/profiles/${profileId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "프로필 삭제에 실패했습니다.",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting profile:", error);
    return {
      success: false,
      error: "프로필 삭제 중 오류가 발생했습니다.",
    };
  }
}
