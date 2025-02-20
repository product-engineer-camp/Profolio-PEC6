import { login } from "@/features/login/api/login";
import { AuthFormState } from "@/features/auth/model/auth.interface";
import { useActionState } from "react";
import { MAIN_PATHNAME } from "@/shared/config/pathname";
import { redirect } from "next/navigation";
import { createClient } from "@/shared/utils/supabase/client"; // 클라이언트 Supabase 인스턴스 가져오기

export const useLoginActionState = () => {
  const loginWithFormData = async (
    prevState: AuthFormState,
    formData: FormData,
  ) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await login({ email, password });

    if (res.message !== "SUCCESS") {
      return res;
    }

    // 🔹 Supabase 클라이언트 인스턴스 생성
    const supabase = createClient();

    // 🔹 로그인 성공 시, 클라이언트에서 세션 설정
    if (res.access_token && res.refresh_token) {
      await supabase.auth.setSession({
        access_token: res.access_token,
        refresh_token: res.refresh_token,
      });
    }

    redirect(MAIN_PATHNAME);
  };

  const [loginFormState, loginFormAction] = useActionState<
    AuthFormState,
    FormData
  >(loginWithFormData, null);

  return { loginFormState, loginFormAction };
};
