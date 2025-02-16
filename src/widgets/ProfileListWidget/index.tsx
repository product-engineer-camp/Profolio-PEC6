"use client";

import { ProfileList } from "@/features/profiles/ui/ProfileList";
import { ProfileSortingDropdownMenu } from "@/features/profiles/ui/ProfileSortingDropdownMenu";
import { SortOption } from "@/features/profiles/model/type";
import { useState } from "react";
import type { Profile } from "@/entities/profiles/model/type";
import { toast } from "sonner";

// 가짜 데이터 추가
const MOCK_PROFILES: Profile[] = [
  {
    id: 1,
    title: "프론트엔드 개발자",
    content: "프론트엔드 개발자입니다.",
    theme: "light",
    profileUrl: "https://example.com/profile1",
    createdAt: "2024-03-20T00:00:00.000Z",
    updatedAt: "2024-03-20T00:00:00.000Z",
  },
  {
    id: 2,
    title: "백엔드 개발자",
    content: "백엔드 개발자입니다.",
    theme: "dark",
    profileUrl: "https://example.com/profile2",
    createdAt: "2024-03-20T00:00:00.000Z",
    updatedAt: "2024-03-20T00:00:00.000Z",
  },
  {
    id: 3,
    title: "풀스택 개발자",
    content: "풀스택 개발자입니다.",
    theme: "light",
    profileUrl: "https://example.com/profile3",
    createdAt: "2024-03-20T00:00:00.000Z",
    updatedAt: "2024-03-20T00:00:00.000Z",
  },
];

export function ProfileListWidget() {
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [isLoading, setIsLoading] = useState(false);

  const handleSort = async (option: SortOption) => {
    try {
      setIsLoading(true);
      setCurrentSort(option);

      // 가짜 데이터 정렬 로직
      const sortedProfiles = [...MOCK_PROFILES].sort((a, b) => {
        if (option === "latest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else if (option === "shares") {
          return -1;
        }
        return 0;
      });

      // 로딩 효과를 위한 인위적인 지연
      await new Promise((resolve) => setTimeout(resolve, 500));

      setProfiles(sortedProfiles);
    } catch (error) {
      toast.error("프로필 목록을 불러오는데 실패했습니다.");
      console.error(error);
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
      <ProfileList profiles={profiles} />
    </div>
  );
}
