import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { OngoingLiveCard, SectionHeader } from '@/components';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';
import { type StreamSession, useStreamingListQuery } from '@/queries/streaming';

export type OngoingStreamingSectionProps = {
  showMoreButton?: boolean;
  title: string;
};

const MOCK_ONGOING_LIST = [
  {
    durationLabel: '1:20:45',
    isLive: true,
    thumbnailUrl: '/images/Ongoing-1.png',
    title: 'LE SSERAFIM 컴백 쇼케이스 LIVE',
  },
  {
    durationLabel: '45:20',
    isLive: true,
    thumbnailUrl: '/images/Ongoing-2.png',
    title: '팬미팅 생중계',
  },
  {
    durationLabel: '12:13:15',
    isLive: true,
    thumbnailUrl: '/images/Ongoing-3.png',
    title: '멤버들과 함께하는 Q&A 시간',
  },
] as const;

type OngoingViewItem = {
  durationLabel: string;
  isLive: boolean;
  thumbnailUrl: null | string; // 없을 수 있음 (NO IMAGE 처리)
  title: string;
};

export default function OngoingStreamingSection({
  showMoreButton = true,
  title,
}: OngoingStreamingSectionProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const { data, isError, isFetched } = useStreamingListQuery('LIVE');

  const rawList = (data?.items ?? []) as StreamSession[];

  // 1) 실제 LIVE 데이터 → 뷰 모델로 변환
  const liveItems: OngoingViewItem[] = rawList.map(concert => ({
    durationLabel: '', // 서버에서 내려오면 연결
    isLive: concert.status === 'LIVE',
    thumbnailUrl: concert.thumbnailUrl, // null/undefined면 카드에서 NO IMAGE 처리
    title: concert.concertTitle,
  }));

  // 2) LIVE 데이터가 전혀 없을 때만 더미 사용
  const useMock = liveItems.length === 0 && (isError || isFetched);

  const list: OngoingViewItem[] = useMock ? [...MOCK_ONGOING_LIST] : liveItems;

  useEffect(() => {
    console.log('OngoingStreamingSection list:', list);
  }, [list]);

  const handleClickMore = () => {
    if (!isLoggedIn) {
      navigate(ROUTES_PATHS.LOGIN);
      return;
    }
    navigate(ROUTES_PATHS.STREAMING_LIST);
  };

  return (
    <section className="w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-293 space-y-6">
        <SectionHeader
          onMoreClick={showMoreButton ? handleClickMore : undefined}
          showMoreButton={showMoreButton}
          title={title}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 3).map((concert, index) => (
            <OngoingLiveCard
              durationLabel={concert.durationLabel}
              isLive={concert.isLive}
              key={concert.title + index}
              thumbnailUrl={concert.thumbnailUrl}
              title={concert.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
