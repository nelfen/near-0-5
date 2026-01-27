type Props = {
  isLiveStartEnabled: boolean;
  isNewContentEnabled: boolean;
  isNewsletterEnabled: boolean;
};

export default function NotificationSettingsCard({
  isLiveStartEnabled,
  isNewContentEnabled,
  isNewsletterEnabled,
}: Props) {
  return (
    <section>
      <h2 className="mb-6 text-lg font-semibold text-white">알림 설정</h2>

      <div className="flex flex-col gap-6">
        <Item
          description="팔로우한 아티스트의 새 콘텐츠"
          enabled={isNewContentEnabled}
          title="새 콘텐츠 알림"
        />
        <Item
          description="라이브 방송 시작 시"
          enabled={isLiveStartEnabled}
          title="라이브 시작 알림"
        />
        <Item
          description="주간 소식 받기"
          enabled={isNewsletterEnabled}
          title="이메일 뉴스레터"
        />
      </div>
    </section>
  );
}

function Item({
  description,
  enabled,
  title,
}: {
  description: string;
  enabled: boolean;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-white">{title}</p>
        <p className="text-xs text-white/40">{description}</p>
      </div>

      <span
        className={[
          'text-sm',
          enabled ? 'text-green-400' : 'text-white/30',
        ].join(' ')}
      >
        {enabled ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}
