"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { User } from "lucide-react";

type ProfileAvatarProps = {
  profileUrl: string;
};

export function ProfileAvatar({ profileUrl }: ProfileAvatarProps) {
  return (
    <Avatar className="h-32 w-32">
      <AvatarImage src={profileUrl} alt="Profile" />
      <AvatarFallback>
        <User className="h-16 w-16" />
      </AvatarFallback>
    </Avatar>
  );
}
