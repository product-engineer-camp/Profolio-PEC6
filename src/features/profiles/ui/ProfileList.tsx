"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import type { Profile } from "@/entities/profiles/model/type";
import type { SortOption } from "@/features/profiles/model/type";
import { ProfileTitle } from "@/entities/profiles/ui/ProfileTitle";
import { ShareKakaoButton } from "@/features/profiles/ui/ShareKakaoButton";
import { ShareURLButton } from "@/features/profiles/ui/ShareURLButton";
import { ShareQRCodeButton } from "@/features/profiles/ui/ShareQRCodeButton";

type ProfileListProps = {
  profiles: Profile[];
  currentSort: SortOption;
};

export function ProfileList({ profiles, currentSort }: ProfileListProps) {
  if (!profiles || !Array.isArray(profiles)) {
    return <div>프로필을 불러올 수 없습니다.</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {profiles.map((profile) => {
        const profileUrl = `${process.env.NEXT_PUBLIC_URL}/profiles/${profile.id}`;

        return (
          <Card
            key={profile.id}
            className="w-full min-w-[125px] transition-shadow hover:shadow-lg"
          >
            <CardHeader className="pb-1 pt-3">
              <CardTitle className="text-left font-medium">
                <ProfileTitle title={profile.title} />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-end py-1">
              {currentSort === "shares" && (
                <span className="text-sm text-muted-foreground">
                  {profile.shares ?? 0}회 공유
                </span>
              )}
              {currentSort === "latest" && (
                <span className="text-sm text-muted-foreground">
                  {new Date(profile.createdAt).toLocaleDateString("ko-KR")}
                </span>
              )}
              {currentSort === "updated" && (
                <span className="text-sm text-muted-foreground">
                  {new Date(profile.updatedAt).toLocaleDateString("ko-KR")}
                </span>
              )}
            </CardContent>
            <CardFooter className="flex gap-2 pb-3 pt-1">
              <div className="grid w-full grid-cols-3 gap-2">
                <ShareKakaoButton profileUrl={profileUrl} />
                <ShareURLButton profileUrl={profileUrl} />
                <ShareQRCodeButton profileUrl={profileUrl} />
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
