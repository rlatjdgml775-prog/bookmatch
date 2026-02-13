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
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import { useUserStore } from '@/store';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useUserStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAllAgreements = () => {
    const allChecked = Object.values(agreements).every(Boolean);
    setAgreements({
      terms: !allChecked,
      privacy: !allChecked,
      marketing: !allChecked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.nickname) {
      toast.error('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!agreements.terms || !agreements.privacy) {
      toast.error('필수 약관에 동의해주세요.');
      return;
    }

    setIsLoading(true);

    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));

    login(formData.email, formData.nickname);
    toast.success('회원가입이 완료되었습니다!');

    // 테스트 시작 페이지로 이동
    router.push('/test/start');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center px-4 py-3">
          <Link href="/" className="-ml-2 p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center font-bold">회원가입</h1>
          <div className="w-9" />
        </div>
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
          <h2 className="text-2xl font-bold mt-2">BookMatch 가입하기</h2>
          <p className="text-gray-600 mt-1">나만의 독서 여정을 시작해보세요</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8자 이상 입력"
                  value={formData.password}
                  onChange={handleInputChange}
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

            <div>
              <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호 재입력"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="BookMatch에서 사용할 이름"
                value={formData.nickname}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <Separator className="my-6" />

            {/* Agreements */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={handleAllAgreements}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    Object.values(agreements).every(Boolean)
                      ? 'bg-primary border-primary'
                      : 'border-gray-300'
                  }`}
                >
                  {Object.values(agreements).every(Boolean) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="font-medium">전체 동의</span>
              </label>

              <div className="pl-9 space-y-2 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreements.terms}
                    onChange={() => handleAgreementChange('terms')}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>
                    이용약관 동의 <span className="text-red-500">(필수)</span>
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreements.privacy}
                    onChange={() => handleAgreementChange('privacy')}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>
                    개인정보 수집 동의 <span className="text-red-500">(필수)</span>
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreements.marketing}
                    onChange={() => handleAgreementChange('marketing')}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>마케팅 정보 수신 동의 (선택)</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full py-6 text-lg mt-6" disabled={isLoading}>
              {isLoading ? '가입 중...' : '회원가입'}
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
              카카오로 시작하기
            </Button>
          </div>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-primary font-medium">
            로그인
          </Link>
        </p>
      </main>
    </div>
  );
}
