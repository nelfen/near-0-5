import { useCallback, useEffect, useState } from 'react';

import type { StreamDetail } from '@/features/live/types';

import {
  getStreamCredentials,
  getStreamDetail,
  refreshStreamCredentials,
} from '@/features/live/api/live';

type UseStreamSessionReturn = {
  isLoading: boolean;
  loadStreamSession: () => Promise<void>;
  playbackUrl: null | string;
  refreshPlaybackToken: () => Promise<void>;
  streamDetail: null | StreamDetail;
};

export const useStreamSession = (sessionId: number): UseStreamSessionReturn => {
  const [streamDetail, setStreamDetail] = useState<null | StreamDetail>(null);
  const [playbackUrl, setPlaybackUrl] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadStreamSession = async () => {
    try {
      setIsLoading(true);

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

  const refreshPlaybackToken = useCallback(async () => {
    if (!sessionId) return;

    try {
      const data = await refreshStreamCredentials(sessionId);

      setPlaybackUrl(data.playbackUrl);
    } catch (error) {
      console.error('재발급 실패:', error);
    }
  }, [sessionId]);

  useEffect(() => {
    if (!playbackUrl || streamDetail?.status !== 'LIVE') return;

    const REFRESH_INTERVAL = 1000 * 60 * 50;

    const timer = setInterval(() => {
      refreshPlaybackToken();
    }, REFRESH_INTERVAL);

    return () => clearInterval(timer);
  }, [playbackUrl, streamDetail?.status, refreshPlaybackToken]);

  return {
    isLoading,
    loadStreamSession,
    playbackUrl,
    refreshPlaybackToken,
    streamDetail,
  };
};
