import { useQuery } from '@tanstack/react-query';

import { getMyFavoriteArtists } from '@/features/my-page/api/favoriteArtists';

import type { FavoriteArtist } from '../types/favoriteArtist';

const FAVORITE_ARTISTS_QUERY_KEY = ['my', 'favorite-artists'] as const;

export const useFavoriteArtistsQuery = () =>
  useQuery({
    queryFn: async () => {
      const data = await getMyFavoriteArtists();

      return data.items.map<FavoriteArtist>(item => {
        const rawImage = item.profile_image;

        const profileImage =
          typeof rawImage === 'string' && rawImage.trim().length > 0
            ? rawImage.startsWith('http')
              ? rawImage
              : `${import.meta.env.VITE_BACKEND_BASE_URL}${rawImage}`
            : null;

        return {
          agency: '',
          followerCount: 0,
          id: Number(item.id),
          name: item.name,
          profileImage,
        };
      });
    },
    queryKey: FAVORITE_ARTISTS_QUERY_KEY,
  });
