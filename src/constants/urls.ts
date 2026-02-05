import type { SocialLoginProvider } from '@/features/auth';

export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const ROUTES_PATHS = {
  ARTIST: '/artist',
  ARTIST_LIST: '/artist-list',
  FAVORITE: '/favorite',
  LOGIN: '/login',
  MAIN: '/',
  MYPAGE: '/my-page',
  NOT_FOUND: '*',
  SIGNUP: '/signup',
  SOCIAL_LOGIN_CALLBACK: '/auth/:provider/callback',
  STREAMING: '/live-stream/:id',
  STREAMING_LIST: '/stream-list',
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGOUT: `/auth/logout`,
    REFRESH_ACCESS_TOKEN: `/auth/refresh`,
    SOCIAL_LOGIN_CALLBACK: (provider: SocialLoginProvider) =>
      `${BACKEND_BASE_URL}/auth/login?provider=${provider}`,
    USER_ME: `/users/me`,
  },
  STREAMS: {
    CREDENTIALS: (sessionId: number) =>
      `/streams/sessions/${sessionId}/credentials`,
    DETAIL: (sessionId: number) => `/streams/sessions/${sessionId}`,
    LIST: `/streams/sessions`,
    REFRESH: (sessionId: number) => `/streams/sessions/${sessionId}/refresh`,
    STATUS: (sessionId: number) => `/streams/sessions/${sessionId}/status`,
  },
};
