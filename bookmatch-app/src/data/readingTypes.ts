import type { ReadingTypeInfo, ReadingMBTIType } from '@/types';

export const READING_TYPES: Record<ReadingMBTIType, ReadingTypeInfo> = {
  DELF: {
    name: 'DELF',
    title: '현실 속 깊은 감동을 찾는 공감형 독서가',
    shortTitle: '감동추구형',
    emoji: '💝',
    description: `현실적인 이야기 속에서 깊은 감동을 찾는 당신!
일상의 소소한 이야기에서 공감을 느끼고, 따뜻한 감정이 담긴 책을 좋아하는 타입이에요.
한 권을 집중해서 읽으며 여운을 즐기는 편이죠.`,
    keywords: ['#감동', '#공감', '#일상', '#힐링'],
    genres: ['한국소설', '에세이', '휴먼드라마', '일상물'],
    color: 'indigo',
  },
  DELS: {
    name: 'DELS',
    title: '느린 호흡으로 일상의 깊이를 발견하는 독서가',
    shortTitle: '여운탐구형',
    emoji: '🌙',
    description: `천천히, 깊게 읽으며 일상 속 의미를 발견하는 당신!
한 문장 한 문장 곱씹으며 읽고, 책을 덮은 후에도 오래 여운을 즐기는 타입이에요.
현실적이면서도 감성적인 이야기를 좋아해요.`,
    keywords: ['#여운', '#사색', '#깊이', '#문학'],
    genres: ['순수문학', '에세이', '시집', '인문학'],
    color: 'purple',
  },
  DERF: {
    name: 'DERF',
    title: '환상 속에서 진한 감동을 찾는 몽상가',
    shortTitle: '판타지감성형',
    emoji: '🦄',
    description: `판타지 세계에서 깊은 감동을 경험하고 싶은 당신!
상상의 세계에 푹 빠져들어 캐릭터와 함께 울고 웃는 타입이에요.
빠른 전개로 몰입감 있게 즐기는 걸 좋아해요.`,
    keywords: ['#판타지', '#감동', '#몰입', '#모험'],
    genres: ['판타지소설', '로맨스판타지', '이세계물', '무협'],
    color: 'pink',
  },
  DESF: {
    name: 'DESF',
    title: '환상의 세계에서 깊은 여운을 찾는 탐험가',
    shortTitle: '세계관탐구형',
    emoji: '🌌',
    description: `정교한 세계관 속에서 깊은 의미를 찾는 당신!
천천히 세계관을 음미하며, 감성적인 서사에 깊이 빠져드는 타입이에요.
복잡한 설정과 캐릭터의 내면을 탐구하는 걸 좋아해요.`,
    keywords: ['#세계관', '#감성', '#서사', '#탐구'],
    genres: ['하이판타지', 'SF소설', '서사시적소설', '대하소설'],
    color: 'violet',
  },
  DLRF: {
    name: 'DLRF',
    title: '현실을 날카롭게 분석하는 이성적 독서가',
    shortTitle: '분석형',
    emoji: '🔍',
    description: `논리적으로 현실을 파헤치는 걸 좋아하는 당신!
사실에 기반한 정보를 빠르게 습득하고, 지식을 쌓아가는 타입이에요.
효율적으로 핵심을 파악하는 독서를 선호해요.`,
    keywords: ['#분석', '#논리', '#지식', '#효율'],
    genres: ['경제경영', '자기계발', '과학', '시사'],
    color: 'blue',
  },
  DLRS: {
    name: 'DLRS',
    title: '현실을 철학적으로 사유하는 지성인',
    shortTitle: '사유형',
    emoji: '📚',
    description: `깊은 사고로 세상을 이해하려는 당신!
한 권을 깊이 있게 읽으며 철학적 질문을 던지는 타입이에요.
현실의 본질을 탐구하는 독서를 즐겨요.`,
    keywords: ['#철학', '#사유', '#본질', '#지성'],
    genres: ['철학', '인문학', '역사', '사회과학'],
    color: 'slate',
  },
  DLFF: {
    name: 'DLFF',
    title: '논리적으로 완성된 상상 세계를 탐험하는 탐구자',
    shortTitle: 'SF형',
    emoji: '🚀',
    description: `과학적 상상력의 세계를 탐험하는 당신!
논리적으로 정교한 SF 세계에 빠르게 몰입하는 타입이에요.
과학과 상상이 만나는 지점을 즐겨요.`,
    keywords: ['#SF', '#과학', '#미래', '#테크놀로지'],
    genres: ['SF소설', '과학', '미래학', '테크스릴러'],
    color: 'cyan',
  },
  DLFS: {
    name: 'DLFS',
    title: '복잡한 세계관을 논리적으로 해부하는 연구자',
    shortTitle: '연구자형',
    emoji: '🔬',
    description: `세계관의 논리적 구조를 분석하는 당신!
천천히 설정을 파악하며 세계의 원리를 이해하려는 타입이에요.
디테일한 설정과 논리적 일관성을 중시해요.`,
    keywords: ['#연구', '#설정', '#논리', '#디테일'],
    genres: ['하드SF', '설정물', '백과사전', '학술서'],
    color: 'teal',
  },
  LERF: {
    name: 'LERF',
    title: '일상 속 작은 감동을 가볍게 즐기는 낙천가',
    shortTitle: '힐링형',
    emoji: '☀️',
    description: `가볍고 따뜻한 이야기를 즐기는 당신!
일상의 소소한 행복을 담은 책을 빠르게 즐기는 타입이에요.
부담 없이 읽으면서 힐링하는 걸 좋아해요.`,
    keywords: ['#힐링', '#일상', '#행복', '#편안함'],
    genres: ['에세이', '힐링소설', '일상물', '여행기'],
    color: 'amber',
  },
  LERS: {
    name: 'LERS',
    title: '아름다운 문장을 수집하는 감성 큐레이터',
    shortTitle: '문장수집형',
    emoji: '✨',
    description: `예쁜 문장을 모으고 음미하는 당신!
천천히 읽으며 마음에 드는 구절을 발견하는 타입이에요.
감성적인 글귀와 아름다운 표현을 좋아해요.`,
    keywords: ['#문장', '#감성', '#수집', '#글귀'],
    genres: ['시집', '에세이', '산문집', '문학'],
    color: 'rose',
  },
  LEFF: {
    name: 'LEFF',
    title: '달콤한 판타지를 가볍게 즐기는 낭만주의자',
    shortTitle: '로맨스판타지형',
    emoji: '💫',
    description: `달달한 로맨스와 판타지를 즐기는 당신!
가볍고 재미있는 이야기에 빠르게 몰입하는 타입이에요.
설렘과 재미를 주는 책을 좋아해요.`,
    keywords: ['#로판', '#설렘', '#달달', '#재미'],
    genres: ['로맨스판타지', '로맨스소설', '웹소설', '만화'],
    color: 'fuchsia',
  },
  LEFS: {
    name: 'LEFS',
    title: '몽환적인 분위기를 찾아 떠나는 여행자',
    shortTitle: '분위기형',
    emoji: '🌸',
    description: `분위기 있는 이야기를 천천히 즐기는 당신!
몽환적이고 아름다운 세계에 빠져드는 타입이에요.
예쁜 일러스트와 감성적인 분위기를 좋아해요.`,
    keywords: ['#분위기', '#몽환', '#감성', '#아름다움'],
    genres: ['그림책', '일러스트에세이', '감성소설', '시집'],
    color: 'pink',
  },
  LLRF: {
    name: 'LLRF',
    title: '실생활에 바로 쓸 수 있는 지식을 찾는 실용주의자',
    shortTitle: '실용형',
    emoji: '💡',
    description: `바로 써먹을 수 있는 지식을 원하는 당신!
효율적으로 필요한 정보만 쏙쏙 얻어가는 타입이에요.
실용적인 팁과 노하우를 담은 책을 좋아해요.`,
    keywords: ['#실용', '#팁', '#노하우', '#효율'],
    genres: ['자기계발', '실용서', '비즈니스', '재테크'],
    color: 'emerald',
  },
  LLRS: {
    name: 'LLRS',
    title: '폭넓은 지식을 쌓아가는 교양인',
    shortTitle: '교양형',
    emoji: '🎓',
    description: `다양한 분야의 지식을 탐구하는 당신!
깊이 있게 교양을 쌓아가며 세상을 이해하는 타입이에요.
다큐멘터리 같은 논픽션을 즐겨요.`,
    keywords: ['#교양', '#지식', '#다큐', '#논픽션'],
    genres: ['인문학', '역사', '과학교양', '다큐멘터리'],
    color: 'sky',
  },
  LLFF: {
    name: 'LLFF',
    title: '트렌디한 SF·판타지를 빠르게 즐기는 큐레이터',
    shortTitle: '트렌드형',
    emoji: '⚡',
    description: `최신 트렌드를 빠르게 캐치하는 당신!
인기 있는 장르물을 가볍게 섭렵하는 타입이에요.
화제의 신작을 놓치지 않고 챙겨 읽어요.`,
    keywords: ['#트렌드', '#신작', '#화제작', '#장르물'],
    genres: ['웹소설', 'SF', '판타지', '스릴러'],
    color: 'orange',
  },
  LLFS: {
    name: 'LLFS',
    title: '다양한 세계를 수집하고 비교하는 컬렉터',
    shortTitle: '컬렉터형',
    emoji: '📖',
    description: `다양한 세계관을 수집하는 당신!
여러 시리즈를 천천히 비교하며 즐기는 타입이에요.
좋아하는 작품의 외전과 스핀오프도 챙겨 읽어요.`,
    keywords: ['#수집', '#시리즈', '#세계관', '#컬렉션'],
    genres: ['시리즈물', '외전', '설정집', '팬북'],
    color: 'lime',
  },
};

