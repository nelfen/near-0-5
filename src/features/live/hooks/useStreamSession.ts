import { useQuery } from '@tanstack/react-query';

import {
  getStreamCredentials,
  getStreamDetail,
} from '@/features/live/api/live';

export const useStreamSession = (sessionId: number) => {
  const detailQuery = useQuery({
    enabled: !!sessionId,
    queryFn: () => getStreamDetail(sessionId),
    queryKey: ['streamDetail', sessionId],
  });

  const streamDetail = detailQuery.data;

  const tokenQuery = useQuery({
    enabled: !!streamDetail && streamDetail.status === 'LIVE',
    queryFn: async () => {
      const data = await getStreamCredentials(sessionId);
      return data.playbackUrl;
    },
    queryKey: ['streamToken', sessionId],

    refetchInterval: 1000 * 60 * 50,

    refetchOnWindowFocus: false,
  });

  return {
    isLoading: detailQuery.isLoading || tokenQuery.isLoading,
    loadStreamSession: detailQuery.refetch,
    playbackUrl: tokenQuery.data || null,

    refreshPlaybackToken: tokenQuery.refetch,
    streamDetail: streamDetail || null,
  };
};
