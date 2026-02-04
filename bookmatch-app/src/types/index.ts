// BookMatch 타입 정의

// 독서 MBTI 유형 (16가지)
export type ReadingMBTIType =
  | 'DELF' | 'DELS' | 'DERF' | 'DESF'
  | 'DLRF' | 'DLRS' | 'DLFF' | 'DLFS'
  | 'LERF' | 'LERS' | 'LEFF' | 'LEFS'
  | 'LLRF' | 'LLRS' | 'LLFF' | 'LLFS';

// MBTI 축 타입
export type MBTIAxis = 'DL' | 'EL' | 'RF' | 'FS';

// 테스트 문항 옵션
export interface TestOption {
  text: string;
  subtext: string;
  emoji: string;
  type: string;
}

// 테스트 문항
export interface TestQuestion {
  id: number;
  axis: MBTIAxis;
  question: string;
  optionA: TestOption;
  optionB: TestOption;
}

// 독서 유형 정보
export interface ReadingTypeInfo {
  name: ReadingMBTIType;
  title: string;
  shortTitle: string;
  emoji: string;
  description: string;
  keywords: string[];
  genres: string[];
  color: string;
}

// 도서 정보
export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  pages: number;
  rating: number;
  category: string;
  genre: string;
  coverImage?: string;
  coverColor?: string;
  emoji?: string;
  keywords: string[];
  description: string;
  mbtiMatch: ReadingMBTIType[];
  recommendReason?: string;
}

// 사용자 정보
export interface User {
  id: string;
  email: string;
  nickname: string;
  mbtiType?: ReadingMBTIType;
  createdAt: Date;
  completedTest: boolean;
}

// 독서 기록
export interface ReadingRecord {
  id: string;
  bookId: string;
  userId: string;
  status: 'reading' | 'completed' | 'dropped';
  rating?: number;
  review?: string;
  startDate?: Date;
  endDate?: Date;
  feedback?: 'like' | 'dislike';
}

// 위시리스트 아이템
export interface WishlistItem {
  id: string;
  bookId: string;
  userId: string;
  addedAt: Date;
  note?: string;
}

// 도서 평가 타입
export type BookEvaluation = 'like' | 'dislike' | 'skip';

// 테스트 답변
export interface TestAnswer {
  questionId: number;
  selectedOption: 'A' | 'B';
  axis: MBTIAxis;
  selectedType: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 추천 결과
export interface RecommendationResult {
  books: Book[];
  mbtiType: ReadingMBTIType;
  recommendedAt: Date;
}

// 월간 리포트
export interface MonthlyReport {
  month: string;
  year: number;
  totalBooks: number;
  totalPages: number;
  favoriteGenre: string;
  topKeywords: string[];
  readingTrend: 'up' | 'down' | 'stable';
  aiComment: string;
}

// 연간 리포트
export interface YearlyReport {
  year: number;
  totalBooks: number;
  totalPages: number;
  monthlyBreakdown: { month: number; books: number }[];
  topGenres: { genre: string; count: number }[];
  readingEvolution: string;
  aiSummary: string;
}
