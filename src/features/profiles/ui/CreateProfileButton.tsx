import { Button } from "@/shared/ui/button";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";

type CreateProfileButtonProps = {
  isUploading: boolean;
  isCreating: boolean;
  onSubmit: () => Promise<void>;
};

export const CreateProfileButton = ({
  isUploading,
  isCreating,
  onSubmit,
}: CreateProfileButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isUploading || isCreating}
          className="relative w-full text-lg font-semibold"
          size="lg"
        >
          {isUploading || isCreating ? (
            <>
              <LoadingSpinner className="mr-2" />
              처리중...
            </>
          ) : (
            "프로필 생성하기"
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>프로필 생성 확인</AlertDialogTitle>
          <AlertDialogDescription>
            입력하신 정보로 프로필을 생성하시겠습니까?
            <br />
            생성된 프로필은 나중에 수정할 수 있습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>생성하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
