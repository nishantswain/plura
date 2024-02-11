import Sidebar from '@/components/sidebar';
import Unauthorized from '@/components/unauthorized';
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from '@/lib/queries';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface layoutProps {
  children: React.ReactNode;
  params: { agencyId: string };
}

const layout: FC<layoutProps> = async ({ children, params }) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) {
    return redirect('/');
  }

  //if there no agencyId, prompt user to create agency
  if (!agencyId) {
    return redirect('/agency');
  }

  if (
    user.privateMetadata.role !== 'AGENCY_OWNER' &&
    user.privateMetadata.role !== 'AGENCY_ADMIN'
  )
    return <Unauthorized />;

  let allNoti: any = [];
  const notifications = await getNotificationAndUser(agencyId);

  if (notifications) allNoti = notifications;

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">{children}</div>
    </div>
  );
};

export default layout;
