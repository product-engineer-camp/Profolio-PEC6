import { createClient } from "@/shared/utils/supabase/server";
import { NextResponse } from "next/server";

type PersonalizedQuestion = {
  question: string;
  answer: string;
};

type CreateProfilePayload = {
  display_name: string;
  age: number;
  occupation: string;
  hobby: string;
  current_interest: string;
  core_value: string;
  strength: string;
  role_model: string;
  personality: string;
  relationship_status: string;
  theme_id: number;
  personalized_questions: PersonalizedQuestion[];
};

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: profiles, error } = await supabase
      .from("profile")
      .select(
        `
        *,
        theme:theme_id (*),
        personalized_questions (*)
      `,
      )
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: `프로필 목록 조회 실패: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: profiles,
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
    const payload: CreateProfilePayload = await request.json();

    // 1. 프로필 생성
    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .insert({
        display_name: payload.display_name,
        age: payload.age,
        occupation: payload.occupation,
        hobby: payload.hobby,
        current_interest: payload.current_interest,
        core_value: payload.core_value,
        strength: payload.strength,
        role_model: payload.role_model,
        personality: payload.personality,
        relationship_status: payload.relationship_status,
        theme_id: payload.theme_id,
      })
      .select()
      .single();

    if (profileError) throw profileError;

    // 2. 개인화된 질문 생성
    if (payload.personalized_questions.length > 0) {
      const { error: questionsError } = await supabase
        .from("personalized_questions")
        .insert(
          payload.personalized_questions.map((q: PersonalizedQuestion) => ({
            profile_id: profile.id,
            question: q.question,
            answer: q.answer,
          })),
        );

      if (questionsError) throw questionsError;
    }

    return NextResponse.json({
      success: true,
      data: {
        ...profile,
        personalized_questions: payload.personalized_questions.map(
          (q, index) => ({
            id: `${profile.id}-${index}`,
            profile_id: profile.id,
            ...q,
          }),
        ),
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
