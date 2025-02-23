import { ProfileDetail } from "@/src/widgets/ProfileDetail";

type ProfileDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function ProfileDetailPage({
  params,
}: ProfileDetailPageProps) {
  const { id } = await Promise.resolve(params);
  const profileUrl = `${process.env["NEXT_PUBLIC_APP_URL"]}/profiles/${id}`;

  return (
    <div className="py-5">
      <ProfileDetail profileId={Number(id)} profileUrl={profileUrl} />
    </div>
  );
}
