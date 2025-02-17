import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const content = response.content[0];
    if ("text" in content) {
      // JSON 문자열 추출
      const text = content.text;
      const start = text.indexOf("[");
      const end = text.lastIndexOf("]") + 1;

      if (start === -1 || end === 0) {
        return NextResponse.json(
          { error: "응답에서 JSON을 찾을 수 없습니다." },
          { status: 500 },
        );
      }

      const jsonStr = text.slice(start, end);

      try {
        // JSON 파싱 테스트
        JSON.parse(jsonStr);

        return NextResponse.json({
          content: jsonStr,
        });
      } catch (error) {
        return NextResponse.json(
          { error: "유효하지 않은 JSON 형식입니다." },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { error: "예상치 못한 응답 형식입니다." },
      { status: 500 },
    );
  } catch (error) {
    console.error("Claude API Error:", error);
    return NextResponse.json(
      { error: "요청 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
