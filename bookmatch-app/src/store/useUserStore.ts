import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, ReadingMBTIType, TestAnswer } from '@/types';

interface UserState {
  // 사용자 정보
  user: User | null;
  isLoggedIn: boolean;
  
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
      testAnswers: [],
      currentQuestionIndex: 0,

      setUser: (user) => set({ user, isLoggedIn: !!user }),

      login: (email, nickname) => {
        const user: User = {
          id: crypto.randomUUID(),
          email,
          nickname,
          createdAt: new Date(),
          completedTest: false,
        };
        set({ user, isLoggedIn: true });
      },

      logout: () => set({ user: null, isLoggedIn: false }),

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
    }
  )
);
