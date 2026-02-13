"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { BottomNav } from "@/components/app/BottomNav";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useBookStore, useUserStore } from "@/store";
import { READING_TYPES } from "@/data";
import type { ReadingMBTIType } from "@/types";

function formatJoinDate(date: unknown) {
  // zustand persist로 저장된 Date는 복원 시 string이 될 수 있어 런타임 변환이 필요합니다.
  const fallback = new Date("2024-01-01T00:00:00");

  const d =
    date instanceof Date
      ? date
      : typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : fallback;

  const safe = Number.isNaN(d.getTime()) ? fallback : d;

  const y = safe.getFullYear();
  const m = String(safe.getMonth() + 1).padStart(2, "0");
  const day = String(safe.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default function MyPage() {
  const router = useRouter();
  const { user, logout, readingGoal2025, setReadingGoal2025, setReadingGoal2025HasBeenSet } = useUserStore();
  const { wishlist, getReadingStats } = useBookStore();
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [goalDraft, setGoalDraft] = useState<number>(readingGoal2025);

  const nickname = user?.nickname ?? "책읽는독서가";
  const email = user?.email ?? "example@email.com";
  const mbti = (user?.mbtiType ?? "DELF") as ReadingMBTIType;
  const mbtiTitle = READING_TYPES[mbti]?.title ?? READING_TYPES.DELF.title;

  const stats = getReadingStats();
  const goal = readingGoal2025;
  const currentMonthCount = 2;
  const completed = stats.completedBooks || 24;
  const progressPercent = useMemo(() => Math.min(100, Math.round((currentMonthCount / goal) * 100)), [goal]);
  const isGoalDirty = useMemo(() => goalDraft !== readingGoal2025, [goalDraft, readingGoal2025]);

  useEffect(() => {
    if (!isGoalModalOpen) return;
    setGoalDraft(readingGoal2025);
  }, [isGoalModalOpen, readingGoal2025]);

  return (
    <div className="bg-background text-foreground pb-20">
      <AppHeader variant="logo-actions" avatarText={nickname.charAt(0)} />

      <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 lg:max-w-4xl">
        {/* Profile */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
              {nickname.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold">{nickname}</h2>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>

          <div className="mb-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
            <div className="mb-1 flex items-center gap-2">
              <span>🔮</span>
              <span className="font-bold">
                <span className="font-extrabold">{mbti}</span>형
              </span>
            </div>
            <p className="text-sm opacity-90">"{mbtiTitle}"</p>
          </div>

          <p className="text-xs text-gray-400">가입일: {formatJoinDate(user?.createdAt)}</p>
        </section>

        {/* Reading Stats */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <span>📊</span>
            <span>나의 독서 현황</span>
          </h2>

          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="mb-1 text-sm text-gray-500">읽은 책</p>
              <p className="text-2xl font-bold text-primary">{completed}권</p>
            </div>
            <div className="text-center">
              <p className="mb-1 text-sm text-gray-500">위시리스트</p>
              <p className="text-2xl font-bold text-secondary">{wishlist.length || 3}권</p>
            </div>
            <div className="text-center">
              <p className="mb-1 text-sm text-gray-500">이번 달</p>
              <p className="text-2xl font-bold text-accent">{currentMonthCount}권</p>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>🎯</span>
                <span className="font-medium">2025년 목표: {goal}권</span>
              </div>
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => setIsGoalModalOpen(true)}
              >
                수정
              </button>
            </div>
            <div className="mb-2 h-2 rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="text-xs text-gray-500">
              현재 {currentMonthCount}권 / {goal}권 ({progressPercent}%)
            </p>
          </div>
        </section>

        <Dialog open={isGoalModalOpen} onOpenChange={setIsGoalModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>2025년 독서 목표 설정</DialogTitle>
              <DialogDescription>목표 권수를 수정하고 저장할 수 있어요.</DialogDescription>
            </DialogHeader>

            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setGoalDraft((g) => Math.max(1, g - 1))}
                  aria-label="목표 권수 1 감소"
                >
                  <Minus className="h-5 w-5" />
                </Button>

                <div className="flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-primary tabular-nums">{goalDraft}</span>
                  <span className="pb-1 text-base text-gray-500">권</span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setGoalDraft((g) => g + 1)}
                  aria-label="목표 권수 1 증가"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm font-medium text-gray-700">직접 입력</p>
                <Input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={String(goalDraft)}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^\d]/g, "");
                    const n = raw === "" ? 1 : Number(raw);
                    setGoalDraft(Number.isFinite(n) ? Math.max(1, n) : 1);
                  }}
                  className="h-12 rounded-xl bg-white"
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-center">
              <div className="grid w-full grid-cols-2 gap-3 sm:w-auto">
                <Button type="button" variant="outline" className="h-12 rounded-xl" onClick={() => setIsGoalModalOpen(false)}>
                  취소
                </Button>
                <Button
                  type="button"
                  className="h-12 rounded-xl hover:bg-indigo-700"
                  disabled={!isGoalDirty}
                  onClick={() => {
                    setReadingGoal2025(goalDraft);
                    setReadingGoal2025HasBeenSet(true);
                    setIsGoalModalOpen(false);
                  }}
                >
                  저장
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Menu */}
        <section className="mb-6 overflow-hidden rounded-2xl bg-white shadow-md">
          <h2 className="p-6 pb-3 text-lg font-bold">
            <span className="mr-2">📋</span>메뉴
          </h2>

          <Link href="/reading-history" className="flex items-center justify-between border-b border-gray-100 p-4 transition hover:bg-gray-50">
            <span className="flex items-center gap-3">
              <span>📚</span>
              <span>독서 기록</span>
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/wishlist" className="flex items-center justify-between border-b border-gray-100 p-4 transition hover:bg-gray-50">
            <span className="flex items-center gap-3">
              <span>❤️</span>
              <span>위시리스트</span>
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/monthly-report" className="flex items-center justify-between border-b border-gray-100 p-4 transition hover:bg-gray-50">
            <span className="flex items-center gap-3">
              <span>📊</span>
              <span>월별 리포트 아카이브</span>
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/yearly-report" className="flex items-center justify-between border-b border-gray-100 p-4 transition hover:bg-gray-50">
            <span className="flex items-center gap-3">
              <span>🏆</span>
              <span>연말 결산 아카이브</span>
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/test/result" className="flex items-center justify-between p-4 transition hover:bg-gray-50">
            <span className="flex items-center gap-3">
              <span>🔮</span>
              <span>독서 MBTI 결과 다시보기</span>
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </section>

        {/* Settings */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-md">
          <h2 className="p-6 pb-3 text-lg font-bold">
            <span className="mr-2">⚙️</span>설정
          </h2>

          {[
            { emoji: "👤", label: "프로필 수정" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center justify-between border-b border-gray-100 p-4 text-left transition hover:bg-gray-50 last:border-b-0"
            >
              <span className="flex items-center gap-3">
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          ))}

          <Button
            type="button"
            variant="ghost"
            className="w-full justify-between p-4 text-left text-red-500 hover:bg-gray-50"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <span className="flex items-center gap-3">
              <span>🚪</span>
              <span>로그아웃</span>
            </span>
            <span />
          </Button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

