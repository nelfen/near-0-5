import { useState } from 'react';

import type { MyPageMenuKey } from '@/features/my-page/types';

import AccountInfoCard from '@/features/my-page/components/AccountInfoCard';
import MyPageMenu from '@/features/my-page/components/MyPageMenu';
import NotificationSettingsCard from '@/features/my-page/components/NotificationSettingsCard';
import ProfileSummary from '@/features/my-page/components/ProfileSummary';
import WithdrawCard from '@/features/my-page/components/WithdrawCard';

export default function MyPage() {
  const [activeMenu, setActiveMenu] = useState<MyPageMenuKey>('account');

  return (
    <div className="min-h-screen bg-[#101828]">
      {/* 상단 그라데이션 + 프로필 */}
      <section className="bg-linear-to-r from-[#DC196D] to-[#63002B]">
        <div className="mx-auto max-w-7xl px-12 py-10">
          <ProfileSummary
            description="자기소개글이 올 자리입니다"
            followerCount={4}
            userName="김지우"
          />
        </div>
      </section>

      {/* 탭 메뉴 */}
      <section className="mx-auto max-w-7xl px-12">
        <MyPageMenu activeKey={activeMenu} onChange={setActiveMenu} />
      </section>

      {/* 탭 콘텐츠 */}
      <section className="mx-auto max-w-7xl px-12 pb-20">
        {activeMenu === 'account' && (
          <div className="mt-6 flex flex-col gap-6">
            {/* 계정 정보 */}
            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <AccountInfoCard
                account={{
                  email: 'jiwoo.kim@example.com',
                  joinedAt: '2024년 1월 15일',
                  nickname: '지우',
                }}
              />
            </div>

            {/* 알림 설정 */}
            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <NotificationSettingsCard
                isLiveStartEnabled={false}
                isNewContentEnabled
                isNewsletterEnabled
              />
            </div>

            {/* 회원 탈퇴 */}
            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <WithdrawCard
                onWithdraw={() => {
                  // TODO: 회원 탈퇴 API 연결
                }}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
