"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/app/AppHeader";
import { BottomNav } from "@/components/app/BottomNav";
import { useUserStore } from "@/store";
import { useBookStore } from "@/store";
import { getBooksByMBTI } from "@/data";
import { READING_TYPES } from "@/data";
import type { Book, BookEvaluation, ReadingMBTIType } from "@/types";

type RecommendationBadge = {
  label: string;
  className: string;
};

const BADGES: RecommendationBadge[] = [
  { label: "1️⃣ 성향 일치", className: "bg-indigo-100 text-primary" },
  { label: "2️⃣ 독자 만족", className: "bg-emerald-100 text-secondary" },
  { label: "3️⃣ 새로운 발견", className: "bg-amber-100 text-accent" },
];

const EXPLAINS = [
  {
    className: "bg-indigo-50",
    text: `💬 "당신이 좋아할 만한 따뜻한 성장 이야기예요. DELF형이 선호하는 '공감'과 '감동' 키워드가 87% 일치해요"`,
  },
  {
    className: "bg-emerald-50",
    text: `💬 "95%의 독자가 '감동적'이라고 평가했어요. 따뜻한 위로가 필요할 때 추천드려요"`,
  },
  {
    className: "bg-amber-50",
    text: `💬 "평소와 다른 장르지만, 당신이 좋아하는 '힐링'과 '따뜻함'이 담긴 책이에요. 새로운 발견이 될 거예요!"`,
  },
];

function formatYear(book: Book) {
  return book.year;
}

function coverGradientClass(book: Book) {
  const c = book.coverColor ?? "orange";
  const map: Record<string, string> = {
    orange: "from-orange-100 to-orange-200",
    blue: "from-blue-100 to-blue-200",
    green: "from-green-100 to-green-200",
    red: "from-red-100 to-red-200",
    yellow: "from-yellow-100 to-yellow-200",
    purple: "from-purple-100 to-purple-200",
    indigo: "from-indigo-100 to-indigo-200",
    teal: "from-teal-100 to-teal-200",
    amber: "from-amber-100 to-amber-200",
  };
  return map[c] ?? "from-slate-100 to-slate-200";
}

