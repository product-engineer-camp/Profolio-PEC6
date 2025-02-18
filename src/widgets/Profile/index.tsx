"use client";

import { Profile as ProfileType } from "@/entities/profiles/model/type";
import { ProfileDropdownMenu } from "@/features/profiles/ui/ProfileDropdownMenu";
import { ShareKakaoButton } from "@/entities/profiles/ui/ShareKakaoButton";
import { ShareURLButton } from "@/entities/profiles/ui/ShareURLButton";
import { ShareQRCodeButton } from "@/entities/profiles/ui/ShareQRCodeButton";
import { ProfileAvatar } from "@/entities/profiles/ui/ProfileAvatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";

type ProfileProps = {
  profile: ProfileType | null;
  profileId: string;
  currentUrl: string;
};

export function Profile({ profile, profileId, currentUrl }: ProfileProps) {
  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    // TODO: 삭제 API 구현
    console.log("삭제하기:", profileId);
  };

  const handleCopy = async () => {
    // TODO: 복사 API 구현
    console.log("복사하기:", profileId);
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">{profile.title}</h1>
        <ProfileDropdownMenu
          profileId={Number(profileId)}
          onDelete={handleDelete}
          onCopy={handleCopy}
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <ProfileAvatar profileUrl={profile.profileUrl} />
          <div
            className="prose w-full max-w-none"
            dangerouslySetInnerHTML={{ __html: profile.content }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <ShareKakaoButton profileUrl={currentUrl} />
        <ShareURLButton profileUrl={currentUrl} />
        <ShareQRCodeButton profileUrl={currentUrl} />
      </CardFooter>
    </Card>
  );
}
