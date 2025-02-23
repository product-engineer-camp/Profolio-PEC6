"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useThemeDetail } from "@/entities/themes/model/useThemeDetail";
import { useUploadProfileImage } from "../model/useUploadProfileImage";
import { useCreateProfile } from "../model/useCreateProfile";
import { createClient } from "@/shared/utils/supabase/client";
import { Button } from "@/shared/ui/button";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { Card } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { toast } from "sonner";
import { ProfileInputType } from "@/src/widgets/profile/model/type";

type ProfilePreviewStepProps = {
  profileInput: ProfileInputType;
};

export const ProfilePreviewStep = ({
  profileInput,
}: ProfilePreviewStepProps) => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [title, setTitle] = useState("");

  const { mutate: uploadImage, isPending: isUploading } =
    useUploadProfileImage();
  const { mutate: createProfile, isPending: isCreating } = useCreateProfile();
  const { data: theme, isLoading: isLoadingTheme } = useThemeDetail(
    Number(profileInput.themeId),
  );

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user && !error);
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleSubmit = async () => {
    try {
      // 이미지 업로드 (선택적)
      uploadImage(
        { file: imageFile || undefined },
        {
          onSuccess: (uploadResponse) => {
            if (uploadResponse.success) {
              // 이미지 업로드 성공 후 프로필 생성
              const payload = {
                title: title.trim(),
                ...transformBasicAnswersToPayload(profileInput.basicAnswers),
                theme_id: Number(profileInput.themeId),
                personalized_questions: transformAIAnswersToQuestions(
                  profileInput.aiAnswers,
                ),
                avatar_url: uploadResponse.data.url,
              };

              createProfile(payload, {
                onSuccess: (response) => {
                  if (response.success) {
                    router.push("/profiles");
                  }
                },
                onError: (error) => {
                  toast.error("프로필 생성에 실패했습니다.");
                },
              });
            }
          },
          onError: (error) => {
            toast.error("이미지 업로드에 실패했습니다.");
          },
        },
      );
    } catch (error) {
      toast.error("프로필 생성 중 오류가 발생했습니다.");
    }
  };

  if (isCheckingAuth || isLoadingTheme) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <h2 className="text-2xl font-bold">로그인이 필요합니다</h2>
        <p className="text-center text-muted-foreground">
          프로필을 생성하기 위해서는 로그인이 필요합니다.
          <br />
          로그인 후 다시 시도해주세요.
        </p>
        <Button onClick={handleLogin}>로그인하기</Button>
      </div>
    );
  }

  if (!theme) {
    return <ErrorMessage message="테마를 불러오는데 실패했습니다." />;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">프로필 미리보기</h2>
        <p className="text-muted-foreground">
          프로필 이미지를 업로드하고 입력한 정보를 확인해주세요.
        </p>
      </div>

      <Card
        className="space-y-6 p-6"
        style={{
          background: theme.colors[0],
          backgroundImage: theme.pattern,
        }}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">프로필 제목</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="프로필 제목을 입력해주세요"
              className="mt-2"
            />
          </div>

          <div className="flex justify-center">
            <div className="relative h-32 w-32">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  <span className="text-4xl">👤</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="image">프로필 이미지</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">기본 정보</h3>
          {profileInput.basicAnswers.map((qa) => (
            <div key={qa.order}>
              <Label>{qa.question}</Label>
              <p className="mt-1 text-muted-foreground">{qa.answer}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">개인화된 질문</h3>
          {profileInput.aiAnswers.map((qa) => (
            <div key={qa.order}>
              <Label>{qa.question}</Label>
              <p className="mt-1 text-muted-foreground">{qa.answer}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isUploading || isCreating}>
          {isUploading || isCreating ? (
            <>
              <LoadingSpinner className="mr-2" />
              처리중...
            </>
          ) : (
            "프로필 생성하기"
          )}
        </Button>
      </div>
    </div>
  );
};

type ProfileQuestionAnswer = Array<{
  question: string;
  answer: string | number;
  category?: string;
  order: number;
}>;

const transformBasicAnswersToPayload = (
  basicAnswers: ProfileQuestionAnswer,
) => {
  const answerMap = basicAnswers.reduce(
    (acc, { question, answer, category }) => {
      if (category) {
        acc[category] = String(answer);
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return {
    display_name: answerMap.displayName?.trim() || "",
    age: Number(answerMap.age) || 0,
    occupation: answerMap.occupation?.trim() || "",
    hobby: answerMap.hobby?.trim() || "",
    interest: answerMap.interest?.trim() || "",
    core_value: answerMap.coreValue?.trim() || "",
    strength: answerMap.strength?.trim() || "",
    role_model: answerMap.roleModel?.trim() || "",
    personality: answerMap.personality?.trim() || "",
    relationship_status: answerMap.relationshipStatus?.trim() || "",
  };
};

const transformAIAnswersToQuestions = (aiAnswers: ProfileQuestionAnswer) => {
  return aiAnswers.map(({ question, answer }) => ({
    question: question.trim(),
    answer: String(answer).trim(),
  }));
};
