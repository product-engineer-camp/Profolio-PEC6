"use client";

import Script from "next/script";

export function KakaoScript() {
  const onLoad = () => {
    if (!window.Kakao?.isInitialized()) {
      window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
    }
  };

  const onError = (error: Error) => {
    console.error("카카오 스크립트 로드 실패:", error);
  };

  return (
    <Script
      src={`https://t1.kakaocdn.net/kakao_js_sdk/${process.env.NEXT_PUBLIC_KAKAO_VERSION}/kakao.min.js`}
      integrity={process.env.NEXT_PUBLIC_KAKAO_INTEGRITY_VALUE}
      crossOrigin="anonymous"
      onLoad={onLoad}
      onError={onError}
    />
  );
}
// window.Kakao 타입 정의
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: any) => void;
      };
    };
  }
}
