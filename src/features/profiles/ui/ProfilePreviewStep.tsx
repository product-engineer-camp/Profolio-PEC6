"use client";

import { useRouter } from "next/navigation";
import { useThemeDetail } from "@/entities/themes/model/useThemeDetail";
import { useAuth } from "@/shared/model/auth/useAuth";
import { Button } from "@/shared/ui/button";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { Card } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { type ProfileInputType } from "../model/type";
import { QuestionList } from "@/entities/profiles/ui/QuestionList";
import { ProfileImageUploader } from "./ProfileImageUploader";
import { useProfilePreview } from "../model/useProfilePreview";
import { useProfileCreate } from "../model/useProfileCreate";
import { adjustColor } from "@/entities/themes/lib/adjustColor";

type ProfilePreviewStepProps = {
  profileInput: ProfileInputType;
};

export const ProfilePreviewStep = ({
  profileInput,
}: ProfilePreviewStepProps) => {
  const router = useRouter();
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const { data: theme, isLoading: isLoadingTheme } = useThemeDetail(
    Number(profileInput.themeId),
  );

  const {
    title,
    imageFile,
    imagePreview,
    handleTitleChange,
    handleImageChange,
  } = useProfilePreview();

  const { handleSubmit, isUploading, isCreating } = useProfileCreate({
    profileInput,
    title,
    imageFile,
  });

  const handleLogin = () => {
    router.push("/auth/login");
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

      <div>
        <Label htmlFor="title">프로필 제목</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="프로필 제목을 입력해주세요"
          className="mt-2"
        />
      </div>

      <Card
        className="relative space-y-6 overflow-hidden p-6"
        style={{
          backgroundColor: "transparent",
        }}
      >
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-1">
          {theme.colors.map((color, index) => (
            <div
              key={`${color}-${index}`}
              className="h-full w-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div
          className={`absolute inset-0 h-full w-full bg-repeat opacity-50 ${theme.pattern}`}
          style={{ color: adjustColor(theme.colors[0], -30) }}
        />

        <div className="relative z-10">
          <ProfileImageUploader
            onImageChange={handleImageChange}
            imagePreview={imagePreview}
          />
        </div>

        <div className="relative z-10 rounded-lg bg-white/80 p-4">
          <QuestionList
            questions={profileInput.basicAnswers}
            title="기본 정보"
          />
        </div>

        <div className="relative z-10 rounded-lg bg-white/80 p-4">
          <QuestionList
            questions={profileInput.aiAnswers}
            title="개인화된 질문"
          />
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
