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
import { getProfile } from "@/entities/profiles/api/getProfile";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/src/shared/ui/LoadingSpinner";

type ProfileDetailProps = {
  profileId: number;
  profileUrl: string;
};

export function ProfileDetail({ profileId, profileUrl }: ProfileDetailProps) {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(profileId);
        setProfile(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  const handleShareCount = async () => {
    try {
      await putShareCount(profileId);
    } catch (error) {
      console.error("공유 처리 중 오류 발생:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!profile) return <div>프로필을 찾을 수 없습니다.</div>;

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <ProfileTitle title={profile.title} />
        <ProfileDropdownMenu profileId={profileId} />
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
