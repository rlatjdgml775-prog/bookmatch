"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { Button } from "@/components/ui/button";

export default function YearlyReportPage() {
  const [goal, setGoal] = useState(30);

  const shareReport = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav: any = navigator;
    if (nav?.share) {
      try {
        await nav.share({
          title: "BookMatch - 2024 연말 독서 결산",
          text: "2024년 24권을 읽었어요! 당신의 2024년 독서 결산은?",
          url,
        });
        return;
      } catch {
        // ignore
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      alert("결산 링크가 복사되었습니다!");
    } catch {
      alert("결산 링크를 복사하지 못했어요.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader variant="back-share" backLabel="뒤로" onShare={shareReport} />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">✨ 2024 연말 독서 결산 ✨</h1>
          <p className="mt-2 text-gray-500">
            책읽는독서가님의
            <br />한 해 독서 여정
          </p>
        </div>

        <div className="mb-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-center text-white shadow-xl">
          <p className="mb-2 text-sm opacity-80">2024년 나의 독서</p>
          <div className="mb-4 flex items-center justify-center gap-4">
            <div>
              <p className="text-4xl font-bold">24권</p>
              <p className="text-sm opacity-80">총 권수</p>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div>
              <p className="text-2xl font-bold">DELF형</p>
              <p className="text-sm opacity-80">독서 유형</p>
            </div>
          </div>
          <p className="text-sm opacity-80">📚 BookMatch</p>
        </div>

        {/* Summary */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>📈</span>
            <span>2024년 독서 요약</span>
          </h2>
          <div className="grid grid-cols-4 gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-center">
              <p className="mb-1 text-xs text-gray-500">총 권수</p>
              <p className="text-xl font-bold text-primary">24권</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-center">
              <p className="mb-1 text-xs text-gray-500">총 페이지</p>
              <p className="text-xl font-bold text-secondary">5,760p</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-center">
              <p className="mb-1 text-xs text-gray-500">최고의 달</p>
              <p className="text-xl font-bold text-accent">8월</p>
              <p className="text-xs text-gray-500">(5권)</p>
            </div>
            <div className="rounded-xl bg-rose-50 p-3 text-center">
              <p className="mb-1 text-xs text-gray-500">평균 만족도</p>
              <p className="text-xl font-bold text-rose-500">85%</p>
            </div>
          </div>
        </section>

        {/* Best books */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>🏆</span>
            <span>올해의 책 TOP 3</span>
          </h2>
          <div className="mb-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 p-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🥇</span>
              <div className="flex h-[88px] w-16 items-center justify-center rounded-lg bg-gradient-to-b from-orange-100 to-orange-200 shadow">
                <span className="text-2xl">📕</span>
              </div>
              <div>
                <h3 className="font-bold">아몬드</h3>
                <p className="text-sm text-gray-500">손원평</p>
                <p className="mt-1 text-xs text-amber-600">"올해 가장 큰 감동을 준 책"</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">🥈</span>
                <span className="font-bold">2위</span>
              </div>
              <div className="mx-auto mb-2 flex h-16 w-12 items-center justify-center rounded-lg bg-gradient-to-b from-red-100 to-red-200 shadow">
                <span className="text-xl">📕</span>
              </div>
              <p className="text-center text-sm font-medium">파친코</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">🥉</span>
                <span className="font-bold">3위</span>
              </div>
              <div className="mx-auto mb-2 flex h-16 w-12 items-center justify-center rounded-lg bg-gradient-to-b from-green-100 to-green-200 shadow">
                <span className="text-xl">📗</span>
              </div>
              <p className="text-center text-sm font-medium">불편한 편의점</p>
            </div>
          </div>
        </section>

        {/* Keyword cloud */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>☁️</span>
            <span>올해의 키워드</span>
          </h2>
          <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-6 text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <span className="text-2xl font-bold text-primary">감동</span>
              <span className="text-xl font-semibold text-indigo-400">성장</span>
              <span className="text-lg text-purple-400">치유</span>
              <span className="text-xl font-semibold text-secondary">공감</span>
              <span className="text-lg text-emerald-400">일상</span>
              <span className="text-base text-amber-400">따뜻함</span>
              <span className="text-lg text-rose-400">희망</span>
              <span className="text-base text-blue-400">가족</span>
              <span className="text-sm text-gray-400">사랑</span>
            </div>
          </div>
        </section>

        {/* Goal */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>🎯</span>
            <span>2025년 독서 목표 설정</span>
          </h2>
          <div className="rounded-xl bg-gray-50 p-4 text-center">
            <p className="mb-4 text-gray-600">2025년 목표 권수를 설정해보세요</p>
            <div className="mb-4 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setGoal((g) => Math.max(1, g - 1))}
                className="h-10 w-10 rounded-full bg-gray-200 text-xl transition hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-4xl font-bold text-primary">{goal}</span>
              <span className="text-xl text-gray-400">권</span>
              <button
                type="button"
                onClick={() => setGoal((g) => g + 1)}
                className="h-10 w-10 rounded-full bg-gray-200 text-xl transition hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <p className="mb-4 text-sm text-gray-500">💡 2024년보다 6권 더 많은 도전이에요!</p>
            <Button className="w-full py-6 hover:bg-indigo-700">목표 설정하기</Button>
            <button type="button" className="mt-3 text-sm text-gray-400 hover:underline">
              나중에 설정할게요
            </button>
          </div>
        </section>

        <div className="space-y-3">
          <Button onClick={shareReport} className="w-full gap-2 py-6 shadow-lg hover:bg-indigo-700">
            <span>📤</span>
            <span>결산 공유하기</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2 py-6 border-2 border-primary text-primary hover:bg-indigo-50"
            onClick={() => alert("이미지 저장 기능은 준비 중입니다!")}
          >
            <span>📥</span>
            <span>이미지로 저장하기</span>
          </Button>
        </div>
      </main>
    </div>
  );
}

