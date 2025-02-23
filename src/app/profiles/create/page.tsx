import CreateProfileProcess from "@/src/widgets/profile/ui/CreateProfileProcess";

export default function CreateProfile() {
  return (
    <div className="flex w-screen justify-center px-4">
      <div className="w-full min-w-[330px] max-w-[600px]">
        <CreateProfileProcess />
      </div>
    </div>
  );
}
