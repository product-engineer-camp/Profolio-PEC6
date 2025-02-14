import { CreateThemeForm } from "@/widgets/CreateThemeForm";

export default function CreateThemePage() {
  return (
    <main className="mx-auto flex min-h-screen justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold text-black">
          새로운 테마 만들기
        </h1>
        <CreateThemeForm />
      </div>
    </main>
  );
}
