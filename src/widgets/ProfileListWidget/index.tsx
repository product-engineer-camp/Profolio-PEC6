"use client";

import { ProfileList } from "@/features/profiles/ui/ProfileList";
import { ProfileSortingDropdownMenu } from "@/features/profiles/ui/ProfileSortingDropdownMenu";
import { SortOption } from "@/features/profiles/model/type";
import { useState, useEffect, useCallback } from "react";
import { getProfileList } from "@/features/profiles/api/getProfileList";
import { Profile } from "@/entities/profiles/model/type";
import { useInfiniteScroll } from "@/shared/lib/useInfiniteScroll";
import { LoadingSpinner } from "@/shared/ui/loading-spinner";

export function ProfileListWidget() {
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreProfiles = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newProfiles = await getProfileList(page, currentSort);

      if (newProfiles.length === 0) {
        setHasMore(false);
        return;
      }

      setProfiles((prev) => [...prev, ...newProfiles]);
      setPage((prev) => prev + 1);
      console.log("loadMore", page);
    } finally {
      setIsLoading(false);
    }
  }, [page, currentSort, isLoading, hasMore]);

  // 무한 스크롤 훅 사용
  const { containerRef } = useInfiniteScroll({
    onIntersect: loadMoreProfiles,
    threshold: 0.5,
  });

  // 정렬 옵션이 변경될 때 프로필 목록 초기화
  useEffect(() => {
    setProfiles([]);
    setPage(1);
    setHasMore(true);
    loadMoreProfiles();
  }, [currentSort]);

  const handleSort = (option: SortOption) => {
    setCurrentSort(option);
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
      <ProfileList profiles={profiles} currentSort={currentSort} />
      <div ref={containerRef} />
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
