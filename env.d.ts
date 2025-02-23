// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_KAKAO_INTEGRITY_VALUE: string;
    NEXT_PUBLIC_KAKAO_VERSION: string;
    NEXT_PUBLIC_KAKAO_APP_KEY: string;
    NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID: string;
  }
}
