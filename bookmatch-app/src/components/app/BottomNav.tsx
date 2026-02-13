"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ICON_BASE = "/assets/nav/v2026-02-10-01";

type NavItem = {
  href: string;
  label: string;
  iconSrcActive: string;
  iconSrcInactive: string;
  /** 해당 경로로 시작하면 active로 처리 (예: /wishlist, /book) */
  activeStartsWith?: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/main",
    label: "홈",
    iconSrcActive: `${ICON_BASE}/nav-home-active.png`,
    iconSrcInactive: `${ICON_BASE}/nav-home-inactive.png`,
    activeStartsWith: "/main",
  },
  {
    href: "/recommend",
    label: "추천",
    iconSrcActive: `${ICON_BASE}/nav-recommend-active.png`,
    iconSrcInactive: `${ICON_BASE}/nav-recommend-inactive.png`,
    activeStartsWith: "/recommend",
  },
  {
    href: "/reading-history",
    label: "내 책장",
    iconSrcActive: `${ICON_BASE}/nav-library-active.png`,
    iconSrcInactive: `${ICON_BASE}/nav-library-inactive.png`,
    activeStartsWith: "/reading-history",
  },
  {
    href: "/mypage",
    label: "MY",
    iconSrcActive: `${ICON_BASE}/nav-my-active.png`,
    iconSrcInactive: `${ICON_BASE}/nav-my-inactive.png`,
    activeStartsWith: "/mypage",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-2xl sm:px-6 lg:max-w-4xl">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.activeStartsWith ? pathname.startsWith(item.activeStartsWith) : false);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-center text-gray-400 transition hover:text-primary",
                isActive && "text-primary"
              )}
            >
              <img
                src={isActive ? item.iconSrcActive : item.iconSrcInactive}
                alt={item.label}
                width={28}
                height={28}
                className={cn("h-7 w-7 object-contain", !isActive && "opacity-90")}
                loading="eager"
                decoding="async"
              />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

