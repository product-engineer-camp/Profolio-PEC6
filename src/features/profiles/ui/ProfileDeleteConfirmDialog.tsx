"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

type ProfileDeleteConfirmDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
};

export function ProfileDeleteConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
}: ProfileDeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 삭제</DialogTitle>
          <DialogDescription>
            정말로 이 프로필을 삭제하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            아니오
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            예
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
