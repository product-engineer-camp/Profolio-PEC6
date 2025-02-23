import { ApiResponse } from "@/shared/api/type";
import { createClient } from "@/shared/utils/supabase/client";

export type UploadProfileImageResponse = ApiResponse<{
  url: string;
}>;

export const uploadProfileImage = async (
  file?: File,
  profileId?: string,
): Promise<UploadProfileImageResponse> => {
  try {
    // 파일이 없는 경우 빈 URL 반환
    if (!file) {
      return {
        success: true,
        data: { url: "" },
        error: undefined,
      };
    }

    const supabase = createClient();

    const timestamp = new Date().getTime();
    const fileExt = file.name.split(".").pop();
    const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Storage에 업로드
    const { data, error } = await supabase.storage
      .from("profile_images")
      .upload(`images/${fileName}`, file);

    if (error) {
      throw new Error(error.message);
    }

    // 업로드된 파일의 public URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("profile_images")
      .getPublicUrl(`images/${fileName}`);

    // profileId가 있는 경우에만 profile 테이블 업데이트
    if (profileId) {
      const { error: updateError } = await supabase
        .from("profile")
        .update({ image_url: publicUrl })
        .eq("id", profileId);

      if (updateError) {
        throw new Error(updateError.message);
      }
    }

    return {
      success: true,
      data: { url: publicUrl },
      error: undefined,
    };
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    return {
      success: false,
      data: { url: "" },
      error:
        error instanceof Error
          ? error.message
          : "이미지 업로드에 실패했습니다.",
    };
  }
};
