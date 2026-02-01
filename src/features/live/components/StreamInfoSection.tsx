import type { StreamDetail } from '@/features/live/types/stream';

import { Button } from '@/components';

type StreamInfoSectionProps = {
  streamDetail: StreamDetail;
};

export default function StreamInfoSection({
  streamDetail,
}: StreamInfoSectionProps) {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-[#10131C] p-6">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold">
            {streamDetail.status}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(streamDetail.startAt).toLocaleString()} 시작
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight italic">
          {streamDetail.concertTitle}
        </h1>
        <p className="mt-1 text-sm text-gray-400">{streamDetail.sessionName}</p>
      </div>

      <div className="flex items-center justify-between border-t border-b border-gray-700 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-linear-to-tr from-pink-500 to-violet-500" />
          <span className="text-lg font-semibold">
            {streamDetail.lineup[0]?.name || 'Unknown'}
          </span>
        </div>
        <Button className="px-6" rounded="full" size="sm" variant="pink">
          팔로우
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold">방송 정보</h3>
        <p className="text-sm leading-relaxed whitespace-pre-line text-gray-300">
          {streamDetail.description}
        </p>
        <div className="flex gap-2 text-xs text-blue-400">
          <span>#{streamDetail.category}</span>
        </div>
      </div>
    </div>
  );
}
