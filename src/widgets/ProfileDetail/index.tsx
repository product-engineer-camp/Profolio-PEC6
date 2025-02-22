"use client";

import { Profile as ProfileType } from "@/entities/profiles/model/type";
import { ProfileDropdownMenu } from "@/features/profiles/ui/ProfileDropdownMenu";
import { ShareKakaoButton } from "@/src/features/profiles/ui/ShareKakaoButton";
import { ShareURLButton } from "@/src/features/profiles/ui/ShareURLButton";
import { ShareQRCodeButton } from "@/src/features/profiles/ui/ShareQRCodeButton";
import { ProfileAvatar } from "@/entities/profiles/ui/ProfileAvatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { putShareCount } from "@/features/profiles/api/putShareCount";
import { ProfileTitle } from "@/entities/profiles/ui/ProfileTitle";

type ProfileDetailProps = {
  profile: ProfileType;
  profileUrl: string;
};

export function ProfileDetail({ profile, profileUrl }: ProfileDetailProps) {
  const handleShareCount = async () => {
    try {
      await putShareCount(profile.id);
    } catch (error) {
      console.error("공유 처리 중 오류 발생:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <ProfileTitle title={profile.title} />
        <ProfileDropdownMenu profileId={profile.id} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <p>프로필의 컨텐츠가 들어갑니다. </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <ShareKakaoButton profileUrl={profileUrl} onClick={handleShareCount} />
        <ShareURLButton profileUrl={profileUrl} onClick={handleShareCount} />
        <ShareQRCodeButton profileUrl={profileUrl} onClick={handleShareCount} />
      </CardFooter>
    </Card>
  );
}
