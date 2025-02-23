import { Profile } from "@/entities/profiles/model/type";
import { SortOption } from "./type";

export const sortProfiles = (
  profiles: Profile[],
  sortOption: SortOption,
): Profile[] => {
  const sortedProfiles = [...profiles];

  switch (sortOption) {
    case "shares":
      return sortedProfiles.sort(
        (a, b) => (b.shareCount ?? 0) - (a.shareCount ?? 0),
      );
    case "latest":
      return sortedProfiles.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "updated":
      return sortedProfiles.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    default:
      return sortedProfiles;
  }
};
