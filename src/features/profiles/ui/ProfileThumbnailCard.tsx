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

type ProfileThumbnailCardProps = {
  title: string;
  modifiedDate: string;
  profileId: number;
  profileUrl: string;
};

export function ProfileThumbnailCard({
  title,
  modifiedDate,
  profileId,
  profileUrl,
}: ProfileThumbnailCardProps) {
  return (
    <Card className="w-fullmin-w-[125px] transition-shadow hover:shadow-lg">
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-left font-medium">
          <ProfileTitle title={title} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end py-1">
        <p className="text-sm text-gray-500">{modifiedDate}</p>
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
