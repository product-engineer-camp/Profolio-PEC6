"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Share2, Link, QrCode } from "lucide-react";
import { ShareKakaoButton } from "./ShareKakaoButton";
import { ShareURLButton } from "./ShareURLButton";
import { ShareQRCodeButton } from "./ShareQRCodeButton";

type ProfileThumbnailCardProps = {
  title: string;
  modifiedDate: string;
  profileId: string;
};

export function ProfileThumbnailCard({
  title,
  modifiedDate,
  profileId,
}: ProfileThumbnailCardProps) {
  return (
    <Card className="w-fullmin-w-[125px] transition-shadow hover:shadow-lg">
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-left text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end py-1">
        <p className="text-sm text-gray-500">{modifiedDate}</p>
      </CardContent>
      <CardFooter className="flex gap-2 pb-3 pt-1">
        <div className="grid w-full grid-cols-3 gap-2">
          <ShareKakaoButton
            profileUrl={`${window.location.origin}/profiles/${profileId}`}
          />
          <ShareURLButton
            profileUrl={`${window.location.origin}/profiles/${profileId}`}
          />
          <ShareQRCodeButton
            profileUrl={`${window.location.origin}/profiles/${profileId}`}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
