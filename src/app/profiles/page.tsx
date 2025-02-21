import { ProfileListWidget } from "@/widgets/ProfileListWidget";
import { getProfileList } from "@/features/profiles/api/getProfileList";

// 페이지를 정적으로 생성하도록 설정
export const revalidate = 3600; // 1시간마다 재생성

// 정적 페이지 생성을 위한 메타데이터 설정
export const dynamic = "force-static";

export default async function ProfilesPage() {
  const profiles = await getProfileList();

  // 빈 프로필 배열도 유효한 상태로 처리
  // 빌드 시점에 데이터가 없을 수 있으므로 에러 대신 빈 상태 표시
  if (!profiles?.length) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-gray-500">
        현재 등록된 프로필이 없습니다.
      </div>
    );
  }

  return <ProfileListWidget initialProfiles={profiles} />;
}
