import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/api';

export type Artist = {
  agency: string;
  description: string;
  followerCount: number;
  id: number;
  name: string;
  profileImage: null | string;
};

export type ArtistList = {
  items: Artist[];
  page: number;
  pageSize: number;
  total: number;
};

type ArtistApi = {
  agency: string;
  description: string;
  follower_count: number;
  id: number;
  name: string;
  profile_image: null | string;
};

type ArtistListApi = {
  items: ArtistApi[];
  page: number;
  page_size: number;
  total: number;
};

const ARTIST_KEYS = {
  mainList: ['artists', 'list', 'main'] as const,
};

const toArtist = (src: ArtistApi): Artist => ({
  agency: src.agency,
  description: src.description,
  followerCount: src.follower_count,
  id: src.id,
  name: src.name,
  profileImage: src.profile_image,
});

export const useArtistListQuery = () =>
  useQuery<ArtistList>({
    queryFn: async () => {
      const { data } = await api.get<ArtistListApi>('/artists', {
        params: { page: 1, page_size: 20, sort_by: 'latest' },
      });

      return {
        items: data.items.map(toArtist),
        page: data.page,
        pageSize: data.page_size,
        total: data.total,
      };
    },
    queryKey: ARTIST_KEYS.mainList,
  });
