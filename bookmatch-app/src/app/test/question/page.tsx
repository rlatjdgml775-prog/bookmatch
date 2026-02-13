'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useUserStore } from '@/store';
import { TEST_QUESTIONS, TOTAL_QUESTIONS } from '@/data';
import type { TestAnswer } from '@/types';

export default function TestQuestionPage() {
  const router = useRouter();
  const { testAnswers, currentQuestionIndex, addTestAnswer, setCurrentQuestionIndex, resetTest } =
    useUserStore();

  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = TEST_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      return;
    }
    // 첫 문항이면 테스트 시작 화면으로 이동
    resetTest();
    router.push('/test/start');
  };

  const handleSelectOption = (option: 'A' | 'B') => {
    if (isAnimating) return;

    setIsAnimating(true);

    const selectedOption = option === 'A' ? currentQuestion.optionA : currentQuestion.optionB;
    const answer: TestAnswer = {
      questionId: currentQuestion.id,
      selectedOption: option,
      axis: currentQuestion.axis,
      selectedType: selectedOption.type,
    };

    addTestAnswer(answer);

    setTimeout(() => {
      if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnimating(false);
      } else {
        // 테스트 완료 - 로딩 페이지로 이동
        router.push('/test/loading');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Progress */}
      <div className="sticky top-0 z-10 bg-white/90 px-4 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <button type="button" onClick={handleGoBack} className="p-2 -ml-2" aria-label="뒤로가기">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Progress value={progress} className="h-2 flex-1" />
        </div>
      </div>

      {/* Question */}
      <main className="max-w-md mx-auto px-4 py-8">
        <div
          className={`transition-all duration-300 ${
            isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-10 leading-relaxed">
            Q{currentQuestion.id}. {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {/* Option A */}
            <Card
              onClick={() => handleSelectOption('A')}
              className="p-5 cursor-pointer border-2 border-transparent hover:border-primary hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{currentQuestion.optionA.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">{currentQuestion.optionA.text}</h3>
                  <p className="text-gray-500 text-sm">{currentQuestion.optionA.subtext}</p>
                </div>
              </div>
            </Card>

            <div className="text-center text-gray-400 font-medium py-2">또는</div>

            {/* Option B */}
            <Card
              onClick={() => handleSelectOption('B')}
              className="p-5 cursor-pointer border-2 border-transparent hover:border-primary hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{currentQuestion.optionB.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">{currentQuestion.optionB.text}</h3>
                  <p className="text-gray-500 text-sm">{currentQuestion.optionB.subtext}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
