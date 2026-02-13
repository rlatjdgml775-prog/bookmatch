"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { BottomNav } from "@/components/app/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBooksByMBTI, READING_TYPES } from "@/data";
import { useUserStore, useBookStore } from "@/store";
import type { Book, ReadingMBTIType } from "@/types";

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

export default function RecommendPage() {
  const { user } = useUserStore();
  // selector에서 매번 새 객체를 반환하면 React(useSyncExternalStore) 경고가 발생할 수 있어
  // 필요한 값들을 각각 구독합니다.
  const addToWishlist = useBookStore((s) => s.addToWishlist);
  const isInWishlist = useBookStore((s) => s.isInWishlist);
  const readingRecords = useBookStore((s) => s.readingRecords);
  const hasHydrated = useBookStore((s) => s.hasHydrated);

  const nickname = user?.nickname ?? "책읽는독서가";
  const mbti = (user?.mbtiType ?? "DELF") as ReadingMBTIType;
  const mbtiTitle = READING_TYPES[mbti]?.title ?? READING_TYPES.DELF.title;

  const recommendations = useMemo(() => getBooksByMBTI(mbti), [mbti]);
  const feedbackByBookId = useMemo(() => {
    const map = new Map<string, "like" | "dislike">();
    if (!hasHydrated) return map;
    for (const r of readingRecords) {
      if (r.status === "completed" && (r.feedback === "like" || r.feedback === "dislike")) {
        map.set(r.bookId, r.feedback);
      }
    }
    return map;
  }, [hasHydrated, readingRecords]);

  return (
    <div className="bg-background text-foreground pb-20">
      <AppHeader variant="logo-actions" avatarText={nickname.charAt(0)} />

      <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 lg:max-w-4xl">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-5 text-white shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <h1 className="text-lg font-extrabold">당신을 위한 추천</h1>
          </div>
          <p className="mt-2 text-sm opacity-90">
            <span className="font-bold">{mbti}</span>형 · "{mbtiTitle}"
          </p>
        </div>

        <div className="space-y-4">
          {recommendations.map((book) => {
            const inWishlist = isInWishlist(book.id);
            const feedback = feedbackByBookId.get(book.id) ?? null;
            return (
              <Card key={book.id} className="rounded-2xl bg-white p-5 shadow-md">
                <div className="flex gap-4">
                  <Link href={`/book/${book.id}`} className="flex-shrink-0">
                    <div className="h-28 w-20 overflow-hidden rounded-lg bg-gray-100 shadow-md">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div
                          className={`flex h-full w-full items-center justify-center bg-gradient-to-b ${coverGradientClass(
                            book
                          )}`}
                        >
                          <span className="text-3xl">{book.emoji ?? "📘"}</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link href={`/book/${book.id}`} className="block">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2 className="truncate text-lg font-bold">{book.title}</h2>
                          <p className="text-sm text-gray-500">{book.author}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-end gap-1">
                          <Badge variant="secondary" className="bg-indigo-50 text-primary">
                            추천
                          </Badge>
                          {feedback ? (
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                              평가한 책
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {book.recommendReason ?? "당신의 취향과 잘 맞을 거예요"}
                      </p>
                    </Link>

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addToWishlist(book.id)}
                        disabled={inWishlist}
                        className="w-full min-w-0 overflow-hidden rounded-xl border-primary/40 text-primary hover:bg-primary/5 disabled:opacity-50"
                      >
                        <span className="truncate">
                          {inWishlist ? "저장됨" : (
                            <>
                              <span className="sm:hidden">저장</span>
                              <span className="hidden sm:inline">내 책장에 저장</span>
                            </>
                          )}
                        </span>
                      </Button>
                      <Link href={`/book/${book.id}`} className="min-w-0 block">
                        <Button className="w-full rounded-xl bg-primary px-4 text-sm font-semibold hover:bg-indigo-700 sm:text-base">
                          <span className="whitespace-nowrap">상세보기</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

