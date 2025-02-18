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
  const currentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profiles/${params.id}`;

  return (
    <Profile profile={profile} profileId={params.id} currentUrl={currentUrl} />
  );
}
