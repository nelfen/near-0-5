import type { FavoriteArtist } from '@/features/my-page/types/artist';

type Props = {
  artist: FavoriteArtist;
};

export default function FavoriteArtistCard({ artist }: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-[#1A1F2E]">
      <img
        alt={artist.name}
        className="aspect-video w-full object-cover"
        src={artist.imageUrl}
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-sm text-[#C7C9D9]">{artist.category}</div>

        <div className="text-base font-semibold text-white">{artist.name}</div>

        <div className="text-xs text-[#9CA3AF]">
          {artist.followerCount.toLocaleString()} 팔로워
        </div>

        <button
          className="mt-auto rounded-xl bg-[#D1D5DB] py-2 text-sm font-medium text-[#101828]"
          type="button"
        >
          팔로우 취소
        </button>
      </div>
    </div>
  );
}
