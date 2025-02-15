import Link from "next/link";

export default function Step2Page() {
  return (
    <div>
      <Link href="/profiles/create/step1">이전</Link>
      <Link href="/profiles/create/step3">다음</Link>
    </div>
  );
}
