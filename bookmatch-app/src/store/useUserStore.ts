import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, ReadingMBTIType, TestAnswer } from '@/types';

function normalizeUser(user: User | null): User | null {
  if (!user) return null;

  const createdAtRaw = (user as unknown as { createdAt?: unknown }).createdAt;
  const createdAt =
    createdAtRaw instanceof Date
      ? createdAtRaw
      : typeof createdAtRaw === 'string' || typeof createdAtRaw === 'number'
        ? new Date(createdAtRaw)
        : user.createdAt;

  const safeCreatedAt = Number.isNaN(createdAt.getTime()) ? new Date() : createdAt;

  // 요구사항: user.id를 현재 사용 중인 닉네임으로 사용
  const id = user.nickname;

  return { ...user, id, createdAt: safeCreatedAt };
}

interface UserState {
  // 사용자 정보
  user: User | null;
  isLoggedIn: boolean;

  /** persist hydration 완료 여부 (SSR hydration mismatch 방지용) */
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  
  // 독서 목표
  readingGoal2025: number;
  setReadingGoal2025: (goal: number) => void;
  /** 사용자가 2025 목표를 한 번이라도 설정했는지 */
  readingGoal2025HasBeenSet: boolean;
  setReadingGoal2025HasBeenSet: (hasBeenSet: boolean) => void;

  // 테스트 관련
  testAnswers: TestAnswer[];
  currentQuestionIndex: number;
  
  // 액션
  setUser: (user: User | null) => void;
  login: (email: string, nickname: string) => void;
  logout: () => void;
  setMBTIType: (mbtiType: ReadingMBTIType) => void;
  
  // 테스트 액션
  addTestAnswer: (answer: TestAnswer) => void;
  setCurrentQuestionIndex: (index: number) => void;
  resetTest: () => void;
  calculateMBTI: () => ReadingMBTIType;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      hasHydrated: false,
      readingGoal2025: 30,
      readingGoal2025HasBeenSet: false,
      testAnswers: [],
      currentQuestionIndex: 0,

      setHasHydrated: (hydrated) => set({ hasHydrated: !!hydrated }),
      setUser: (user) => set({ user: normalizeUser(user), isLoggedIn: !!user }),

      login: (email, nickname) => {
        const user: User = {
          id: nickname,
          email,
          nickname,
          createdAt: new Date(),
          completedTest: false,
        };
        set({ user: normalizeUser(user), isLoggedIn: true });
      },

      logout: () => set({ user: null, isLoggedIn: false }),

      setReadingGoal2025: (goal) => set({ readingGoal2025: Math.max(1, Math.floor(goal || 1)) }),
      setReadingGoal2025HasBeenSet: (hasBeenSet) => set({ readingGoal2025HasBeenSet: !!hasBeenSet }),

      setMBTIType: (mbtiType) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, mbtiType, completedTest: true },
          });
        }
      },

      addTestAnswer: (answer) => {
        set((state) => ({
          testAnswers: [...state.testAnswers, answer],
        }));
      },

      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

      resetTest: () => set({ testAnswers: [], currentQuestionIndex: 0 }),

      calculateMBTI: () => {
        const { testAnswers } = get();
        
        // 축별 점수 계산
        const scores = {
          D: 0, L: 0,  // 몰입도: Deep vs Light
          E: 0, Logi: 0,  // 감성/이성: Emotional vs Logical
          R: 0, F: 0,  // 현실/상상: Real vs Fantasy
          Fa: 0, S: 0,  // 전개속도: Fast vs Slow
        };

        testAnswers.forEach((answer) => {
          const selectedType = answer.selectedType;
          
          switch (answer.axis) {
            case 'DL':
              if (selectedType === 'D') scores.D++;
              else scores.L++;
              break;
            case 'EL':
              if (selectedType === 'E') scores.E++;
              else scores.Logi++;
              break;
            case 'RF':
              if (selectedType === 'R') scores.R++;
              else scores.F++;
              break;
            case 'FS':
              if (selectedType === 'F') scores.Fa++;
              else scores.S++;
              break;
          }
        });

        // MBTI 결정 (동점 시 우선순위 적용)
        const mbti = [
          scores.D >= scores.L ? 'D' : 'L',
          scores.E >= scores.Logi ? 'E' : 'L',
          scores.R >= scores.F ? 'R' : 'F',
          scores.Fa >= scores.S ? 'F' : 'S',
        ].join('') as ReadingMBTIType;

        return mbti;
      },
    }),
    {
      name: 'bookmatch-user-storage',
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        // persist로 복원된 값에서 Date/string 혼합, id 동기화 등을 정규화
        if (state?.user) state.setUser(state.user);
        // 목표 값이 비어있으면 기본값 보장
        if (state && (state.readingGoal2025 as unknown) == null) state.setReadingGoal2025(30);
        if (state && (state.readingGoal2025HasBeenSet as unknown) == null) state.setReadingGoal2025HasBeenSet(false);
        state?.setHasHydrated(true);
      },
    }
  )
);
