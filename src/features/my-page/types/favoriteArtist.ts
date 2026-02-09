export type FavoriteArtist = {
  agency: string;
  description?: null | string;
  followerCount: number;
  id: number;
  name: string;
  profileImage: null | string;
};

export type FavoriteArtistApiItem = {
  agency: string;
  categoryType: string;
  createdAt: string;
  groupType: string;
  id: number;
  memberCount: number;
  name: string;
  profileImage: null | string;
};
export type FavoriteArtistsResponse = {
  items: FavoriteArtistApiItem[];
  total: number;
};
