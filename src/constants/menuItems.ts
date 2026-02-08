import {
  HeartIcon,
  HomeIcon,
  Mic2Icon,
  RadioIcon,
  UserIcon,
} from 'lucide-react';

import { ROUTES_PATHS } from '@/constants';

export const MENU_ITEMS = [
  {
    icon: HomeIcon,
    label: '홈',
    path: ROUTES_PATHS.MAIN,
  },
  {
    icon: UserIcon,
    label: 'My Page',
    path: `${ROUTES_PATHS.MYPAGE}?tab=account`,
  },
  {
    icon: Mic2Icon,
    label: 'Artist',
    path: ROUTES_PATHS.ARTIST_LIST,
  },
  {
    icon: RadioIcon,
    label: 'Streaming',
    path: ROUTES_PATHS.STREAMING_LIST,
  },
  {
    icon: HeartIcon,
    label: 'Favorite',
    path: `${ROUTES_PATHS.MYPAGE}?tab=interest`,
  },
] as const;
