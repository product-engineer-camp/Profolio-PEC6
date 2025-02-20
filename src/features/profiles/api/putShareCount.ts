export async function putShareCount(profileId: string): Promise<void> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/profiles/share/${profileId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update share count");
    }
  } catch (error) {
    console.error("Error updating share count:", error);
    throw error;
  }
}
