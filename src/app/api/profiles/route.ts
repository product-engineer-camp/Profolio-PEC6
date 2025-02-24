import { createClient } from "@/shared/utils/supabase/server";
import { PersonalizedQuestion } from "@/src/entities/profiles/api/type";
import { CreateProfilePayload } from "@/src/features/profiles/model/type";
import {
  formatCamelToSnake,
  formatSnakeToCamel,
} from "@/src/shared/utils/formatters";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // 현재 로그인한 사용자 정보 가져오기
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "인증되지 않은 사용자입니다.",
          data: [],
        },
        { status: 401 },
      );
    }

    const { data: profiles, error } = await supabase
      .from("profile")
      .select(
        `
        *,
        theme:theme_id (*),
        personalizedQuestions:personalized_questions (*)
      `,
      )
      .eq("user_id", user.id); // user_id가 현재 로그인한 사용자의 ID와 일치하는 데이터만 조회

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: `프로필 목록 조회 실패: ${error.message}`,
          data: [],
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: profiles.map((profile) => {
        return {
          ...formatSnakeToCamel(profile),
          theme: formatSnakeToCamel(profile.theme),
          personalizedQuestions: profile.personalizedQuestions.map(
            (question: PersonalizedQuestion) => ({
              ...formatSnakeToCamel(question),
            }),
          ),
        };
      }),
    });
  } catch (error) {
    console.error("프로필 목록 조회 실패:", error);
    return NextResponse.json(
      {
        success: false,
        error: "프로필 목록을 불러오는데 실패했습니다.",
        data: [],
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 현재 로그인한 사용자 정보 가져오기
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "인증된 사용자만 프로필을 생성할 수 있습니다.",
          data: null,
        },
        { status: 401 },
      );
    }

    const { personalizedQuestions, ...payload }: CreateProfilePayload =
      await request.json();

    // 1. 프로필 생성 (user_id 포함)
    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .insert({ ...formatCamelToSnake(payload), user_id: user.id }) // user_id 추가
      .select()
      .single();

    if (profileError) throw profileError;

    // 2. 개인화된 질문 생성
    if (personalizedQuestions.length > 0) {
      const { error: questionsError } = await supabase
        .from("personalized_questions")
        .insert(
          personalizedQuestions.map((question) => ({
            profile_id: profile.id,
            ...question,
          })),
        );

      if (questionsError) throw questionsError;
    }

    return NextResponse.json({
      success: true,
      data: {
        ...profile,
        personalizedQuestions: personalizedQuestions.map((q) => ({
          profileId: profile.id,
          ...q,
        })),
      },
    });
  } catch (error) {
    console.error("프로필 생성 실패:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "프로필 생성에 실패했습니다.",
        data: null,
      },
      { status: 500 },
    );
  }
}
