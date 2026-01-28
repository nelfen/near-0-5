import { favoriteArtistsMock } from '../mocks/favoriteArtists.mock';
import FavoriteArtistCard from './FavoriteArtistCard';

export default function FavoriteArtistsSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-white">선호 아티스트</h2>

      <div className="grid grid-cols-3 gap-6">
        {favoriteArtistsMock.map(artist => (
          <FavoriteArtistCard artist={artist} key={artist.id} />
        ))}
      </div>
    </section>
  );
}
