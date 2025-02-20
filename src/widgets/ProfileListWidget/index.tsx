"use client";

import { ProfileList } from "@/features/profiles/ui/ProfileList";
import { ProfileSortingDropdownMenu } from "@/features/profiles/ui/ProfileSortingDropdownMenu";
import { SortOption } from "@/features/profiles/model/type";
import { Profile } from "@/entities/profiles/model/type";
import { useState } from "react";
import { getProfileList } from "@/features/profiles/api/getProfileList";

type ProfileListWidgetProps = {
  initialProfiles: Profile[];
};

export function ProfileListWidget({ initialProfiles }: ProfileListWidgetProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [isLoading, setIsLoading] = useState(false);

  const handleSort = async (option: SortOption) => {
    try {
      setIsLoading(true);
      setCurrentSort(option);

      const response = await getProfileList(option);
      setProfiles(response);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
      // 에러 처리를 위한 상태 관리가 필요하다면 추가해주세요
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <ProfileSortingDropdownMenu
          currentSort={currentSort}
          onSort={handleSort}
          disabled={isLoading}
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      ) : (
        <ProfileList profiles={profiles} currentSort={currentSort} />
      )}
    </div>
  );
}
