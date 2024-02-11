import { useModal } from '@/providers/modal-provider';
import { FC } from 'react';
import { Dialog, DialogHeader } from '../ui/dialog';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@radix-ui/react-dialog';

interface CustomModalProps {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CustomModal: FC<CustomModalProps> = ({
  children,
  defaultOpen,
  subheading,
  title,
}) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit bg-card h-screen">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
