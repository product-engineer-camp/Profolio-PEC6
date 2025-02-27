import { Profile } from "@/entities/profiles/model/type";
import { SortOption } from "./type";
import { sortBy } from "@/shared/lib/utils/sort";

export const sortProfiles = (
  profiles: Profile[],
  sortOption: SortOption,
): Profile[] => {
  switch (sortOption) {
    case "shares":
      return sortBy(
        profiles,
        (profile: Profile) => profile.shareCount ?? 0,
        "desc",
      );
    case "latest":
      return sortBy(
        profiles,
        (profile: Profile) => new Date(profile.createdAt).getTime(),
        "desc",
      );
    case "updated":
      return sortBy(
        profiles,
        (profile: Profile) => new Date(profile.updatedAt).getTime(),
        "desc",
      );
    default:
      return [...profiles];
  }
};
