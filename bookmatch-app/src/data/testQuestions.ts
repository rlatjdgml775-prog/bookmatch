import type { TestQuestion } from '@/types';

export const TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    axis: 'DL',
    question: '주말 오후, 책을 읽고 있습니다. 당신은?',
    optionA: {
      text: '한 권을 처음부터 끝까지 집중해서 읽는다',
      subtext: '몰입해서 읽는 게 좋아요',
      emoji: '📖',
      type: 'D',
    },
    optionB: {
      text: '여러 책을 번갈아가며 읽거나, 원하는 부분만 골라 읽는다',
      subtext: '가볍게 여러 권 읽어요',
      emoji: '📚',
      type: 'L',
    },
  },
  {
    id: 2,
    axis: 'DL',
    question: '서점에서 책을 고르고 있습니다. 당신의 선택은?',
    optionA: {
      text: '한 권을 깊이 있게 파고들 수 있는 책',
      subtext: '깊이 있는 독서가 좋아요',
      emoji: '🎯',
      type: 'D',
    },
    optionB: {
      text: '짧은 시간에 여러 인사이트를 얻을 수 있는 책',
      subtext: '효율적인 독서를 해요',
      emoji: '⚡',
      type: 'L',
    },
  },
  {
    id: 3,
    axis: 'EL',
    question: '좋은 책을 읽고 난 후 당신은?',
    optionA: {
      text: '감동적인 장면을 떠올리며 여운에 젖는다',
      subtext: '감정이입이 잘 돼요',
      emoji: '🥹',
      type: 'E',
    },
    optionB: {
      text: '책의 핵심 메시지나 논리를 정리해본다',
      subtext: '분석하는 게 좋아요',
      emoji: '🧠',
      type: 'L',
    },
  },
  {
    id: 4,
    axis: 'EL',
    question: '책을 추천받을 때 더 끌리는 말은?',
    optionA: {
      text: '"이 책 읽고 눈물 흘렸어, 정말 감동적이야"',
      subtext: '감성적인 책이 좋아요',
      emoji: '💕',
      type: 'E',
    },
    optionB: {
      text: '"이 책에서 배울 점이 정말 많아, 인사이트가 대단해"',
      subtext: '배움이 있는 책이 좋아요',
      emoji: '💡',
      type: 'L',
    },
  },
  {
    id: 5,
    axis: 'RF',
    question: '당신이 더 끌리는 책의 배경은?',
    optionA: {
      text: '현실 세계를 배경으로 한 이야기',
      subtext: '공감가는 현실 이야기',
      emoji: '🏙️',
      type: 'R',
    },
    optionB: {
      text: '상상의 세계나 판타지 배경의 이야기',
      subtext: '새로운 세계로의 탈출',
      emoji: '🏰',
      type: 'F',
    },
  },
  {
    id: 6,
    axis: 'RF',
    question: '주인공의 고민으로 더 몰입되는 것은?',
    optionA: {
      text: '직장, 연애, 가족 관계 등 현실적인 고민',
      subtext: '나의 고민과 비슷해요',
      emoji: '👥',
      type: 'R',
    },
    optionB: {
      text: '마법, 능력, 세계를 구하는 것 같은 판타지적 고민',
      subtext: '색다른 모험이 좋아요',
      emoji: '✨',
      type: 'F',
    },
  },
  {
    id: 7,
    axis: 'FS',
    question: '이야기의 전개 속도, 당신의 취향은?',
    optionA: {
      text: '빠르게 전개되며 다음이 궁금해지는 이야기',
      subtext: '페이지가 술술 넘어가요',
      emoji: '🚀',
      type: 'F',
    },
    optionB: {
      text: '천천히 깊어지며 여운이 남는 이야기',
      subtext: '음미하며 읽고 싶어요',
      emoji: '🌙',
      type: 'S',
    },
  },
  {
    id: 8,
    axis: 'FS',
    question: '책을 읽을 때 당신은?',
    optionA: {
      text: '다음 내용이 궁금해서 빨리빨리 읽게 된다',
      subtext: '결말이 너무 궁금해요',
      emoji: '⏩',
      type: 'F',
    },
    optionB: {
      text: '문장을 곱씹으며 천천히 읽는 편이다',
      subtext: '좋은 문장은 여러 번 읽어요',
      emoji: '🔖',
      type: 'S',
    },
  },
];

// 테스트 관련 상수
export const TOTAL_QUESTIONS = TEST_QUESTIONS.length;

// 축별 설명
export const AXIS_DESCRIPTIONS = {
  DL: {
    name: '몰입도',
    D: { label: 'Deep (깊이)', description: '한 권에 깊이 몰입' },
    L: { label: 'Light (가볍게)', description: '여러 권 가볍게' },
  },
  EL: {
    name: '감성/이성',
    E: { label: 'Emotional (감성)', description: '감정이입, 공감 중시' },
    L: { label: 'Logical (이성)', description: '분석, 논리 중시' },
  },
  RF: {
    name: '현실/상상',
    R: { label: 'Real (현실)', description: '현실 기반 이야기' },
    F: { label: 'Fantasy (상상)', description: '상상, 판타지 선호' },
  },
  FS: {
    name: '전개속도',
    F: { label: 'Fast (빠름)', description: '빠른 전개 선호' },
    S: { label: 'Slow (느림)', description: '천천히 음미' },
  },
};
