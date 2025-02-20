"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown";
import { MoreHorizontal, Pencil, Trash, Copy } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useState } from "react";

type ProfileDropdownMenuProps = {
  onDelete: () => Promise<void>;
  onCopy: () => Promise<void>;
  profileId: number;
};

export function ProfileDropdownMenu({
  onDelete,
  onCopy,
  profileId,
}: ProfileDropdownMenuProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = () => {
    // TODO: 수정 페이지로 이동 구현
    console.log("수정하기:", profileId);
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
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            복사하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>프로필 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 프로필을 삭제하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              아니오
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              예
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
