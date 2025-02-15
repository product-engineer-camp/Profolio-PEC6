"use client";

import { ProfileThumbnailCard } from "@/entities/profiles/ui/ProfileThumbnailCard";
import type { ProfileList } from "@/features/profiles/model/type";
type Profile = {
  id: string;
  title: string;
  modifiedDate: string;
};

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
          modifiedDate={profile.modifiedDate}
          profileId={profile.id}
        />
      ))}
    </div>
  );
}
