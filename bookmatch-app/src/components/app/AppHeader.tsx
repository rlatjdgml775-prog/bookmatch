"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronLeft, Share2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AppHeaderVariant = "logo-actions" | "back-share" | "back-only";

export interface AppHeaderProps {
  variant: AppHeaderVariant;
  /** back 버튼 옆에 표시할 텍스트 (선택) */
  backLabel?: string;
  /** 가운데 타이틀 (선택) */
  title?: string;
  /** 공유 버튼 클릭 (선택) */
  onShare?: () => void;
  /** 우측 아바타 텍스트(기본: '책') */
  avatarText?: string;
  /** 알림 dot 표시 */
  showNotificationDot?: boolean;
}

export function AppHeader({
  variant,
  backLabel = "뒤로",
  title,
  onShare,
  avatarText = "책",
  showNotificationDot = false,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        {variant === "logo-actions" ? (
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="BookMatch"
              width={124}
              height={28}
              className="h-7 w-auto"
              draggable={false}
              priority={false}
            />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-primary"
          >
            <ChevronLeft className="h-6 w-6" />
            <span>{backLabel}</span>
          </button>
        )}

        {title ? (
          <div className="flex-1 px-3 text-center font-bold">{title}</div>
        ) : (
          <div className="flex-1" />
        )}

        {variant === "logo-actions" ? (
          <div className="flex items-center gap-4">
            <button type="button" className="relative text-gray-400 transition hover:text-gray-600">
              <Bell className="h-6 w-6" />
              {showNotificationDot ? (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
              ) : null}
            </button>
            <Link
              href="/mypage"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
            >
              {avatarText}
            </Link>
          </div>
        ) : variant === "back-share" ? (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onShare}
              className="text-gray-400 hover:text-gray-600"
            >
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

