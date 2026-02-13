import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { StoreHydration } from "@/components/app/StoreHydration";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BookMatch - 당신만을 위한 책 추천",
  description: "AI 기반 독서 성향 분석으로 당신에게 딱 맞는 책을 추천해드립니다. 독서 MBTI 테스트로 16가지 독서 유형을 확인해보세요.",
  keywords: ["책 추천", "독서 MBTI", "AI 책 추천", "독서 성향", "BookMatch"],
  authors: [{ name: "BookMatch Team" }],
  openGraph: {
    title: "BookMatch - 당신만을 위한 책 추천",
    description: "AI 기반 독서 성향 분석으로 당신에게 딱 맞는 책을 추천해드립니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased bg-background`}>
        <StoreHydration>{children}</StoreHydration>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}