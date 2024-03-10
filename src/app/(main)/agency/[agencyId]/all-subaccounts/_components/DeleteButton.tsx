'use client';
import {
  deleteSubAccount,
  getSubaccountDetails,
  saveActivityLogsNotification,
} from '@/lib/queries';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface DeleteButtonProps {
  subAccountId: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ subAccountId }) => {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        const response = await getSubaccountDetails(subAccountId);
        if (response !== null) {
          await saveActivityLogsNotification({
            agencyId: undefined,
            description: `Deleted a subaccount | ${response.name}`,
            subaccountId: subAccountId,
          });
          await deleteSubAccount(subAccountId);
          router.refresh();
        }
      }}
    >
      Delete Sub Account
    </div>
  );
};

export default DeleteButton;
