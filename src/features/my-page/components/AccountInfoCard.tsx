type Account = {
  email: string;
  joinedAt: string;
  nickname: string;
};

type Props = {
  account: Account;
};

export default function AccountInfoCard({ account }: Props) {
  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">계정 정보</h2>

        <button
          className="rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          type="button"
        >
          프로필 편집
        </button>
      </header>

      <div className="flex flex-col divide-y divide-white/10">
        <Item label="이메일" value={account.email} />
        <Item label="닉네임" value={account.nickname} />
        <Item label="비밀번호" value="••••••••" />
        <Item label="가입일" value={account.joinedAt} />
      </div>
    </section>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-4">
      <span className="text-sm text-white/40">{label}</span>
      <span className="text-sm text-white">{value}</span>
    </div>
  );
}
