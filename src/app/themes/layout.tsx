export default function CreateThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container mx-auto px-4 py-8">{children}</main>;
}

export const metadata = {
  title: "테마 목록",
};
