import { Button } from "@/shared/ui";
import { Card, CardContent, CardHeader } from "@/shared/ui";
import { createClient } from "@/shared/utils/supabase/server";
import Link from "next/link";
import { LOGIN_PATHNAME } from "@/shared/config/pathname";

export default async function LandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profileCreateLink = user ? "/profiles/create" : LOGIN_PATHNAME;

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-16">
      {/* Hero Section */}
      <div className="mb-16 flex flex-col items-center text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          나만의 맞춤형 프로필을 만들어보세요
        </h1>
        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          AI가 당신을 더 깊이 이해하고 표현하는 특별한 프로필을 만들어드립니다
        </p>
        <Button asChild size="lg" className="text-lg">
          <Link href={profileCreateLink}>프로필 만들기</Link>
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">기본 질문</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              10개의 기본 질문에 답하며 자신을 표현하는 첫 걸음을 시작하세요
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">AI 맞춤 질문</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              AI가 당신의 답변을 분석하여 더 깊이 있는 맞춤형 질문을 제공합니다
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">테마 선택</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              다양한 테마 중에서 선택하여 당신만의 특별한 프로필을 완성하세요
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      <div className="mt-16 flex w-full max-w-5xl flex-col items-center">
        <h2 className="mb-8 text-3xl font-bold">다양한 목적에 활용하세요</h2>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-semibold">
                ✨ 개성 있는 자기소개
              </h3>
              <p className="text-muted-foreground">
                취업, 네트워킹, SNS 등 다양한 상황에 맞는 프로필을 만들 수
                있습니다
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-semibold">🔗 간편한 공유</h3>
              <p className="text-muted-foreground">
                생성된 프로필을 링크로 공유하여 자신을 효과적으로 표현하세요
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
