import { ProfileListWidget } from "@/src/widgets/ProfileListWidget";

export default async function Index() {
  return (
    <div className="bg-background">
      <div className="container py-6">
        <ProfileListWidget />
      </div>
    </div>
  );
}
