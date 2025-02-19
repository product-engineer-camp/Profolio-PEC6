export default function CreateThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen justify-center px-4 py-8">
      <div className="w-full max-w-3xl text-center">{children}</div>
    </main>
  );
}

export const metadata = {
  title: "테마 생성 하기",
};