export default function MainPage() {
  const { user } = useUserStore();
  const { wishlist, addToWishlist, isInWishlist, evaluateBook, getReadingStats } = useBookStore();

  const nickname = user?.nickname ?? "책읽는독서가";
  const mbti = (user?.mbtiType ?? "DELF") as ReadingMBTIType;
  const mbtiTitle = READING_TYPES[mbti]?.title ?? READING_TYPES.DELF.title;

  const recommendations = useMemo(() => getBooksByMBTI(mbti).slice(0, 3), [mbti]);
  const stats = getReadingStats();

  const [evaluationOpen, setEvaluationOpen] = useState(false);
  const [evaluationBookId, setEvaluationBookId] = useState<string | null>(null);

  const openEvaluation = (bookId: string) => {
    setEvaluationBookId(bookId);
    setEvaluationOpen(true);
  };

  const submitEvaluation = (evaluation: Exclude<BookEvaluation, "skip">) => {
    if (!evaluationBookId) return;
    evaluateBook(evaluationBookId, evaluation);
    setEvaluationOpen(false);
    setEvaluationBookId(null);
  };

  return (
    <div className="bg-background text-foreground pb-20">
      <AppHeader variant="logo-actions" showNotificationDot avatarText={nickname.charAt(0)} />

      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-xl font-bold">안녕하세요, {nickname}님! 📚</h1>

          <div className="mt-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span>🔮</span>
                  <span className="font-bold">
                    당신은 <span className="font-extrabold">{mbti}</span>형
                  </span>
                </div>
                <p className="text-sm opacity-90">"{mbtiTitle}"</p>
              </div>
              <Link href="/test/result" className="text-sm opacity-75 transition hover:opacity-100">
                유형 다시보기 &gt;
              </Link>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <section className="mb-8">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-bold">
            <span>✨</span>
            <span>오늘의 맞춤 추천</span>
          </h2>
          <p className="mb-4 text-sm text-gray-500">{mbti}형인 당신을 위해 엄선한 3권이에요</p>

          <div className="space-y-4">
            {recommendations.map((book, idx) => {
              const badge = BADGES[idx] ?? BADGES[0];
              const explain = EXPLAINS[idx] ?? EXPLAINS[0];
              const inWishlist = isInWishlist(book.id);

              return (
                <div key={book.id} className="rounded-2xl bg-white p-5 shadow-md">
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`rounded px-2 py-1 text-xs font-bold ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <Link href={`/book/${book.id}`} className="flex-shrink-0">
                      <div
                        className={`flex h-32 w-24 items-center justify-center rounded-lg bg-gradient-to-b shadow-md ${coverGradientClass(
                          book
                        )}`}
                      >
                        <span className="text-4xl">{book.emoji ?? "📘"}</span>
                      </div>
                    </Link>

                    <div className="flex-1">
                      <Link href={`/book/${book.id}`} className="block">
                        <h3 className="text-lg font-bold">{book.title}</h3>
                        <p className="text-sm text-gray-500">
                          {book.author} · {book.publisher} · {formatYear(book)}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                          <span>⭐ {book.rating.toFixed(1)}</span>
                          <span>·</span>
                          <span>{book.pages}페이지</span>
                          <span>·</span>
                          <span>{book.category}</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className={`mt-4 rounded-xl p-3 ${explain.className}`}>
                    <p className="text-sm text-gray-600">{explain.text}</p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => addToWishlist(book.id)}
                      disabled={inWishlist}
                      className={`flex-1 rounded-xl border-2 py-3 font-medium transition ${
                        inWishlist
                          ? "border-gray-300 text-gray-400"
                          : "border-primary text-primary hover:bg-indigo-50"
                      }`}
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <span>{inWishlist ? "💖" : "❤️"}</span>
                        <span>{inWishlist ? "추가됨" : "위시리스트"}</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openEvaluation(book.id)}
                      className="flex-1 rounded-xl bg-primary py-3 font-medium text-white transition hover:bg-indigo-700"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <span>✅</span>
                        <span>읽었어요</span>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Reading Stats */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>📊</span>
            <span>나의 독서 현황</span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <Link href="/reading-history" className="rounded-xl bg-white p-4 text-center shadow-sm transition hover:shadow-md">
              <p className="mb-1 text-sm text-gray-500">읽은 책</p>
              <p className="text-2xl font-bold text-primary">{stats.completedBooks || 5}권</p>
            </Link>
            <Link href="/wishlist" className="rounded-xl bg-white p-4 text-center shadow-sm transition hover:shadow-md">
              <p className="mb-1 text-sm text-gray-500">위시리스트</p>
              <p className="text-2xl font-bold text-secondary">{wishlist.length || 3}권</p>
            </Link>
            <div className="rounded-xl bg-white p-4 text-center shadow-sm">
              <p className="mb-1 text-sm text-gray-500">이번 달</p>
              <p className="text-2xl font-bold text-accent">2권</p>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />

      {/* Evaluation Modal */}
      <Dialog open={evaluationOpen} onOpenChange={setEvaluationOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">📖 독서 완료!</DialogTitle>
          </DialogHeader>

          <div className="text-center">
            <p className="mb-4 text-gray-600">이 책은 어떠셨나요?</p>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => submitEvaluation("like")}
                className="flex-1 bg-indigo-50 text-foreground hover:bg-indigo-100"
                variant="secondary"
              >
                <span className="mr-2 text-2xl">👍</span>
                좋았어요
              </Button>
              <Button
                type="button"
                onClick={() => submitEvaluation("dislike")}
                className="flex-1 bg-gray-50 text-foreground hover:bg-gray-100"
                variant="secondary"
              >
                <span className="mr-2 text-2xl">👎</span>
                별로예요
              </Button>
            </div>
            <p className="mt-4 text-xs text-gray-400">💡 평가를 남기면 더 정확한 추천을 받을 수 있어요!</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

