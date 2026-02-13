"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store";
import { toast } from "sonner";

export default function MyPageGoalEditPage() {
  const router = useRouter();
  const { readingGoal2025, setReadingGoal2025, setReadingGoal2025HasBeenSet } = useUserStore();
  const [goal, setGoal] = useState<number>(readingGoal2025);

  useEffect(() => {
    setGoal(readingGoal2025);
  }, [readingGoal2025]);

  const isDirty = useMemo(() => goal !== readingGoal2025, [goal, readingGoal2025]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <AppHeader variant="back-only" backLabel="마이페이지" title="목표 수정" />

      <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 lg:max-w-4xl">
        <Card className="rounded-2xl border-0 bg-white p-6 shadow-md">
          <h2 className="text-lg font-bold">2025년 독서 목표</h2>
          <p className="mt-1 text-sm text-gray-600">목표 권수를 수정하고 저장하세요.</p>

          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setGoal((g) => Math.max(1, g - 1))}
                aria-label="목표 권수 1 감소"
              >
                <Minus className="h-5 w-5" />
              </Button>

              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-primary tabular-nums">{goal}</span>
                <span className="pb-1 text-base text-gray-500">권</span>
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setGoal((g) => g + 1)}
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
                value={String(goal)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d]/g, "");
                  const n = raw === "" ? 1 : Number(raw);
                  setGoal(Number.isFinite(n) ? Math.max(1, n) : 1);
                }}
                className="h-12 rounded-xl bg-white"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="h-12 rounded-xl" onClick={() => router.back()}>
              취소
            </Button>
            <Button
              type="button"
              className="h-12 rounded-xl hover:bg-indigo-700"
              disabled={!isDirty}
              onClick={() => {
                setReadingGoal2025(goal);
                setReadingGoal2025HasBeenSet(true);
                toast.success(`2025년 목표를 ${goal}권으로 저장했어요`);
                router.push("/mypage");
              }}
            >
              {isDirty ? "저장" : "저장됨"}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}

