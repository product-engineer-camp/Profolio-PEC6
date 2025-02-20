"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ShareKakaoButton } from "./ShareKakaoButton";
import { ShareURLButton } from "./ShareURLButton";
import { ShareQRCodeButton } from "./ShareQRCodeButton";
import { ProfileTitle } from "@/entities/profiles/ui/ProfileTitle";
import type { SortOption } from "../model/type";

type ProfileThumbnailCardProps = {
  title: string;
  modifiedDate: string;
  profileId: number;
  profileUrl: string;
  currentSort: SortOption;
  createdAt: string;
  updatedAt: string;
  shareCount: number;
};

export function ProfileThumbnailCard({
  title,
  profileUrl,
  currentSort,
  createdAt,
  updatedAt,
  shareCount,
}: ProfileThumbnailCardProps) {
  const getMetaInfo = () => {
    switch (currentSort) {
      case "latest":
        return <p className="text-sm text-gray-500">작성일: {createdAt}</p>;
      case "updated":
        return <p className="text-sm text-gray-500">수정일: {updatedAt}</p>;
      case "shares":
        return (
          <p className="text-sm text-gray-500">{shareCount ?? 0}회 공유</p>
        );
      default:
        return <p className="text-sm text-gray-500">작성일: {createdAt}</p>;
    }
  };

  return (
    <Card className="w-fullmin-w-[125px] transition-shadow hover:shadow-lg">
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-left font-medium">
          <ProfileTitle title={title} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end py-1">
        {getMetaInfo()}
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
}
