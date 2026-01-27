type Props = {
  onWithdraw: () => void;
};

export default function WithdrawCard({ onWithdraw }: Props) {
  return (
    <section className="pt-6">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FB2C36] py-3 text-sm font-semibold text-white hover:bg-[#e0242d]"
        onClick={onWithdraw}
        type="button"
      >
        회원 탈퇴
      </button>
    </section>
  );
}
