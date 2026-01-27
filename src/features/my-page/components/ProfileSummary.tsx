type Props = {
  description?: string;
  followerCount: number;
  userName: string;
};

export default function ProfileSummary({
  description,
  followerCount,
  userName,
}: Props) {
  return (
    <div className="flex items-center gap-6">
      <div className="h-24 w-24 overflow-hidden rounded-full bg-white/20" />

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-white">{userName}</h1>

        {description && (
          <p className="max-w-xl text-sm text-white/70">{description}</p>
        )}

        <div className="flex items-center gap-2 text-sm text-white/60">
          <span>❤️</span>
          <span>{followerCount} 팔로잉</span>
        </div>
      </div>
    </div>
  );
}
