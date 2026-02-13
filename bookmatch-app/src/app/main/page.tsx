"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Mic, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/app/AppHeader";
import { BottomNav } from "@/components/app/BottomNav";
import { useUserStore } from "@/store";
import { useBookStore } from "@/store";
import { getBookById, getBooksByMBTI, SAMPLE_BOOKS } from "@/data";
import { READING_TYPES } from "@/data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

function bookSubtitle(book: Book) {
  return book.author ? `저자 ${book.author}` : "추천 도서";
}

function parseDateMs(value: unknown): number {
  if (value instanceof Date) return value.getTime();
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? 0 : d.getTime();
  }
  return 0;
}

export default function MainPage() {
  const { user } = useUserStore();
  const { readingRecords, wishlist, getReadingStats } = useBookStore();

  const nickname = user?.nickname ?? "독서왕";
  const mbti = (user?.mbtiType ?? "DELF") as ReadingMBTIType;
  const mbtiTitle = READING_TYPES[mbti]?.title ?? READING_TYPES.DELF.title;

  const [query, setQuery] = useState("");

  const recommendations = useMemo(() => {
    const base = getBooksByMBTI(mbti);
    const ids = new Set<string>();
    const result: Book[] = [];

    for (const b of base) {
      if (result.length >= 3) break;
      if (ids.has(b.id)) continue;
      ids.add(b.id);
      result.push(b);
    }

    if (result.length < 3) {
      const fill = SAMPLE_BOOKS
        .filter((b) => !ids.has(b.id))
        .slice()
        .sort((a, b) => b.rating - a.rating);

      for (const b of fill) {
        if (result.length >= 3) break;
        ids.add(b.id);
        result.push(b);
      }
    }

    return result.slice(0, 3);
  }, [mbti]);

  const completedRecords = useMemo(() => {
    return readingRecords
      .filter((r) => r.status === "completed")
      .slice()
      .sort((a, b) => parseDateMs((b as any).endDate) - parseDateMs((a as any).endDate));
  }, [readingRecords]);

  const stats = getReadingStats();
  const completed = stats.completedBooks || 5;

  const recentBooks = useMemo(() => {
    // 실제 기록이 있으면 최근 5권을 사용, 없으면 데모용으로 샘플 상위 5권을 노출
    const ids = new Set<string>();
    const result: Book[] = [];

    for (const r of completedRecords) {
      const b = getBookById(r.bookId);
      if (!b) continue;
      if (ids.has(b.id)) continue;
      ids.add(b.id);
      result.push(b);
      if (result.length >= 5) break;
    }

    if (result.length < 5) {
      const fill = SAMPLE_BOOKS
        .filter((b) => !ids.has(b.id))
        .slice()
        .sort((a, b) => b.rating - a.rating);
      for (const b of fill) {
        result.push(b);
        if (result.length >= 5) break;
      }
    }

    return result.slice(0, 5);
  }, [completedRecords]);

  const currentMonthCount = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const count = readingRecords.filter((r) => {
      if (r.status !== "completed") return false;
      const t = parseDateMs((r as any).endDate);
      if (!t) return false;
      const d = new Date(t);
      return d.getFullYear() === y && d.getMonth() === m;
    }).length;
    return count || 2;
  }, [readingRecords]);

  return (
    <div className="bg-background text-foreground pb-20">
      <AppHeader variant="logo-actions" showNotificationDot avatarText={nickname.charAt(0)} />

      <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 lg:max-w-4xl">
        {/* Greeting */}
        <section className="mb-4">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {nickname}님은 <span className="text-primary">{mbti}</span>형 👋
          </h1>
          <p className="mt-1 text-sm text-gray-600">"{mbtiTitle}"</p>
        </section>

        {/* Search */}
        <section className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm ring-1 ring-gray-200">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="책 제목이나 저자를 검색하세요"
                className="h-6 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
              />
              <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-gray-600">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-full bg-white text-gray-500 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-5">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-extrabold">당신을 위한 추천</h2>
              <p className="mt-1 text-sm text-gray-500">{mbti}형 맞춤 도서 3권</p>
            </div>
            <Link href="/recommend" className="text-sm text-gray-600 hover:underline">
              전체 보기 &gt;
            </Link>
          </div>

          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 pr-8 snap-x snap-mandatory scroll-px-4 touch-pan-x">
            {recommendations.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`} className="w-[168px] flex-shrink-0 snap-start">
                <Card className="rounded-2xl border-0 bg-white p-3 shadow-sm">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
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
                        <span className="text-5xl">{book.emoji ?? "📘"}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <p className="truncate text-sm font-bold">{book.title}</p>
                    <p className="truncate text-xs text-gray-500">{bookSubtitle(book)}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <Link href="/recommend" className="mt-4 block">
            <Button className="h-14 w-full rounded-full bg-sky-500 text-lg font-bold hover:bg-sky-600">
              추천 받기
            </Button>
          </Link>
        </section>

        {/* Recent Reads */}
        <section className="mt-6">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-extrabold">최근 읽은 책</h2>
              <p className="mt-1 text-sm text-gray-500">{completed}권</p>
            </div>
            <Link href="/reading-history" className="text-sm text-gray-600 hover:underline">
              전체 보기 &gt;
            </Link>
          </div>

          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 pr-8 snap-x snap-mandatory scroll-px-4 touch-pan-x">
            {recentBooks.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`} className="w-[260px] flex-shrink-0 snap-start">
                <Card className="overflow-hidden rounded-2xl border-0 bg-white shadow-sm">
                  <div className="aspect-[3/2] w-full overflow-hidden bg-white px-3 py-2">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="h-full w-full rounded-xl object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-b ${coverGradientClass(
                          book
                        )}`}
                      >
                        <span className="text-7xl">{book.emoji ?? "📘"}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-bold">{book.title}</p>
                    <p className="text-sm text-gray-500">{bookSubtitle(book)}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Reading Stats (Bottom) */}
        <section className="mt-8 -mx-4 bg-sky-50/70 px-4 py-6">
          <h2 className="text-xl font-extrabold text-slate-900">나의 독서 현황</h2>

          <div className="mt-6 grid grid-cols-3 gap-5">
            <Card className="rounded-3xl border-0 bg-white p-6 text-center shadow-[0_10px_22px_rgba(15,23,42,0.10)]">
              <p className="text-sm font-semibold text-slate-400">읽은 책</p>
              <p className="-mt-[10px] text-4xl font-extrabold leading-none text-blue-600">{completed}권</p>
            </Card>
            <Card className="rounded-3xl border-0 bg-white p-6 text-center shadow-[0_10px_22px_rgba(15,23,42,0.10)]">
              <p className="text-sm font-semibold text-slate-400">위시리스트</p>
              <p className="-mt-[10px] text-4xl font-extrabold leading-none text-sky-500">{wishlist.length || 3}권</p>
            </Card>
            <Card className="rounded-3xl border-0 bg-white p-6 text-center shadow-[0_10px_22px_rgba(15,23,42,0.10)]">
              <p className="text-sm font-semibold text-slate-400">이번 달</p>
              <p className="-mt-[10px] text-4xl font-extrabold leading-none text-amber-500">{currentMonthCount}권</p>
            </Card>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

