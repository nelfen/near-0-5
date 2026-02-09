import { CameraIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button, Input } from '@/components';

type ProfileSummaryProps = {
  bio?: string;
  favoriteArtistCount: number;
  nickname: string;
  onImageChange?: (file: File) => Promise<void> | void;
  profileImage?: null | string;
};

export default function ProfileSummary({
  bio,
  favoriteArtistCount,
  nickname,
  onImageChange,
  profileImage,
}: ProfileSummaryProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<null | string>(null);
  return (
    <section className="flex items-center gap-6">
      <div className="relative h-24 w-24">
        <Button
          aria-label="프로필 이미지 변경"
          className="group relative h-24 w-24 overflow-hidden rounded-full bg-[#2a2f3f] p-0"
          onClick={() => fileInputRef.current?.click()}
          type="button"
          variant="ghost"
        >
          {profileImage ? (
            <img
              alt="프로필 이미지"
              className="h-full w-full rounded-full object-cover"
              src={profileImage ?? previewUrl}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-[#9ca3af]">
              No Image
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <CameraIcon className="text-white" size={20} />
          </div>
        </Button>

        <Input
          accept="image/*"
          className="hidden"
          onChange={async e => {
            const file = e.target.files?.[0];
            if (!file || !onImageChange) return;

            const localUrl = URL.createObjectURL(file);
            setPreviewUrl(localUrl);

            await onImageChange(file);

            setPreviewUrl(null);
            e.target.value = '';
          }}
          ref={fileInputRef}
          type="file"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-white">{nickname}</h1>
        {bio && <p className="text-sm text-[#c7c9d9]">{bio}</p>}
        <p className="text-sm text-[#c7c9d9]">
          ❤️ {favoriteArtistCount} 팔로잉
        </p>
      </div>
    </section>
  );
}
