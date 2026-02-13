"use client";

import { useEffect } from "react";
import { useBookStore, useUserStore } from "@/store";

export function StoreHydration({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // zustand persist rehydrate를 클라이언트 마운트 이후로 미뤄
    // SSR HTML과 클라이언트 초기 렌더가 달라져 생기는 hydration 에러를 방지합니다.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useUserStore as any).persist?.rehydrate?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useBookStore as any).persist?.rehydrate?.();
  }, []);

  return children;
}

