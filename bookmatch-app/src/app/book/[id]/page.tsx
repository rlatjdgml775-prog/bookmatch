"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AppHeader } from "@/components/app/AppHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBookStore, useUserStore } from "@/store";
import { getBookById } from "@/data";
import type { Book, BookEvaluation, ReadingMBTIType } from "@/types";

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

export default function BookDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useUserStore();
  const { addToWishlist, isInWishlist, evaluateBook, getBookFeedback } = useBookStore();

  const book = useMemo(() => getBookById(params.id), [params.id]);
  const mbti = (user?.mbtiType ?? "DELF") as ReadingMBTIType;
  const inWishlist = book ? isInWishlist(book.id) : false;
  const feedback = book ? getBookFeedback(book.id) : null;

  const [evaluationOpen, setEvaluationOpen] = useState(false);

  const submitEvaluation = (evaluation: Exclude<BookEvaluation, "skip">) => {
    if (!book) return;
    evaluateBook(book.id, evaluation);
    setEvaluationOpen(false);
  };

  const handleShare = async () => {
    if (!book) return;
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = `${book.title} - BookMatch`;
    const text = `${book.title}를 추천합니다!`;

    // Web Share API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav: any = navigator;
    if (nav?.share) {
      try {
        await nav.share({ title, text, url });
        return;
      } catch {
        // ignore
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      // 토스트는 전역 sonner가 있지만, 간단히 무시(디자인만)
    } catch {
      // ignore
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <AppHeader variant="back-only" backLabel="뒤로" />
        <main className="mx-auto max-w-2xl px-4 py-8">
          <h1 className="text-xl font-bold">책을 찾을 수 없어요</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader variant="back-share" backLabel="뒤로" onShare={handleShare} />

      <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:max-w-4xl">
        {/* Cover */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-56 w-40 overflow-hidden rounded-xl bg-gray-100 shadow-xl">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-b ${coverGradientClass(book)}`}
              >
                <span className="text-6xl">{book.emoji ?? "📘"}</span>
              </div>
            )}
          </div>
          <h1 className="mb-1 text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-500">
            {book.author} 지음 · {book.publisher}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 text-gray-500">
            <span>⭐ {book.rating.toFixed(1)}</span>
            <span>·</span>
            <span>{book.pages}p</span>
            <span>·</span>
            <span>{book.year}.03.31</span>
          </div>
        </div>

        {/* Match Badge */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <span className="font-bold">성향 일치</span>
              <p className="text-sm opacity-90">
                "당신의 {mbti}형 성향과 87% 일치해요.
                <br />
                따뜻한 감동을 찾는 당신에게 딱 맞는 책이에요"
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>📖</span>
            <span>책 소개</span>
          </h2>
          <div className="mb-4 h-px bg-gray-200" />
          <p className="leading-relaxed text-gray-600">{book.description}</p>
          <button type="button" className="mt-3 text-sm font-medium text-primary hover:underline">
            더보기
          </button>
        </div>

        {/* Keywords */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>🏷️</span>
            <span>키워드</span>
          </h2>
          <div className="mb-4 h-px bg-gray-200" />
          <div className="flex flex-wrap gap-2">
            {book.keywords.slice(0, 6).map((k) => (
              <span
                key={k}
                className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-primary"
              >
                #{k}
              </span>
            ))}
          </div>
        </div>

        {/* Book Info */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>📊</span>
            <span>도서 정보</span>
          </h2>
          <div className="mb-4 h-px bg-gray-200" />
          <div className="space-y-3">
            <div className="flex">
              <span className="w-24 text-gray-500">카테고리</span>
              <span>
                {book.category} &gt; {book.genre}
              </span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-500">페이지</span>
              <span>{book.pages}쪽</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-500">출판일</span>
              <span>{book.year}년 3월 31일</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-500">ISBN</span>
              <span>9788936434267</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-500">정가</span>
              <span>12,000원</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => addToWishlist(book.id)}
            disabled={inWishlist}
            className={`min-w-0 flex-1 rounded-xl border-2 py-3 text-sm font-semibold transition sm:py-4 sm:text-base ${
              inWishlist
                ? "border-gray-300 text-gray-400"
                : "border-primary text-primary hover:bg-indigo-50"
            }`}
          >
            <span className="inline-flex min-w-0 items-center justify-center gap-2">
              <span className="hidden sm:inline">{inWishlist ? "💖" : "❤️"}</span>
              <span className="truncate">{inWishlist ? "추가됨" : "위시리스트 추가"}</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setEvaluationOpen(true)}
            disabled={!!feedback}
            className={`min-w-0 flex-1 rounded-xl py-3 text-sm font-semibold text-white transition sm:py-4 sm:text-base ${
              feedback ? "bg-gray-300" : "bg-primary hover:bg-indigo-700"
            }`}
          >
            <span className="inline-flex min-w-0 items-center justify-center gap-2">
              {feedback === "like" ? (
                <>
                  <span className="hidden sm:inline">👍</span>
                  <span className="truncate">좋았어요</span>
                </>
              ) : feedback === "dislike" ? (
                <>
                  <span className="hidden sm:inline">👎</span>
                  <span className="truncate">별로예요</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">✅</span>
                  <span className="truncate">읽었어요</span>
                </>
              )}
            </span>
          </button>
        </div>
      </main>

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

