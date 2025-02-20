export default function CreateThemeSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex flex-col justify-center gap-[100px] px-4 py-8">
      {children}
    </main>
  );
}

export const metadata = {
  title: "테마 생성 완료",
  description: "새로운 테마가 성공적으로 생성되었습니다",
};
