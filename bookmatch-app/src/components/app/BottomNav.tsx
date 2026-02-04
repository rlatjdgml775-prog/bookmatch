"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  emoji: string;
  /** 해당 경로로 시작하면 active로 처리 (예: /wishlist, /book) */
  activeStartsWith?: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/main", label: "홈", emoji: "🏠", activeStartsWith: "/main" },
  { href: "/wishlist", label: "위시리스트", emoji: "❤️", activeStartsWith: "/wishlist" },
  { href: "/reading-history", label: "기록", emoji: "📚", activeStartsWith: "/reading-history" },
  { href: "/mypage", label: "마이", emoji: "👤", activeStartsWith: "/mypage" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-2xl">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.activeStartsWith ? pathname.startsWith(item.activeStartsWith) : false);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 py-3 text-center text-gray-400 transition hover:text-primary",
                isActive && "text-primary"
              )}
            >
              <span className="block text-xl">{item.emoji}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

