'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useUserStore } from '@/store';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useUserStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));

    login(email, '책읽는독서가');
    toast.success('로그인되었습니다!');

    // MBTI 테스트 완료 여부에 따라 분기
    const userState = useUserStore.getState().user;
    if (userState?.completedTest) {
      router.push('/main');
    } else {
      router.push('/test/start');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 border-b bg-white/90 backdrop-blur">
        <Link href="/" className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="flex-1 text-center font-bold">로그인</h1>
        <div className="w-9" />
      </header>

      <main className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Image
            src="/assets/logo.png"
            alt="BookMatch"
            width={160}
            height={40}
            className="mx-auto h-10 w-auto"
            priority
            draggable={false}
          />
          <h2 className="text-2xl font-bold mt-2">다시 만나서 반가워요!</h2>
          <p className="text-gray-600 mt-1">로그인하고 독서를 이어가세요</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span className="text-gray-600">로그인 상태 유지</span>
              </label>
              <Link href="/forgot-password" className="text-primary">
                비밀번호 찾기
              </Link>
            </div>

            <Button type="submit" className="w-full py-6 text-lg" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <Separator className="my-6" />

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full py-6 bg-[#FEE500] border-[#FEE500] text-black hover:bg-[#FEE500]/90"
            >
              <span className="mr-2">💬</span>
              카카오로 로그인
            </Button>
          </div>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          아직 계정이 없으신가요?{' '}
          <Link href="/signup" className="text-primary font-medium">
            회원가입
          </Link>
        </p>
      </main>
    </div>
  );
}
