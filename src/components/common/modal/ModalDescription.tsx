import { DialogDescription } from '@/components';

type ModalDescriptionProps = {
  children: React.ReactNode;
};

export default function ModalDescription({ children }: ModalDescriptionProps) {
  return (
    <DialogDescription className="text-sm text-gray-500">
      {children}
    </DialogDescription>
  );
}
