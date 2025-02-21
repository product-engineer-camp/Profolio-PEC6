"use server";

import { createClient } from "@/shared/utils/supabase/server";
import { User } from "@/entities/user/model/user.interface";

export const login = async ({ email, password }: User) => {
  const supabase = await createClient();

  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    return { message: `${loginError.message}` };
  }

  return {
    message: "SUCCESS",
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
    user: data.user,
  };
};
