"use client";

import { ProfileList } from "@/features/profiles/ui/ProfileList";
import { ProfileSortingDropdownMenu } from "@/features/profiles/ui/ProfileSortingDropdownMenu";
import { SortOption } from "@/features/profiles/model/type";
import { useState } from "react";
import { sortProfiles } from "@/features/profiles/model/sort";
import { useProfileList } from "@/features/profiles/model/useProfileList";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

export function ProfileListWidget() {
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const { profiles, updateShareCount, isLoading, error } = useProfileList();

  const handleSort = (option: SortOption) => {
    setCurrentSort(option);
  };

  const sortedProfiles = sortProfiles(profiles, currentSort);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="mb-2 text-lg text-red-500">
          프로필을 불러오는 중 오류가 발생했습니다
        </p>
        <p className="text-gray-400">잠시 후 다시 시도해주세요</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="mb-2 text-lg text-gray-500">
          아직 등록된 프로필이 없습니다
        </p>
        <p className="text-gray-400">새로운 프로필을 등록해보세요!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end">
        <ProfileSortingDropdownMenu
          currentSort={currentSort}
          onSort={handleSort}
        />
      </div>
      <ProfileList
        profiles={sortedProfiles}
        currentSort={currentSort}
        onUpdateShareCount={updateShareCount}
      />
    </div>
  );
}
