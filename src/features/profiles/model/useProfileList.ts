import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileList } from "../api/getProfileList";
import type { Profile } from "@/entities/profiles/model/type";
import { useState, useEffect } from "react";

export function useProfileList() {
  const queryClient = useQueryClient();
  const { data: profiles = [] } = useQuery<Profile[]>({
    queryKey: ["profiles"],
    queryFn: getProfileList,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const data = await getProfileList();
        queryClient.setQueryData<Profile[]>(
          ["profiles"],
          (oldData) =>
            oldData?.map((profile) =>
              profile.id === data[0].id
                ? { ...profile, shareCount: (profile.shareCount ?? 0) + 1 }
                : profile,
            ) ?? [],
        );
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [queryClient]);

  const updateShareCount = (profileId: number) => {
    queryClient.setQueryData<Profile[]>(
      ["profiles"],
      (oldData) =>
        oldData?.map((profile) =>
          profile.id === profileId
            ? { ...profile, shareCount: (profile.shareCount ?? 0) + 1 }
            : profile,
        ) ?? [],
    );
  };

  return {
    profiles,
    updateShareCount,
    isLoading,
  };
}