// 유형별 간단 설명 (리스트용)
export const READING_TYPE_SUMMARIES: { type: ReadingMBTIType; summary: string }[] = [
  { type: 'DELF', summary: '감동적인 현실 이야기를 깊이 읽는' },
  { type: 'DELS', summary: '일상의 깊이를 천천히 발견하는' },
  { type: 'DERF', summary: '판타지에서 감동을 찾는' },
  { type: 'DESF', summary: '세계관 속 여운을 탐구하는' },
  { type: 'DLRF', summary: '현실을 분석하며 빠르게 읽는' },
  { type: 'DLRS', summary: '철학적으로 사유하는' },
  { type: 'DLFF', summary: 'SF를 논리적으로 탐험하는' },
  { type: 'DLFS', summary: '세계관을 연구하는' },
  { type: 'LERF', summary: '일상 힐링을 가볍게 즐기는' },
  { type: 'LERS', summary: '아름다운 문장을 수집하는' },
  { type: 'LEFF', summary: '로맨스판타지를 즐기는' },
  { type: 'LEFS', summary: '분위기 있는 이야기를 찾는' },
  { type: 'LLRF', summary: '실용적인 지식을 얻는' },
  { type: 'LLRS', summary: '교양을 쌓아가는' },
  { type: 'LLFF', summary: '트렌디한 장르물을 섭렵하는' },
  { type: 'LLFS', summary: '세계관을 수집하는' },
];
