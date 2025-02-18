import { getProfile } from "@/entities/profiles/api/getProfile";
import { Profile } from "@/widgets/Profile";

type ProfileDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function ProfileDetailPage({
  params,
}: ProfileDetailPageProps) {
  const profile = await getProfile(params.id);
  const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profiles/${params.id}`;

  if (!profile) {
    return <div>프로필을 찾을 수 없습니다.</div>;
  }

  return <Profile profile={profile} profileUrl={profileUrl} />;
}
