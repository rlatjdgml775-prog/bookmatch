"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/app/AppHeader";
import { BottomNav } from "@/components/app/BottomNav";
import { useBookStore } from "@/store";
import { getBookById } from "@/data";
import type { Book, BookEvaluation } from "@/types";

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

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, evaluateBook } = useBookStore();

  const items = useMemo(() => {
    return wishlist
      .map((item) => ({ item, book: getBookById(item.bookId) }))
      .filter((x): x is { item: (typeof wishlist)[number]; book: Book } => !!x.book);
  }, [wishlist]);

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
      <AppHeader variant="logo-actions" />

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6">
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <span>❤️</span>
            <span>나의 위시리스트</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">나중에 읽으려고 저장한 책 {Math.max(items.length, 3)}권</p>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-md">
            <div className="mb-4 text-6xl">📚</div>
            <h3 className="mb-2 text-lg font-bold">위시리스트가 비어있어요</h3>
            <p className="mb-6 text-gray-500">메인 화면에서 추천 도서를 확인해보세요!</p>
            <Link href="/main" className="inline-flex">
              <Button className="rounded-xl px-6 py-6 font-medium hover:bg-indigo-700">
                추천 도서 보러가기 →
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(({ item, book }) => (
              <div key={item.id} className="rounded-2xl bg-white p-5 shadow-md">
                <div className="flex gap-4">
                  <Link href={`/book/${book.id}`} className="flex-shrink-0">
                    <div
                      className={`flex h-28 w-20 items-center justify-center rounded-lg bg-gradient-to-b shadow-md ${coverGradientClass(
                        book
                      )}`}
                    >
                      <span className="text-3xl">{book.emoji ?? "📘"}</span>
                    </div>
                  </Link>
                  <div className="flex-1">
                    <Link href={`/book/${book.id}`} className="block">
                      <h3 className="font-bold">{book.title}</h3>
                      <p className="text-sm text-gray-500">
                        {book.author} · {book.publisher}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <span>⭐ {book.rating.toFixed(1)}</span>
                        <span>·</span>
                        <span>{book.pages}p</span>
                        <span>·</span>
                        <span>{book.category}</span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="mt-3 rounded-xl bg-indigo-50 p-3">
                  <p className="text-sm text-gray-600">💬 "{book.recommendReason ?? "당신의 취향과 잘 맞을 거예요"}"</p>
                </div>

                <p className="mt-3 text-xs text-gray-400">
                  추가한 날짜:{" "}
                  {new Date(item.addedAt).toISOString().slice(0, 10).replaceAll("-", ".")}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openEvaluation(book.id)}
                    className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    <span className="inline-flex items-center justify-center gap-1">
                      <span>✅</span>
                      <span>독서완료</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(book.id)}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-200"
                  >
                    <span className="inline-flex items-center justify-center gap-1">
                      <span>🗑️</span>
                      <span>삭제</span>
                    </span>
                  </button>
                  <Link
                    href={`/book/${book.id}`}
                    className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-primary hover:underline"
                  >
                    상세보기 &gt;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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

