"use client";

import { ProfileList } from "@/features/profiles/ui/ProfileList";
import { ProfileSortingDropdownMenu } from "@/features/profiles/ui/ProfileSortingDropdownMenu";
import { SortOption } from "@/features/profiles/model/type";
import { Profile } from "@/entities/profiles/model/type";
import { useState } from "react";
import { sortProfiles } from "@/features/profiles/model/sort";

type ProfileListWidgetProps = {
  initialProfiles: Profile[];
};

export function ProfileListWidget({ initialProfiles }: ProfileListWidgetProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const [profiles] = useState<Profile[]>(initialProfiles);

  const handleSort = (option: SortOption) => {
    setCurrentSort(option);
  };

  const sortedProfiles = sortProfiles(profiles, currentSort);

  return (
    <div>
      <div className="flex justify-end">
        <ProfileSortingDropdownMenu
          currentSort={currentSort}
          onSort={handleSort}
        />
      </div>
      <ProfileList profiles={sortedProfiles} currentSort={currentSort} />
    </div>
  );
}
