import { ProfileInputType } from "@/src/features/profiles/model/type";

export const INITIAL_PROFILE_INPUT: ProfileInputType = {
  title: "박둘기",
  basicAnswers: [
    {
      question: "어떤 이름 혹은 닉네임으로 프로필에 자신을 소개하고 싶으세요?",
      answer: "박둘기",
      category: "displayName",
      order: 1,
    },
    {
      question: "나이가 어떻게 되시나요?",
      answer: "24",
      category: "age",
      order: 2,
    },
    {
      question: "직업이나 전공이 무엇인가요?",
      answer: "프론트엔드 개발자",
      category: "occupation",
      order: 3,
    },
    {
      question: "가장 많은 시간을 보내는 취미는 무엇인가요?",
      answer: "영화 보기",
      category: "hobby",
      order: 4,
    },
    {
      question: "요즘 가장 관심있는 주제나 빠져있는 것이 있다면?",
      answer: "주식 투자",
      category: "interest",
      order: 5,
    },
    {
      question: "인생에서 가장 중요하게 생각하는 가치는 무엇인가요?",
      answer: "가치 있는 삶",
      category: "coreValue",
      order: 6,
    },
    {
      question: "내가 가진 능력들 중에서 가장 뛰어나다고 생각하는 능력은?",
      answer: "커뮤니케이션",
      category: "strength",
      order: 7,
    },
    {
      question:
        "좋아하거나 존경하는 연예인, 크리에이터, 운동선수는 누구인가요?",
      answer: "김종국",
      category: "roleModel",
      order: 8,
    },
    {
      question: "본인의 성격을 한 문장으로 표현한다면?",
      answer: "ISTJ",
      category: "personality",
      order: 9,
    },
    {
      question: "현재 연애/결혼 상태는 어떻게 되시나요?",
      answer: "싱글 (좋은 사람이 있으면 만날 의향이 있음)",
      category: "relationshipStatus",
      order: 10,
    },
  ],
  aiAnswers: [
    {
      question:
        "영화를 보는 것을 좋아하시는데, 최근에 본 영화 중 가장 인상 깊었던 작품과 그 이유는 무엇인가요?",
      answer:
        "오펜하이머를 봤는데, 과학자의 도덕적 딜레마와 책임에 대해 깊이 생각해보게 되었습니다.",
      order: 1,
    },
    {
      question:
        "주식 투자에 관심이 많으신데, 투자를 통해 이루고 싶은 장기적인 목표가 있나요?",
      answer:
        "경제적 자유를 통해 더 많은 시간을 자기계발과 가치있는 일에 투자하고 싶습니다.",
      order: 2,
    },
    {
      question:
        "커뮤니케이션 능력이 뛰어나다고 하셨는데, 이 능력이 개발자로서의 경력에 어떤 도움이 되나요?",
      answer:
        "팀 프로젝트에서 기획자, 디자이너와의 원활한 소통으로 더 나은 제품을 만들 수 있습니다.",
      order: 3,
    },
    {
      question:
        "가치있는 삶을 중요하게 생각하시는데, 프론트엔드 개발자로서 어떤 가치를 만들어내고 싶으신가요?",
      answer:
        "사용자 경험을 개선하는 직관적인 인터페이스를 만들어 많은 사람들의 삶을 편리하게 만들고 싶습니다.",
      order: 4,
    },
  ],
  themeId: "4",
  imageUrl: "",
};
