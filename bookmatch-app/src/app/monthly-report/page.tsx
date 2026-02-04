"use client";

import { AppHeader } from "@/components/app/AppHeader";
import { Button } from "@/components/ui/button";

export default function MonthlyReportPage() {
  const shareReport = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav: any = navigator;
    if (nav?.share) {
      try {
        await nav.share({
          title: "BookMatch - 2024년 1월 독서 리포트",
          text: "이번 달 3권을 읽고 #감동 #성장 #치유 키워드를 발견했어요!",
          url,
        });
        return;
      } catch {
        // ignore
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      alert("리포트 링크가 복사되었습니다!");
    } catch {
      alert("리포트 링크를 복사하지 못했어요.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader variant="back-share" backLabel="뒤로" onShare={shareReport} />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
            <span>📊</span>
            <span>2024년 1월 독서 리포트</span>
          </h1>
          <p className="mt-2 text-gray-500">
            책읽는독서가님의
            <br />한 달 독서 여정
          </p>
        </div>

        {/* Summary */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>📈</span>
            <span>이번 달 독서 요약</span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-indigo-50 p-4 text-center">
              <p className="mb-1 text-xs text-gray-500">읽은 책</p>
              <p className="text-2xl font-bold text-primary">3권</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4 text-center">
              <p className="mb-1 text-xs text-gray-500">총 페이지</p>
              <p className="text-2xl font-bold text-secondary">720p</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-4 text-center">
              <p className="mb-1 text-xs text-gray-500">만족도</p>
              <p className="text-lg font-bold text-accent">👍 3 👎 0</p>
            </div>
          </div>
        </section>

        {/* Books */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>📚</span>
            <span>이번 달 읽은 책</span>
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[
              { title: "아몬드", emoji: "📕", cls: "from-orange-100 to-orange-200", fb: "👍" },
              { title: "나미야 잡화점", emoji: "📘", cls: "from-blue-100 to-blue-200", fb: "👍" },
              { title: "불편한 편의점", emoji: "📗", cls: "from-green-100 to-green-200", fb: "👍" },
            ].map((b) => (
              <div key={b.title} className="flex-shrink-0 text-center">
                <div
                  className={`mb-2 flex h-28 w-20 items-center justify-center rounded-lg bg-gradient-to-b shadow-md ${b.cls}`}
                >
                  <span className="text-2xl">{b.emoji}</span>
                </div>
                <p className="text-xs font-medium">{b.title}</p>
                <span className="text-lg">{b.fb}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Keywords */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>🏷️</span>
            <span>이번 달 핵심 키워드 TOP 3</span>
          </h2>
          <div className="rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 p-6 text-center">
            <div className="flex justify-center gap-4 text-xl font-bold text-primary">
              <span>#감동</span>
              <span>#성장</span>
              <span>#치유</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            이번 달 당신은 '감동'과 '성장'을 주제로 한
            <br />
            따뜻한 이야기들을 많이 읽으셨네요.
          </p>
        </section>

        {/* Genre */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>📊</span>
            <span>장르 분포</span>
          </h2>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>한국소설</span>
                <span className="text-gray-500">67% (2권)</span>
              </div>
              <div className="h-3 rounded-full bg-gray-200">
                <div className="h-3 rounded-full bg-primary" style={{ width: "67%" }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>일본소설</span>
                <span className="text-gray-500">33% (1권)</span>
              </div>
              <div className="h-3 rounded-full bg-gray-200">
                <div className="h-3 rounded-full bg-secondary" style={{ width: "33%" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Emotion */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>💭</span>
            <span>감정 변화 추이</span>
          </h2>
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between text-center">
              <div>
                <span className="text-3xl">😌</span>
                <p className="mt-1 text-xs text-gray-500">불편한 편의점</p>
              </div>
              <div className="mx-2 h-px flex-1 bg-gray-300" />
              <div>
                <span className="text-3xl">😊</span>
                <p className="mt-1 text-xs text-gray-500">아몬드</p>
              </div>
              <div className="mx-2 h-px flex-1 bg-gray-300" />
              <div>
                <span className="text-3xl">🥹</span>
                <p className="mt-1 text-xs text-gray-500">나미야 잡화점</p>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
              점점 더 깊은 감동을 주는 책을 읽으셨어요
            </p>
          </div>
        </section>

        {/* AI */}
        <section className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>🤖</span>
            <span>AI 코멘트</span>
          </h2>
          <p className="leading-relaxed">
            "이번 달 책읽는독서가님은 따뜻한 감동을 찾아 꾸준히 책을 읽으셨네요! 특히 '아몬드'에서 깊은 인상을 받으신 것 같아요.
            <br />
            <br />
            다음 달에는 비슷한 감성의 '파친코'나 '구의 증명'을 읽어보시는 건 어떨까요?"
          </p>
        </section>

        {/* Next month */}
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>✨</span>
            <span>이번 달 회고를 바탕으로 한 다음 달 추천</span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: "파친코", author: "이민진", emoji: "📕", cls: "from-red-100 to-red-200", tag: "안전한 선택", tagCls: "bg-indigo-100 text-primary" },
              { title: "구의 증명", author: "최진영", emoji: "📘", cls: "from-blue-100 to-blue-200", tag: "깊이있는 도전", tagCls: "bg-emerald-100 text-secondary" },
              { title: "살인자의 기억법", author: "김영하", emoji: "📗", cls: "from-purple-100 to-purple-200", tag: "새로운 시도", tagCls: "bg-amber-100 text-accent" },
            ].map((b) => (
              <div key={b.title} className="text-center">
                <div className={`mb-2 flex aspect-[3/4] w-full items-center justify-center rounded-lg bg-gradient-to-b shadow-md ${b.cls}`}>
                  <span className="text-3xl">{b.emoji}</span>
                </div>
                <h4 className="text-sm font-medium">{b.title}</h4>
                <p className="text-xs text-gray-500">{b.author}</p>
                <span className={`mt-1 inline-block rounded px-2 py-1 text-xs ${b.tagCls}`}>{b.tag}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-gray-50 p-3">
            <p className="text-center text-sm text-gray-600">💬 "이번 달 독서 경험을 바탕으로 추천해요"</p>
          </div>
        </section>

        <div className="space-y-3">
          <Button onClick={shareReport} className="w-full gap-2 py-6 shadow-lg hover:bg-indigo-700">
            <span>📤</span>
            <span>리포트 공유하기</span>
          </Button>
          <a
            href="/main"
            className="block w-full rounded-xl border-2 border-gray-200 bg-white py-4 text-center font-medium text-gray-600 transition hover:bg-gray-50"
          >
            🏠 메인으로 돌아가기
          </a>
        </div>
      </main>
    </div>
  );
}

