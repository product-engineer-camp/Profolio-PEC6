"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown";
import { MoreHorizontal, Pencil, Trash, Copy } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ProfileDeleteConfirmDialog } from "./ProfileDeleteConfirmDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProfile } from "../api/deleteProfile";

type ProfileDropdownMenuProps = {
  profileId: number;
};

export function ProfileDropdownMenu({ profileId }: ProfileDropdownMenuProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const { success, error } = await deleteProfile(profileId);

    if (success) {
      router.push("/profiles");
      router.refresh();
    } else {
      toast.error("프로필 삭제 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const handleCopy = async () => {
    try {
      const response = await fetch(`/api/profiles/${profileId}/copy`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("프로필 복사에 실패했습니다.");
      }

      toast.success("프로필이 복사되었습니다.");
      router.refresh();
    } catch (error) {
      toast.error("프로필 복사 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const handleEdit = () => {
    router.push(`/profiles/${profileId}/edit`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            삭제하기
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            수정하기
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            복사하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileDeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}
