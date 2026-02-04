'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, X } from 'lucide-react';
import { useUserStore } from '@/store';
import { TEST_QUESTIONS, TOTAL_QUESTIONS } from '@/data';
import type { TestAnswer } from '@/types';

export default function TestQuestionPage() {
  const router = useRouter();
  const { testAnswers, currentQuestionIndex, addTestAnswer, setCurrentQuestionIndex, resetTest } =
    useUserStore();

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = TEST_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;

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

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleExit = () => {
    resetTest();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/90 px-4 py-3 backdrop-blur">
        <button
          onClick={handleGoBack}
          disabled={currentQuestionIndex === 0}
          className="p-2 -ml-2 disabled:opacity-30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-medium text-gray-600">
          {currentQuestionIndex + 1} / {TOTAL_QUESTIONS}
        </span>
        <button onClick={() => setIsExitModalOpen(true)} className="p-2 -mr-2">
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Progress */}
      <div className="px-4 pt-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-center gap-1 mt-3">
          {TEST_QUESTIONS.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx < currentQuestionIndex
                  ? 'bg-primary'
                  : idx === currentQuestionIndex
                  ? 'bg-primary animate-pulse'
                  : 'bg-gray-300'
              }`}
            />
          ))}
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

      {/* Exit Modal */}
      <Dialog open={isExitModalOpen} onOpenChange={setIsExitModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>테스트를 그만두시겠어요?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 py-4">
            지금 나가면 진행 상황이 저장되지 않아요.
            <br />
            정말 나가시겠어요?
          </p>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsExitModalOpen(false)} className="flex-1">
              계속하기
            </Button>
            <Button variant="destructive" onClick={handleExit} className="flex-1">
              나가기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
