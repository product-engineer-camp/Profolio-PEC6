"use client";

import { ProfileThumbnailCard } from "@/entities/profiles/ui/ProfileThumbnailCard";
import type { Profile } from "@/entities/profiles/model/type";

type ProfileListProps = {
  profiles: Profile[];
};

export function ProfileList({ profiles }: ProfileListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {profiles.map((profile) => (
        <ProfileThumbnailCard
          key={profile.id}
          title={profile.title}
          modifiedDate={profile.updatedAt}
          profileId={profile.id}
          profileUrl={profile.profileUrl}
        />
      ))}
    </div>
  );
}
