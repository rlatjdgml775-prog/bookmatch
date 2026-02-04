"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { BottomNav } from "@/components/app/BottomNav";
import { useBookStore, useUserStore } from "@/store";
import { getBookById } from "@/data";
import type { Book, ReadingRecord } from "@/types";
import { cn } from "@/lib/utils";

type FilterType = "all" | "like" | "dislike";

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

function monthLabel(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return `${y}년 ${m}월`;
}

function formatDateDot(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

type DisplayRecord = {
  record: ReadingRecord;
  book: Book;
  date: Date;
};

const FALLBACK: Array<{
  bookId: string;
  feedback: "like" | "dislike";
  date: string; // yyyy-mm-dd
}> = [
  { bookId: "1", feedback: "like", date: "2024-01-20" },
  { bookId: "9", feedback: "like", date: "2024-01-15" },
  { bookId: "3", feedback: "like", date: "2023-12-28" },
  { bookId: "10", feedback: "dislike", date: "2023-12-20" },
  { bookId: "5", feedback: "like", date: "2023-12-10" },
];

export default function ReadingHistoryPage() {
  const { user } = useUserStore();
  const { readingRecords } = useBookStore();

  const [filter, setFilter] = useState<FilterType>("all");

  const displayRecords = useMemo<DisplayRecord[]>(() => {
    const fromStore = readingRecords
      .filter((r) => r.status === "completed" && !!r.endDate && !!r.feedback)
      .map((r) => {
        const book = getBookById(r.bookId);
        if (!book || !r.endDate) return null;
        return { record: r, book, date: new Date(r.endDate) };
      })
      .filter((x): x is DisplayRecord => !!x);

    if (fromStore.length > 0) return fromStore.sort((a, b) => b.date.getTime() - a.date.getTime());

    // 정적 화면과 동일한 구성(데모)
    return FALLBACK.map((f) => {
      const book = getBookById(f.bookId)!;
      const date = new Date(`${f.date}T00:00:00`);
      const record: ReadingRecord = {
        id: `fallback-${f.bookId}-${f.date}`,
        bookId: f.bookId,
        userId: "",
        status: "completed",
        feedback: f.feedback,
        endDate: date,
      };
      return { record, book, date };
    });
  }, [readingRecords]);

  const filtered = useMemo(() => {
    if (filter === "all") return displayRecords;
    return displayRecords.filter((r) => r.record.feedback === filter);
  }, [displayRecords, filter]);

  const grouped = useMemo(() => {
    const map = new Map<string, DisplayRecord[]>();
    for (const item of filtered) {
      const key = `${item.date.getFullYear()}-${item.date.getMonth() + 1}`;
      const arr = map.get(key) ?? [];
      arr.push(item);
      map.set(key, arr);
    }
    // 최신 월부터
    const entries = Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
    return entries.map(([key, items]) => ({ key, label: monthLabel(items[0]!.date), items }));
  }, [filtered]);

  const total = displayRecords.length || 5;
  const likeCount = displayRecords.filter((r) => r.record.feedback === "like").length || 4;
  const dislikeCount = displayRecords.filter((r) => r.record.feedback === "dislike").length || 1;

  return (
    <div className="bg-background text-foreground pb-20">
      <AppHeader variant="logo-actions" avatarText={(user?.nickname ?? "책읽는독서가").charAt(0)} />

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6">
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <span>📚</span>
            <span>나의 독서 기록</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">총 {total}권의 책을 읽었어요</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 rounded-xl bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition",
              filter === "all" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            전체 {total}
          </button>
          <button
            type="button"
            onClick={() => setFilter("like")}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition",
              filter === "like" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            👍 좋았어요 {likeCount}
          </button>
          <button
            type="button"
            onClick={() => setFilter("dislike")}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition",
              filter === "dislike" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            👎 별로예요 {dislikeCount}
          </button>
        </div>

        {/* Groups */}
        <div className="space-y-8">
          {grouped.map((group) => (
            <section key={group.key}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span>📅</span>
                <span>{group.label}</span>
              </h2>

              <div className="space-y-3">
                {group.items.map(({ book, record, date }) => (
                  <Link
                    key={record.id}
                    href={`/book/${book.id}`}
                    className="block rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex gap-4">
                      <div
                        className={`flex h-[88px] w-16 items-center justify-center rounded-lg bg-gradient-to-b shadow ${coverGradientClass(
                          book
                        )}`}
                      >
                        <span className="text-2xl">{book.emoji ?? "📘"}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold">{book.title}</h3>
                            <p className="text-sm text-gray-500">
                              {book.author} · {book.category}
                            </p>
                          </div>
                          <span className="text-2xl">{record.feedback === "like" ? "👍" : "👎"}</span>
                        </div>
                        <p className="mt-2 text-xs text-gray-400">읽은 날짜: {formatDateDot(date)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

