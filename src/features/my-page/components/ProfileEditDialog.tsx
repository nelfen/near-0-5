import { useState } from 'react';

import { Button } from '@/components';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components';

type ProfileEditDialogProps = {
  description?: string;
  onSave?: (next: { description?: string; userName: string }) => void;
  userName: string;
};

export default function ProfileEditDialog({
  description,
  onSave,
  userName,
}: ProfileEditDialogProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [nextUserName, setNextUserName] = useState(userName);
  const [nextDescription, setNextDescription] = useState(description ?? '');

  const handleOpenChange = (open: boolean) => {
    setIsOpened(open);

    if (open) {
      setNextUserName(userName);
      setNextDescription(description ?? '');
    }
  };

  const handleSaveBtnClick = () => {
    onSave?.({ description: nextDescription, userName: nextUserName });
    setIsOpened(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpened(true)} type="button">
        프로필 편집
      </Button>

      <Dialog onOpenChange={handleOpenChange} open={isOpened}>
        <DialogContent className="bg-[#101828] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">프로필 편집</DialogTitle>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-white/70">닉네임</span>
              <input
                className="h-10 bg-[#080A0E] px-3 text-sm text-white outline-none"
                onChange={e => setNextUserName(e.target.value)}
                value={nextUserName}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm text-white/70">자기소개</span>
              <textarea
                className="min-h-24 resize-none bg-[#080A0E] p-3 text-sm text-white outline-none"
                onChange={e => setNextDescription(e.target.value)}
                value={nextDescription}
              />
            </label>

            <div className="mt-2 flex justify-end gap-2">
              <button
                className="h-10 px-4 text-sm text-white/80 hover:text-white"
                onClick={() => setIsOpened(false)}
                type="button"
              >
                취소
              </button>
              <button
                className="h-10 bg-white px-4 text-sm font-medium text-black"
                onClick={handleSaveBtnClick}
                type="button"
              >
                저장
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
