type GenreChipProps = {
  icon: string;
  label: string;
};

export default function GenreChip({ icon, label }: GenreChipProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-[#1A1F2E] px-4 py-2">
      <span className="text-sm">{icon}</span>
      <span className="text-sm text-white">{label}</span>
    </div>
  );
}
