import { Profile } from "../model/type";

export async function getProfile(id: number): Promise<Profile | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/profiles/${id}`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    return data.profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
