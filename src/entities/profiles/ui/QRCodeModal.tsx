import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

type QRCodeModalProps = {
  profileURL: string;
  isOpen: boolean;
  onClose: () => void;
};

export function QRCodeModal({ profileURL, isOpen, onClose }: QRCodeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mobile:w-80 rounded-xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로필 공유</DialogTitle>
          <DialogDescription>
            QR 코드를 프로필 공유를 원하는 사람에게 보여주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-lg bg-white">
            <QRCodeSVG
              value={profileURL}
              size={200}
              level="H"
              marginSize={2}
              className="h-full w-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
