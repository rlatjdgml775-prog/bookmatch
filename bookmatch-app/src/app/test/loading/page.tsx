'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { useUserStore } from '@/store';

const LOADING_MESSAGES = [
  '"감성적인 면이 있으시네요"',
  '"깊이 있는 독서를 좋아하시는군요"',
  '"따뜻한 이야기를 선호하시네요"',
  '"독특한 취향을 가지고 계시네요"',
  '"맞춤 도서를 찾고 있어요"',
  '"거의 다 됐어요!"',
];

export default function TestLoadingPage() {
  const router = useRouter();
  const { calculateMBTI, setMBTIType } = useUserStore();

  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // 프로그레스 애니메이션
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // 메시지 변경
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 800);

    // 분석 완료 후 결과 페이지로 이동
    const timeout = setTimeout(() => {
      const mbtiType = calculateMBTI();
      setMBTIType(mbtiType);
      router.push('/test/result');
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(timeout);
    };
  }, [calculateMBTI, setMBTIType, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-white to-background flex items-center justify-center">
      <main className="text-center px-6">
        {/* Animated Icon */}
        <div className="relative mb-8">
          {/* Sparkles */}
          <div className="absolute -top-4 -left-4 text-2xl animate-pulse">✨</div>
          <div className="absolute -top-2 -right-6 text-xl animate-pulse delay-300">✨</div>
          <div className="absolute -bottom-2 -left-6 text-xl animate-pulse delay-500">✨</div>

          {/* Main Icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <div
              className="absolute inset-0 rounded-full bg-primary/20 animate-ping"
              style={{ animationDelay: '0.5s' }}
            />
            <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center relative z-10 animate-bounce">
              <span className="text-6xl">🔮</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-primary mb-3">
          분석 중
          <span className="inline-flex">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: '200ms' }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: '400ms' }}>
              .
            </span>
          </span>
        </h1>
        <p className="text-gray-600 mb-8">당신의 독서 성향을 분석하고 있어요</p>

        {/* Dynamic Message */}
        <div className="h-8 mb-8">
          <p
            key={messageIndex}
            className="text-primary font-medium animate-fade-in"
          >
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-400 mt-2">{Math.round(progress)}% 완료</p>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
