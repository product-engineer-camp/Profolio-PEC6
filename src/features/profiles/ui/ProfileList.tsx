"use client";

import { ProfileThumbnailCard } from "@/features/profiles/ui/ProfileThumbnailCard";
import type { Profile } from "@/entities/profiles/model/type";
import type { SortOption } from "@/features/profiles/model/type";

type ProfileListProps = {
  profiles: Profile[];
  currentSort: SortOption;
};

export function ProfileList({ profiles, currentSort }: ProfileListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {profiles.map((profile) => (
        <ProfileThumbnailCard
          key={profile.id}
          title={profile.title}
          profileId={profile.id}
          profileUrl={profile.profileUrl}
          currentSort={currentSort}
          createdAt={profile.createdAt}
          updatedAt={profile.updatedAt}
          modifiedDate={profile.updatedAt}
          shareCount={profile.shareCount}
        />
      ))}
    </div>
  );
}
