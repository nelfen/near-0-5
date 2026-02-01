import { useState } from 'react';

import type { StreamDetail } from '@/features/live/types/stream';

import {
  getStreamCredentials,
  getStreamDetail,
  loginTest,
  refreshStreamCredentials,
} from '@/features/live/api/live';

type UseStreamSessionReturn = {
  handleDevLogin: () => Promise<void>;
  handleRefresh: () => Promise<void>;
  isLoading: boolean;
  playbackUrl: null | string;
  streamDetail: null | StreamDetail;
};

export const useStreamSession = (sessionId: number): UseStreamSessionReturn => {
  const [streamDetail, setStreamDetail] = useState<null | StreamDetail>(null);
  const [playbackUrl, setPlaybackUrl] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDevLogin = async () => {
    try {
      setIsLoading(true);

      const loginData = await loginTest(2);
      localStorage.setItem('accessToken', loginData.accessToken);

      const detail = await getStreamDetail(sessionId);
      setStreamDetail(detail);

      if (detail.status === 'LIVE') {
        const credentials = await getStreamCredentials(sessionId);
        setPlaybackUrl(credentials.playbackUrl);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!sessionId) return;

    try {
      console.log('토큰 재발급 시도');

      const oldUrl = playbackUrl;

      const data = await refreshStreamCredentials(sessionId);

      setPlaybackUrl(data.playbackUrl);

      console.log('재발급 성공!');
      console.log('Old URL:', oldUrl);
      console.log('New URL:', data.playbackUrl);
    } catch (error) {
      console.error('재발급 실패:', error);
    }
  };

  return {
    handleDevLogin,
    handleRefresh,
    isLoading,
    playbackUrl,
    streamDetail,
  };
};
