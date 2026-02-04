import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/api';

/**
 * 2) 프론트에서 사용할 타입
 *    응답과 구조가 동일하니까 그대로 재사용해도 됨
 */
export type StreamSession = StreamSessionResponse;

export type StreamSessions = StreamSessionsResponse;

export type StreamSessionStatus = 'ENDED' | 'LIVE' | 'READY';

/**
 * 1) 백엔드 응답 (api.ts에서 이미 toCamel 처리된 상태, 즉 camelCase)
 */
type StreamSessionResponse = {
  category: string;
  concertTitle: string;
  id: number;
  sessionName: string;
  startAt: string;
  status: StreamSessionStatus;
  thumbnailUrl: null | string;
};

type StreamSessionsResponse = {
  items: StreamSessionResponse[];
  nextCursor: null | number;
};

const STREAMING_KEYS = {
  detail: (id: number) => ['streams', 'session', id] as const,
  list: (status: StreamSessionStatus) =>
    ['streams', 'sessions', status] as const,
};

/**
 * 응답 → UI 모델 (실질적으로는 그대로 반환)
 */
const toStreamSession = (src: StreamSessionResponse): StreamSession => src;

/**
 * 3) 목록 쿼리
 */
export const useStreamingListQuery = (status: StreamSessionStatus) =>
  useQuery<StreamSessions>({
    queryFn: async () => {
      const { data } = await api.get<StreamSessionsResponse>(
        '/streams/sessions',
        { params: { status } },
      );

      // 여기서 data는 이미 camelCase 구조임 (api.ts의 toCamel 때문에)
      // 예: { items: [{ concertTitle: '...', sessionName: '...' }], nextCursor: null }

      return {
        items: data.items.map(toStreamSession),
        nextCursor: data.nextCursor,
      };
    },
    queryKey: STREAMING_KEYS.list(status),
  });

/**
 * 4) 상세 쿼리
 */
export type StreamSessionDetail = StreamSession & {
  description?: null | string;
};

export const useStreamingDetailQuery = (id: number) =>
  useQuery<StreamSessionDetail>({
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get<
        StreamSessionResponse & {
          description?: null | string;
        }
      >(`/streams/sessions/${id}`);

      return {
        ...toStreamSession(data),
        description: data.description ?? null,
      };
    },
    queryKey: STREAMING_KEYS.detail(id),
  });
