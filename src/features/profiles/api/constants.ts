export const PROFILE_API_MESSAGES = {
  // GET 관련
  GET_FAILED: "프로필 정보를 불러오는데 실패했습니다.",
  GET_LIST_FAILED: "프로필 목록을 불러오는데 실패했습니다.",
  INVALID_RESPONSE: "잘못된 응답 형식입니다.",

  // PUT 관련
  UPDATE_SHARE_COUNT_FAILED: "공유 횟수 업데이트에 실패했습니다.",

  // DELETE 관련
  DELETE_FAILED: "프로필 삭제에 실패했습니다.",
  DELETE_SUCCESS: "프로필이 성공적으로 삭제되었습니다.",
} as const;
