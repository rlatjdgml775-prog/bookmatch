'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { READING_TYPES } from '@/data';
import type { ReadingMBTIType } from '@/types';

export default function LandingPage() {
  const [isTypesModalOpen, setIsTypesModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ReadingMBTIType | null>(null);

  const previewTypes = useMemo<ReadingMBTIType[]>(
    () => ['DELF', 'DELS', 'DERF', 'DESF', 'DLRF', 'DLRS'],
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/logo.png" alt="BookMatch" width={124} height={32} className="h-8 w-auto" />
          </Link>
          <Link href="/login" className="text-sm text-muted-foreground transition hover:text-primary">
            로그인
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 [background:linear-gradient(180deg,_#E8F4FD_0%,_#D4ECFD_50%,_#C7E5FD_100%)]">
        <div className="mx-auto max-w-md px-6 pb-8 pt-10 text-center">
          <Image
            src="/assets/hero-characters.png"
            alt="BookMatch 캐릭터"
            width={520}
            height={260}
            priority
            className="mx-auto mb-8 h-auto w-[80vw] max-w-[260px] select-none"
            draggable={false}
          />

          <h1 className="mb-3 text-[40px] font-black leading-tight text-foreground">
            90초 만에 찾는
            <br />
            <span>나만의 책</span>
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            평점 입력 없이, 당신의 독서 성향을 분석해
            <br />
            딱 맞는 책 3권을 추천해드려요
          </p>

          <Link href="/signup" className="inline-flex w-full max-w-xs">
            <Button className="h-auto w-full rounded-xl py-4 text-base font-semibold shadow-lg shadow-primary/30 hover:bg-blue-600">
              무료로 시작하기
            </Button>
          </Link>
          <p className="mt-3 text-xs text-gray-400">가입만 하면 바로 테스트 시작</p>
        </div>
      </section>

      {/* Why BookMatch Section */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-md px-6">
          <Image
            src="/assets/why-bookmatch.png"
            alt="왜 BookMatch인가요?"
            width={96}
            height={96}
            className="mx-auto mb-4 h-auto w-24 select-none"
            draggable={false}
          />
          <h2 className="mb-6 text-center text-[23px] font-bold">
            왜 <span className="text-primary">BookMatch</span>인가요?
          </h2>

          <div className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-0">
            <div className="min-w-[260px] flex-shrink-0 snap-center rounded-2xl border border-slate-900/5 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:min-w-0">
              <div className="mb-3 text-xl font-extrabold">즉시추천</div>
              <p className="text-sm leading-relaxed text-slate-600">
                90초 테스트로 바로
                <br />
                맞춤 추천
              </p>
            </div>

            <div className="min-w-[260px] flex-shrink-0 snap-center rounded-2xl border border-slate-900/5 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:min-w-0">
              <div className="mb-3 text-xl font-extrabold">딱 3권</div>
              <p className="text-sm leading-relaxed text-slate-600">
                선택 피로 없이
                <br />
                핵심만 추천
              </p>
            </div>

            <div className="min-w-[260px] flex-shrink-0 snap-center rounded-2xl border border-slate-900/5 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:min-w-0">
              <div className="mb-3 text-xl font-extrabold">독서 회고</div>
              <p className="text-sm leading-relaxed text-slate-600">
                선택 피로 없이 핵심만
                <br />
                추천
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Types Section */}
      <section className="bg-gray-50 py-10">
        <div className="mx-auto max-w-md px-6">
          <Image
            src="/assets/reading-types.png"
            alt="16가지 독서 유형"
            width={80}
            height={80}
            className="mx-auto mb-4 h-auto w-20 select-none"
            draggable={false}
          />
          <h2 className="mb-2 text-center text-[23px] font-bold">
            16가지 독서 유형
          </h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">나는 어떤 독서가일까?</p>

          <div className="grid grid-cols-2 gap-3">
            {previewTypes.map((type) => {
              const info = READING_TYPES[type];
              return (
                <button
                  key={type}
                  type="button"
                  className="relative rounded-2xl border border-slate-900/5 bg-white px-3 pb-4 pt-9 text-center shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
                  onClick={() => {
                    setSelectedType(type);
                    setIsTypesModalOpen(true);
                  }}
                >
                  <span className="absolute left-2.5 top-2.5 text-[18px] leading-none">{info.emoji}</span>
                  <div className="mb-1 text-[34px] font-extrabold tracking-wide text-slate-900">{type}</div>
                  <div className="text-sm font-semibold text-slate-700">{info.shortTitle}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsTypesModalOpen(true)}
              className="text-sm font-medium text-primary hover:underline"
            >
              + 10개 더 보기
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-blue-500 py-12 text-white">
        <div className="mx-auto max-w-md px-6 text-center">
          <h2 className="mb-3 text-xl font-bold">
            지금 바로 나의
            <br />
            독서 유형을 알아보세요
          </h2>
          <p className="mb-6 text-sm text-blue-100">90초면 충분해요!</p>
          <Link href="/test/start" className="inline-flex w-full max-w-xs">
            <Button className="h-auto w-full rounded-xl bg-white py-4 text-base font-semibold text-primary hover:bg-gray-100">
              테스트 시작하기
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-slate-600">
        <div className="mx-auto max-w-md px-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Image src="/assets/logo.png" alt="BookMatch" width={124} height={28} className="h-7 w-auto" />
          </div>
          <div className="mb-4 flex justify-center gap-6 text-xs">
            <a href="#" className="transition hover:text-primary">
              이용약관
            </a>
            <a href="#" className="transition hover:text-primary">
              개인정보처리방침
            </a>
            <a href="#" className="transition hover:text-primary">
              고객센터
            </a>
          </div>
          <div className="text-center text-xs">© 2024 BookMatch. All rights reserved.</div>
        </div>
      </footer>

      {/* 16 Types Modal */}
      <Dialog open={isTypesModalOpen} onOpenChange={setIsTypesModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>📚</span> 16가지 독서 유형
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {Object.values(READING_TYPES).map((typeInfo) => (
              <button
                key={typeInfo.name}
                type="button"
                className={`relative rounded-2xl border border-slate-900/5 bg-white px-3 pb-3 pt-8 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  selectedType === typeInfo.name ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedType(typeInfo.name)}
              >
                <span className="absolute left-2.5 top-2.5 text-[18px] leading-none">{typeInfo.emoji}</span>
                <div className="text-[28px] font-extrabold tracking-wide text-slate-900">{typeInfo.name}</div>
                <p className="text-xs font-semibold text-slate-700">{typeInfo.shortTitle}</p>
              </button>
            ))}
          </div>

          {selectedType && (
            <Card className="mt-4 p-4 bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{READING_TYPES[selectedType].emoji}</span>
                <div>
                  <span className="font-bold text-primary">{selectedType}</span>
                  <p className="text-sm text-gray-600">{READING_TYPES[selectedType].shortTitle}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {READING_TYPES[selectedType].description}
              </p>
            </Card>
          )}

          <div className="mt-6 text-center">
            <Link href="/test/start">
              <Button className="rounded-full px-8">내 유형 알아보기 →</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
