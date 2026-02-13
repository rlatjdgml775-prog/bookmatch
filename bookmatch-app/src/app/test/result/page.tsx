'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, ArrowRight, BookOpen } from 'lucide-react';
import { useUserStore } from '@/store';
import { READING_TYPES, getBooksByMBTI, AXIS_DESCRIPTIONS } from '@/data';
import type { ReadingMBTIType } from '@/types';

export default function TestResultPage() {
  const router = useRouter();
  const { user, testAnswers, resetTest } = useUserStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 클라이언트 사이드에서만 렌더링
  if (!isClient) {
    return null;
  }

  const userMBTI = user?.mbtiType || 'DELF';
  const typeInfo = READING_TYPES[userMBTI];
  const recommendedBooks = getBooksByMBTI(userMBTI).slice(0, 3);

  // 축별 점수 계산
  const calculateAxisScores = () => {
    const scores = { D: 0, L: 0, E: 0, Lo: 0, R: 0, F: 0, Fa: 0, S: 0 };

    testAnswers.forEach((answer) => {
      switch (answer.axis) {
        case 'DL':
          if (answer.selectedType === 'D') scores.D++;
          else scores.L++;
          break;
        case 'EL':
          if (answer.selectedType === 'E') scores.E++;
          else scores.Lo++;
          break;
        case 'RF':
          if (answer.selectedType === 'R') scores.R++;
          else scores.F++;
          break;
        case 'FS':
          if (answer.selectedType === 'F') scores.Fa++;
          else scores.S++;
          break;
      }
    });

    return [
      { axis: '몰입도', left: 'Deep', right: 'Light', leftScore: scores.D, rightScore: scores.L },
      { axis: '감성/이성', left: 'Emotional', right: 'Logical', leftScore: scores.E, rightScore: scores.Lo },
      { axis: '현실/상상', left: 'Real', right: 'Fantasy', leftScore: scores.R, rightScore: scores.F },
      { axis: '전개속도', left: 'Fast', right: 'Slow', leftScore: scores.Fa, rightScore: scores.S },
    ];
  };

  const axisScores = calculateAxisScores();

  const getCoverBgClass = (coverColor?: string): string => {
    const map: Record<string, string> = {
      orange: 'bg-orange-100',
      purple: 'bg-purple-100',
      green: 'bg-green-100',
      red: 'bg-red-100',
      yellow: 'bg-yellow-100',
      indigo: 'bg-indigo-100',
      blue: 'bg-blue-100',
      teal: 'bg-teal-100',
      brown: 'bg-amber-100',
      black: 'bg-slate-900 text-white',
    };
    return (coverColor ? map[coverColor] : undefined) ?? 'bg-slate-100';
  };

  const handleRetakeTest = () => {
    resetTest();
    router.push('/test/question');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/90 px-4 py-3 backdrop-blur">
        <Link href="/" className="flex items-center">
          <Image src="/assets/logo.png" alt="BookMatch" width={124} height={28} className="h-7 w-auto" />
        </Link>
        <div className="h-8 w-8" />
      </header>

      <main className="max-w-md mx-auto px-4 py-8">
        {/* Result Card */}
        <Card className="p-6 text-center bg-white/90 backdrop-blur mb-6">
          <p className="text-gray-600 mb-2">당신의 독서 유형은</p>
          <div className="flex justify-center gap-2 mb-3">
            {userMBTI.split('').map((char, idx) => (
              <span
                key={idx}
                className="w-12 h-12 bg-primary text-white text-xl font-bold rounded-lg flex items-center justify-center"
              >
                {char}
              </span>
            ))}
          </div>
          <span className="text-4xl block mb-3">{typeInfo.emoji}</span>
          <h1 className="text-xl font-bold text-primary mb-3">"{typeInfo.title}"</h1>
          <p className="text-gray-600 text-sm whitespace-pre-line">{typeInfo.description}</p>

          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {typeInfo.keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="bg-blue-100 text-primary">
                {keyword}
              </Badge>
            ))}
          </div>

          {/* Genres */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">추천 장르</p>
            <p className="text-primary font-medium">{typeInfo.genres.join(' · ')}</p>
          </div>
        </Card>

        {/* Axis Analysis */}
        <Card className="p-6 bg-white/90 backdrop-blur mb-6">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <span>📊</span> 성향 분석
          </h2>
          <div className="space-y-4">
            {axisScores.map((score, idx) => {
              const total = score.leftScore + score.rightScore;
              const leftPercent = total > 0 ? (score.leftScore / total) * 100 : 50;
              const rightPercent = 100 - leftPercent;
              const isLeftDominant = leftPercent >= rightPercent;
              const dominantPercent = isLeftDominant ? leftPercent : rightPercent;

              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={leftPercent >= 50 ? 'text-primary font-medium' : 'text-gray-500'}>
                      {score.left}
                    </span>
                    <span className="text-gray-400">{score.axis}</span>
                    <span className={leftPercent < 50 ? 'text-primary font-medium' : 'text-gray-500'}>
                      {score.right}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${isLeftDominant ? "bg-gradient-to-r from-primary to-secondary" : "ml-auto bg-gradient-to-l from-primary to-secondary"}`}
                      style={{ width: `${dominantPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recommended Books */}
        <Card className="p-6 bg-white/90 backdrop-blur mb-6">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {userMBTI}형을 위한 맞춤 추천 도서 3권
          </h2>
          <div className="space-y-4">
            {recommendedBooks.map((book, idx) => (
              <div key={book.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                <div
                  className={`w-16 h-20 rounded-lg flex items-center justify-center text-2xl ${getCoverBgClass(
                    book.coverColor
                  )}`}
                >
                  {book.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="h-full w-full object-cover rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    book.emoji
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="outline" className="mb-1 text-xs">
                    #{idx + 1} 추천
                  </Badge>
                  <h3 className="font-bold truncate">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="text-xs text-primary mt-1">{book.recommendReason}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Bottom Actions */}
        <div className="mt-6 space-y-3 pb-4">
          <Link href="/main" className="block">
            <Button className="w-full h-14 rounded-2xl text-lg font-semibold">
              추천 도서 더 보기 <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleRetakeTest}
            className="w-full h-14 rounded-2xl text-lg font-semibold border-primary/40 text-primary hover:bg-primary/5"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            테스트 다시하기
          </Button>
        </div>
      </main>
    </div>
  );
}
