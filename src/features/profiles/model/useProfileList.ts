import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileList } from "../api/getProfileList";
import type { Profile } from "@/entities/profiles/model/type";

type ProfileListQueryKey = readonly ["profiles"];
type ProfileListQueryFnData = Profile[];

export function useProfileList() {
  const queryClient = useQueryClient();

  const {
    data: profiles = [],
    isLoading,
    error,
  } = useQuery<
    ProfileListQueryFnData,
    Error,
    ProfileListQueryFnData,
    ProfileListQueryKey
  >({
    queryKey: ["profiles"] as const,
    queryFn: getProfileList,
  });

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
    error,
  };
}
