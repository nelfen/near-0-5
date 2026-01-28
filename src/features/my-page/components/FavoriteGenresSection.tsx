import { favoriteGenresMock } from '../mocks/favoriteGenres.mock';
import GenreChip from './GenreChip';

export default function FavoriteGenresSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">선호 장르</h2>

        <button
          className="rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          type="button"
        >
          수정
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {favoriteGenresMock.map(genre => (
          <GenreChip icon={genre.icon} key={genre.id} label={genre.label} />
        ))}
      </div>
    </section>
  );
}
