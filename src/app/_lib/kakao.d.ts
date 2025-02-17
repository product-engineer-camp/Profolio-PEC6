interface KakaoShare {
  sendCustom: (options: {
    templateId: number;
    templateArgs?: {
      [key: string]: string;
    };
  }) => void;
}

interface KakaoStatic {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: KakaoShare;
}

interface Window {
  Kakao: KakaoStatic;
}
