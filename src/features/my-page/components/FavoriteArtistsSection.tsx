import type { KeyboardEvent, MouseEvent } from 'react';

import { Button } from '@/components';
import { useArtistNavigation } from '@/hooks/useArtistNavigation';

import type { FavoriteArtist } from '../types/favoriteArtist';

import { useFavoriteArtistMutation } from '../hooks/useFavoriteArtistMutation';

type FavoriteArtistsSectionProps = {
  artists: FavoriteArtist[];
};

export default function FavoriteArtistsSection({
  artists,
}: FavoriteArtistsSectionProps) {
  const { remove } = useFavoriteArtistMutation();
  const { navigateToArtist } = useArtistNavigation();

  const handleUnfollow = (
    event: MouseEvent<HTMLButtonElement>,
    artistId: number,
  ) => {
    event.stopPropagation();
    remove.mutate(artistId);
  };

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    artistId: number,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigateToArtist(artistId);
    }
  };

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">선호 아티스트</h2>

      <div className="grid grid-cols-3 gap-6">
        {artists.map(artist => {
          const artistId = Number(artist.id);

          const hasImage =
            typeof artist.profileImage === 'string' &&
            artist.profileImage.trim().length > 0;

          return (
            <div
              className="cursor-pointer overflow-hidden rounded-2xl bg-[#0E1625] transition hover:opacity-90"
              key={artist.id}
              onClick={() => navigateToArtist(artistId)}
              onKeyDown={event => handleCardKeyDown(event, artistId)}
              role="button"
              tabIndex={0}
            >
              {hasImage ? (
                <img
                  alt={artist.name}
                  className="h-40 w-full object-cover"
                  src={artist.profileImage}
                />
              ) : (
                <div className="flex h-40 w-full items-center justify-center bg-[#0E1625] text-sm font-medium text-white/60">
                  No Image
                </div>
              )}

              <div className="p-4">
                <p className="text-sm font-semibold text-white">
                  {artist.name}
                </p>

                {artist.followerCount != null && (
                  <p className="text-xs text-white/60">
                    {artist.followerCount} 팔로워
                  </p>
                )}

                <Button
                  className="mt-3 w-full"
                  onClick={event => handleUnfollow(event, artistId)}
                  rounded="full"
                  size="sm"
                  variant="lightGrey"
                >
                  팔로우 취소
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
