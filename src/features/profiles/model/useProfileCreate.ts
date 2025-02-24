import { useRouter } from "next/navigation";
import { useUploadProfileImage } from "./useUploadProfileImage";
import { useCreateProfile } from "./useCreateProfile";
import { toast } from "sonner";
import { type ProfileInputType } from "./type";
import {
  transformAIAnswersToQuestions,
  transformBasicAnswersToPayload,
} from "./formatProfileInput";

type UseProfileCreateProps = {
  profileInput: ProfileInputType;
  title: string;
  imageFile: File | null;
};

type UseProfileCreateReturn = {
  handleSubmit: () => Promise<void>;
  isUploading: boolean;
  isCreating: boolean;
};

export const useProfileCreate = ({
  profileInput,
  title,
  imageFile,
}: UseProfileCreateProps): UseProfileCreateReturn => {
  const router = useRouter();
  const { mutate: uploadImage, isPending: isUploading } =
    useUploadProfileImage();
  const { mutate: createProfile, isPending: isCreating } = useCreateProfile();

  const handleSubmit = async () => {
    try {
      uploadImage(
        { file: imageFile || undefined },
        {
          onSuccess: (uploadResponse) => {
            if (uploadResponse.success) {
              const payload = {
                title: title.trim(),
                ...transformBasicAnswersToPayload(profileInput.basicAnswers),
                themeId: Number(profileInput.themeId),
                personalizedQuestions: transformAIAnswersToQuestions(
                  profileInput.aiAnswers,
                ),
                avatarUrl: uploadResponse.data.url,
              };

              createProfile(payload, {
                onSuccess: (response) => {
                  if (response.success) {
                    router.push("/profiles");
                  }
                },
                onError: () => {
                  toast.error("프로필 생성에 실패했습니다.");
                },
              });
            }
          },
          onError: () => {
            toast.error("이미지 업로드에 실패했습니다.");
          },
        },
      );
    } catch (error) {
      toast.error("프로필 생성 중 오류가 발생했습니다.");
    }
  };

  return {
    handleSubmit,
    isUploading,
    isCreating,
  };
};
