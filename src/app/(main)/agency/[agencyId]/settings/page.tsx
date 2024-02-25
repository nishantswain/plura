import AgencyDetails from '@/components/forms/AgencyDetails';
import UserDetails from '@/components/forms/UserDetails';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { FC } from 'react';

interface pageProps {
  params: { agencyId: string };
}

const page: FC<pageProps> = async ({ params }) => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });
  if (!userDetails) return null;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return null;
  const subAccount = agencyDetails.SubAccount;

  return (
    <div className="flex ld:!flex-row flex-col gap-4">
      <AgencyDetails data={agencyDetails} />
      <UserDetails
        type="agency"
        id={params.agencyId}
        subAccounts={subAccount}
        userData={userDetails}
      />
    </div>
  );
};

export default page;

// git command to check emal and username
// git config --global user.email
// how can i change the email and username, give complete command with example
// git config --global user.email "n"
