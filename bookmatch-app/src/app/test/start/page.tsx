'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, BookOpen, Sparkles, Target } from 'lucide-react';
import { useUserStore } from '@/store';

export default function TestStartPage() {
  const router = useRouter();
  const { resetTest } = useUserStore();

  const handleStartTest = () => {
    resetTest();
    router.push('/test/question');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Header */}
      <header className="flex items-center px-4 py-3">
        <Link href="/" className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </header>

      <main className="max-w-md mx-auto px-4 py-8 text-center">
        {/* Hero */}
        <div className="mb-8">
          <Image
            src="/assets/hero-characters.png"
            alt="BookMatch 캐릭터"
            width={520}
            height={260}
            className="mx-auto h-auto w-[80vw] max-w-[260px] select-none"
            priority
            draggable={false}
          />
          <h1 className="text-3xl font-bold mt-6 mb-2">독서 MBTI 테스트</h1>
          <p className="text-gray-600">나만의 독서 유형을 알아보세요</p>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 mb-8">
          <Card className="p-4 bg-white/90 backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-bold">약 2분 소요</h3>
                <p className="text-sm text-gray-600">8개의 간단한 질문</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/90 backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-bold">16가지 독서 유형</h3>
                <p className="text-sm text-gray-600">4가지 축으로 분석해요</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/90 backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-bold">맞춤 책 추천</h3>
                <p className="text-sm text-gray-600">유형에 딱 맞는 3권 추천</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Axes Info */}
        <Card className="p-6 bg-white/90 backdrop-blur mb-8">
          <h3 className="font-bold mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            분석하는 4가지 축
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-blue-50 rounded-lg p-3">
              <Badge variant="secondary" className="mb-1">
                D / L
              </Badge>
              <p className="text-gray-600">몰입도</p>
              <p className="text-xs text-gray-500">깊이 vs 가볍게</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <Badge variant="secondary" className="mb-1">
                E / L
              </Badge>
              <p className="text-gray-600">감성/이성</p>
              <p className="text-xs text-gray-500">감정 vs 논리</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <Badge variant="secondary" className="mb-1">
                R / F
              </Badge>
              <p className="text-gray-600">현실/상상</p>
              <p className="text-xs text-gray-500">현실 vs 판타지</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3">
              <Badge variant="secondary" className="mb-1">
                F / S
              </Badge>
              <p className="text-gray-600">전개속도</p>
              <p className="text-xs text-gray-500">빠름 vs 느림</p>
            </div>
          </div>
        </Card>

        {/* Start Button */}
        <Button onClick={handleStartTest} size="lg" className="w-full py-6 text-lg rounded-xl">
          테스트 시작하기 →
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          결과는 저장되며, 언제든 다시 테스트할 수 있어요
        </p>
      </main>
    </div>
  );
}
